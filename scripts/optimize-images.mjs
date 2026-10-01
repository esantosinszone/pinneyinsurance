// Build the site photography: resize every photo to exactly the widths its layout
// needs, encode WebP with libwebp at quality 75 (Squoosh's default), and write a
// manifest with `srcset` and the matching `sizes` for each place it is used.
//
//   npm run images
//
// Sizing is computed, not hand-tuned: for each box the photo fills with
// object-cover, the required source width is  box width × max(1, photo ratio ÷ box ratio)
// (a wide photo cropped into a square needs more pixels than the square is wide),
// evaluated at 1x up to 2x (desktop/tablet) or 3x (phones). Change a photo and
// everything — widths, srcset, sizes — follows its real aspect ratio.
//
// Sources, in order: `file`, then assets/photos/AdobeStock_<adobe>.(jpeg|jpg|png|webp)
// (Adobe's default download name), then the Unsplash placeholder `id`.
//
// Output: public/images/<name>-<width>-<hash>.webp and src/data/images.json.
// The hash comes from the source photo, so a new photo gets new URLs and browsers
// never show a stale cached file.

import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'public/images');
const PHOTOS_DIR = path.join(ROOT, 'assets/photos');
const CACHE_DIR = path.join(ROOT, 'node_modules/.cache/source-images');
const MANIFEST = path.join(ROOT, 'src/data/images.json');
const QUALITY = 75;
const MAX_WIDTH = 2600;
const STEP = 1.4; // ratio between consecutive widths in a srcset

// Layout boxes, widest breakpoint first; the last box is the fallback (no media).
//   px:  fixed CSS width at that breakpoint        dpr: highest density to cover
//   vw:  width as % of the viewport, maxVw = widest viewport that box applies to
//   aspect: the box's width ÷ height
const LG = '(min-width: 1024px)';
const SM = '(min-width: 640px)';
const fullWidth = (aspect) => [
  { media: SM, vw: 92, maxVw: 1023, aspect, dpr: 2 },
  { vw: 92, maxVw: 639, aspect, dpr: 3 },
];
const pageHero = [
  { media: LG, px: 445, aspect: 1, dpr: 2 },
  { media: SM, vw: 92, maxVw: 1023, aspect: 2, dpr: 2 },
  { vw: 92, maxVw: 639, aspect: 1.6, dpr: 3 },
];

// id = Unsplash placeholder, adobe = Adobe Stock asset ID (standard license, verified non-Premium)
const images = [
  {
    name: 'advisor', adobe: '548151646', id: '1573496359142-b8d87734a5a2',
    uses: { hero: [{ media: LG, px: 414, aspect: 1, dpr: 2 }, { media: SM, px: 354, aspect: 1, dpr: 2 }, { vw: 82, maxVw: 639, aspect: 1, dpr: 3 }] },
  },
  {
    name: 'family', adobe: '135291249', id: '1609220136736-443140cffec6',
    uses: { hero: [{ media: LG, px: 198, aspect: 4 / 3, dpr: 2 }, { media: SM, px: 169, aspect: 4 / 3, dpr: 2 }, { vw: 40, maxVw: 639, aspect: 4 / 3, dpr: 3 }] },
  },
  {
    name: 'owner', adobe: '2009130089', id: '1556740738-b6a63e27c4df',
    uses: { main: [{ media: LG, vw: 41, maxVw: 1600, aspect: 4 / 5, dpr: 2 }, ...fullWidth(4 / 3)] },
  },
  { name: 'team', adobe: '1921069046', id: '1531545514256-b1400bc00f31', uses: { main: [{ media: LG, px: 536, aspect: 4 / 3, dpr: 2 }, ...fullWidth(4 / 3)] } },
  {
    name: 'couple', adobe: '656581401', id: '1543269865-cbf427effbad',
    // hidden below 640px; a tiny fallback keeps phones from downloading a real file
    uses: { main: [{ media: LG, px: 204, aspect: 1, dpr: 2 }, { media: SM, vw: 35, maxVw: 1023, aspect: 1, dpr: 2 }, { px: 40, aspect: 1, dpr: 1 }] },
  },
  { name: 'home', adobe: '2150462916', id: '1600585154340-be6161a56a0c', uses: { main: [{ media: LG, px: 536, aspect: 5 / 4, dpr: 2 }, ...fullWidth(5 / 4)] } },
  // decorative background at 14% opacity: viewport width is plenty
  { name: 'officeBg', adobe: '2007306942', id: '1577962917302-cd874c4e31d2', uses: { main: [{ vw: 100, maxVw: 1600, aspect: 99, dpr: 1 }] } },
  { name: 'office', adobe: '2038298981', id: '1577962917302-cd874c4e31d2', uses: { main: [{ media: LG, px: 436, aspect: 3 / 2, dpr: 2 }, ...fullWidth(3 / 2)] } },
  { name: 'signing', adobe: '2085668811', id: '1450101499163-c8848c66ca85', uses: { hero: pageHero } },
  {
    name: 'conversation', adobe: '2121999070', id: '1551836022-d5d88e9218df',
    uses: { hero: pageHero, thumb: [{ media: SM, px: 144, aspect: 1, dpr: 2 }, { px: 112, aspect: 1, dpr: 3 }] },
  },
  { name: 'paperwork', adobe: '2002982512', id: '1554224155-6726b3ff858f', uses: { hero: pageHero } },
  { name: 'producer', adobe: '660885532', id: '1611095973763-414019e72400', uses: { main: [{ media: LG, px: 536, aspect: 6 / 5, dpr: 2 }, ...fullWidth(6 / 5)] } },
  { name: 'meeting', adobe: '2035554441', id: '1542744173-8e7e53415bb0', uses: { main: [{ media: LG, px: 736, aspect: 16 / 9, dpr: 2 }, ...fullWidth(16 / 9)] } },
  { name: 'success', adobe: '553721043', id: '1600880292203-757bb62b4baf', uses: { main: [{ media: LG, px: 436, aspect: 5 / 4, dpr: 2 }, ...fullWidth(5 / 4)] } },
];

/* ---------- sources ---------- */
const adobeFile = async (adobe) => {
  if (!adobe) return null;
  for (const ext of ['jpeg', 'jpg', 'png', 'webp']) {
    const f = path.join(PHOTOS_DIR, `AdobeStock_${adobe}.${ext}`);
    try {
      await fs.access(f);
      return f;
    } catch {}
  }
  return null;
};

const source = async ({ name, id, adobe, file }) => {
  if (file) return { buf: await fs.readFile(path.resolve(ROOT, file)), from: file };
  const licensed = await adobeFile(adobe);
  if (licensed) return { buf: await fs.readFile(licensed), from: `Adobe ${adobe}` };
  const cached = path.join(CACHE_DIR, `${name}-${id}.jpg`);
  try {
    return { buf: await fs.readFile(cached), from: 'Unsplash placeholder' };
  } catch {
    const url = `https://images.unsplash.com/photo-${id}?w=${MAX_WIDTH}&q=92&fm=jpg`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${name}: ${res.status} ${url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.mkdir(CACHE_DIR, { recursive: true });
    await fs.writeFile(cached, buf);
    return { buf, from: 'Unsplash placeholder' };
  }
};

/* ---------- sizing ---------- */
const cover = (ratio, box) => Math.max(1, ratio / box.aspect);
const cssWidth = (box, viewport) => (box.px ?? (box.vw / 100) * viewport);

const plan = (ratio, uses, sourceWidth) => {
  let min = Infinity;
  let max = 0;
  const sizes = {};
  for (const [use, boxes] of Object.entries(uses)) {
    sizes[use] = boxes
      .map((b) => {
        const f = cover(ratio, b);
        min = Math.min(min, cssWidth(b, 375) * f);
        max = Math.max(max, cssWidth(b, b.maxVw ?? 0) * f * b.dpr);
        const value = b.px ? `${Math.ceil(b.px * f)}px` : `${Math.ceil(b.vw * f)}vw`;
        return b.media ? `${b.media} ${value}` : value;
      })
      .join(', ');
  }
  const top = Math.min(Math.ceil(max), MAX_WIDTH, sourceWidth);
  const widths = [];
  for (let w = Math.max(160, Math.round(min)); w < top; w = Math.round(w * STEP)) widths.push(w);
  if (!widths.length || top - widths.at(-1) > widths.at(-1) * 0.12) widths.push(top);
  else widths[widths.length - 1] = top;
  return { widths, sizes };
};

/* ---------- build ---------- */
await fs.mkdir(OUT_DIR, { recursive: true });
const manifest = {};
let total = 0;

for (const img of images) {
  const { buf, from } = await source(img);
  const meta = await sharp(buf).rotate().metadata();
  const ratio = meta.width / meta.height;
  const { widths, sizes } = plan(ratio, img.uses, meta.width);
  const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);

  const previous = new RegExp(`^${img.name}-\\d+(-[0-9a-f]{8})?\\.webp$`);
  for (const f of await fs.readdir(OUT_DIR)) if (previous.test(f)) await fs.unlink(path.join(OUT_DIR, f));

  const entries = [];
  for (const width of widths) {
    const file = `${img.name}-${width}-${hash}.webp`;
    const info = await sharp(buf).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: QUALITY, effort: 6 }).toFile(path.join(OUT_DIR, file));
    total += info.size;
    entries.push({ w: info.width, h: info.height, kb: Math.round(info.size / 1024), file: `/images/${file}` });
  }
  const largest = entries.at(-1);
  manifest[img.name] = {
    src: entries[Math.min(1, entries.length - 1)].file,
    srcset: entries.map((e) => `${e.file} ${e.w}w`).join(', '),
    sizes,
    width: largest.w,
    height: largest.h,
  };
  console.log(`${img.name.padEnd(13)} ${from.padEnd(21)} ${ratio.toFixed(2)}:1  ${entries.map((e) => `${e.w}`).join(' · ')}`);
}

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${Object.keys(manifest).length} images, ${Math.round(total / 1024)} KB total → public/images, manifest → src/data/images.json`);
