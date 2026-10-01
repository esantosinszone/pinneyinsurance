// Smooth wheel scrolling (Lenis) + a thin overlay scrollbar that only shows
// while scrolling or when the pointer nears the right edge, and fades out
// once the pointer has been still for a moment.
//
// Works with Astro's <ClientRouter />: Lenis is torn down before each swap and
// recreated on page load; the scrollbar element is persisted across pages.

import Lenis from 'lenis';

let lenis: Lenis | null = null;

/** Pause smooth scrolling (open dialog, mobile menu). */
export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();

const finePointer = window.matchMedia('(pointer: fine)');
const root = document.documentElement;

/* ---------- Lenis lifecycle ---------- */
// Desktop only: mouse/trackpad with hover and a desktop-width viewport.
// Phones and tablets keep their own native momentum scrolling.
const desktop = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');

const createLenis = () => {
  lenis?.destroy();
  lenis = null;
  if (!desktop.matches) return;
  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.1,
    // let nested scroll areas (dialog, mobile menu) scroll natively
    prevent: (node) => !!node.closest?.('dialog, [data-menu], [data-lenis-prevent]'),
  });
};

// switch on/off if the window crosses the desktop breakpoint (resize, tablet rotation)
desktop.addEventListener('change', createLenis);

document.addEventListener('astro:before-swap', () => {
  lenis?.destroy();
  lenis = null;
});

/* ---------- in-page anchors: smooth, with the sticky header offset ---------- */
document.addEventListener(
  'click',
  (e) => {
    if (!lenis || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!a || a.origin !== location.origin || a.pathname !== location.pathname || !a.hash) return;
    const target = document.getElementById(decodeURIComponent(a.hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    e.stopPropagation();
    // Lenis already honours html's scroll-padding-top (header + subnav), so no extra offset
    lenis.scrollTo(target, { duration: 1.1 });
    history.replaceState(history.state, '', a.hash);
    // move focus for keyboard and screen-reader users without a second jump
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  },
  true,
);

/* ---------- overlay scrollbar ---------- */
const HIDE_AFTER = 1200; // ms of pointer stillness before fading out
const EDGE = 40; // px from the right edge that counts as "near the scrollbar"

let bar: HTMLElement | null = null;
let thumb: HTMLElement | null = null;
let hideTimer = 0;
let dragging = false;
let thumbH = 0;

const metrics = () => {
  const track = bar!.clientHeight;
  const max = root.scrollHeight - window.innerHeight;
  thumbH = Math.max(40, (window.innerHeight / root.scrollHeight) * track);
  return { track, max };
};

const render = () => {
  if (!bar || !thumb) return;
  const { track, max } = metrics();
  bar.hidden = max <= 0;
  const y = max > 0 ? (window.scrollY / max) * (track - thumbH) : 0;
  thumb.style.height = `${thumbH}px`;
  thumb.style.transform = `translateY(${y}px)`;
};

const show = () => {
  if (!bar) return;
  bar.classList.add('is-visible');
  window.clearTimeout(hideTimer);
  hideTimer = window.setTimeout(() => !dragging && bar!.classList.remove('is-visible'), HIDE_AFTER);
};

const setupScrollbar = () => {
  bar = document.querySelector('[data-scrollbar]');
  thumb = bar?.querySelector('[data-scrollbar-thumb]') ?? null;
  if (!bar || !thumb || !finePointer.matches) {
    root.classList.remove('has-overlay-scrollbar');
    return;
  }
  root.classList.add('has-overlay-scrollbar');
  render();

  if (bar.dataset.bound) return; // listeners survive navigation with the persisted element
  bar.dataset.bound = 'true';

  window.addEventListener('scroll', () => (render(), show()), { passive: true });
  window.addEventListener('wheel', show, { passive: true });
  window.addEventListener('resize', render, { passive: true });
  new ResizeObserver(render).observe(document.body);
  document.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType === 'mouse' && e.clientX >= window.innerWidth - EDGE) show();
    },
    { passive: true },
  );

  // drag the thumb
  thumb.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    dragging = true;
    thumb!.setPointerCapture(e.pointerId);
    bar!.classList.add('is-dragging');
    const startY = e.clientY;
    const startScroll = window.scrollY;
    const { track, max } = metrics();
    const ratio = max / Math.max(1, track - thumbH);
    const move = (ev: PointerEvent) => {
      const y = startScroll + (ev.clientY - startY) * ratio;
      lenis ? lenis.scrollTo(y, { immediate: true }) : window.scrollTo(0, y);
    };
    const up = () => {
      dragging = false;
      bar!.classList.remove('is-dragging');
      thumb!.removeEventListener('pointermove', move);
      show();
    };
    thumb!.addEventListener('pointermove', move);
    thumb!.addEventListener('pointerup', up, { once: true });
    thumb!.addEventListener('pointercancel', up, { once: true });
  });

  // click the track to jump there
  bar.addEventListener('pointerdown', (e) => {
    if (e.target !== bar) return;
    const { track, max } = metrics();
    const y = ((e.clientY - thumbH / 2) / Math.max(1, track - thumbH)) * max;
    lenis ? lenis.scrollTo(y) : window.scrollTo({ top: y, behavior: 'smooth' });
  });
};

// keep the native-scrollbar-hiding class through ClientRouter's <html> attribute swap
document.addEventListener('astro:after-swap', () => {
  if (bar && finePointer.matches) root.classList.add('has-overlay-scrollbar');
});

document.addEventListener('astro:page-load', () => {
  createLenis();
  setupScrollbar();
});
