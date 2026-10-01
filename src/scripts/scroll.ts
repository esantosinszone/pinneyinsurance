// Scrolling for the whole site, applied the same way everywhere:
//
//  - Smooth wheel scrolling (Lenis) on desktop, for the page and for every
//    vertical scroll area. Phones and tablets keep native momentum scrolling.
//  - A thin overlay scrollbar that appears while scrolling or when the pointer
//    nears its edge, and fades out once the pointer has been still.
//
// Any element can opt in:  <div data-scroll-area="y">  (or "x" for horizontal).
// A "y" area's first child is its scrolling content (Lenis needs one wrapper).
// "x" areas keep native scrolling (so the wheel still scrolls the page) and get
// the overlay bar only.
//
// Works with Astro's <ClientRouter />: per-page instances are created on
// astro:page-load and destroyed before the next swap. The page scrollbar element
// is persisted across pages.

import Lenis from 'lenis';

const root = document.documentElement;
const finePointer = window.matchMedia('(pointer: fine)');
// Desktop only: mouse/trackpad with hover and a desktop-width viewport.
const desktop = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');

const HIDE_AFTER = 1200; // ms of pointer stillness before fading out
const EDGE = 40; // px from the bar's edge that counts as "near the scrollbar"
const MIN_THUMB = 32;

/* ==========================================================
   Overlay scrollbar (window or element)
   ========================================================== */
type Axis = 'x' | 'y';
interface Target {
  axis: Axis;
  size: () => { view: number; content: number; pos: number };
  scrollTo: (pos: number, smooth: boolean) => void;
}

const createBar = (bar: HTMLElement, target: Target, signal?: AbortSignal) => {
  const thumb = bar.querySelector<HTMLElement>('[data-scrollbar-thumb]')!;
  const y = target.axis === 'y';
  let hideTimer = 0;
  let dragging = false;
  let thumbLen = 0;

  const metrics = () => {
    const track = y ? bar.clientHeight : bar.clientWidth;
    const { view, content, pos } = target.size();
    const max = Math.max(0, content - view);
    thumbLen = Math.max(MIN_THUMB, (view / Math.max(1, content)) * track);
    return { track, max, pos };
  };

  const render = () => {
    const { track, max, pos } = metrics();
    bar.hidden = max <= 1;
    const offset = max > 0 ? (pos / max) * (track - thumbLen) : 0;
    thumb.style[y ? 'height' : 'width'] = `${thumbLen}px`;
    thumb.style.transform = y ? `translateY(${offset}px)` : `translateX(${offset}px)`;
  };

  const show = () => {
    if (bar.hidden) return;
    bar.classList.add('is-visible');
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => !dragging && bar.classList.remove('is-visible'), HIDE_AFTER);
  };

  thumb.addEventListener(
    'pointerdown',
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragging = true;
      thumb.setPointerCapture(e.pointerId);
      bar.classList.add('is-dragging');
      const start = y ? e.clientY : e.clientX;
      const startPos = target.size().pos;
      const { track, max } = metrics();
      const ratio = max / Math.max(1, track - thumbLen);
      const move = (ev: PointerEvent) => target.scrollTo(startPos + ((y ? ev.clientY : ev.clientX) - start) * ratio, false);
      const up = () => {
        dragging = false;
        bar.classList.remove('is-dragging');
        thumb.removeEventListener('pointermove', move);
        show();
      };
      thumb.addEventListener('pointermove', move);
      thumb.addEventListener('pointerup', up, { once: true });
      thumb.addEventListener('pointercancel', up, { once: true });
    },
    { signal },
  );

  // click the track to jump there
  bar.addEventListener(
    'pointerdown',
    (e) => {
      if (e.target !== bar) return;
      const rect = bar.getBoundingClientRect();
      const { track, max } = metrics();
      const at = (y ? e.clientY - rect.top : e.clientX - rect.left) - thumbLen / 2;
      target.scrollTo((at / Math.max(1, track - thumbLen)) * max, true);
    },
    { signal },
  );

  return { render, show, destroy: () => window.clearTimeout(hideTimer) };
};

const thumbMarkup = '<div class="scrollbar-thumb" data-scrollbar-thumb></div>';

/* ==========================================================
   Page: Lenis on the window + the persisted page scrollbar
   ========================================================== */
let lenis: Lenis | null = null;

/** Pause page smooth scrolling (open dialog, mobile menu). */
export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();

const createPageLenis = () => {
  lenis?.destroy();
  lenis = null;
  if (!desktop.matches) return;
  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.1,
    // vertical scroll areas (dialog, mobile menu…) run their own Lenis
    prevent: (node) => !!node.closest?.('[data-scroll-area="y"], [data-lenis-prevent]'),
  });
};

let pageBar: ReturnType<typeof createBar> | null = null;

const setupPageBar = () => {
  const el = document.querySelector<HTMLElement>('[data-scrollbar]');
  if (!el || !finePointer.matches) {
    root.classList.remove('has-overlay-scrollbar');
    return;
  }
  root.classList.add('has-overlay-scrollbar');
  if (!pageBar) {
    // created once: the element is persisted across page swaps
    pageBar = createBar(el, {
      axis: 'y',
      size: () => ({ view: window.innerHeight, content: root.scrollHeight, pos: window.scrollY }),
      scrollTo: (pos, smooth) => (lenis ? lenis.scrollTo(pos, { immediate: !smooth }) : window.scrollTo({ top: pos, behavior: smooth ? 'smooth' : 'auto' })),
    });
    const bar = pageBar;
    window.addEventListener('scroll', () => (bar.render(), bar.show()), { passive: true });
    window.addEventListener('wheel', bar.show, { passive: true });
    window.addEventListener('resize', bar.render, { passive: true });
    new ResizeObserver(bar.render).observe(document.body);
    document.addEventListener(
      'pointermove',
      (e) => {
        // don't wake the page bar when a modal dialog covers the page
        if (e.pointerType === 'mouse' && e.clientX >= window.innerWidth - EDGE && !document.querySelector('dialog[open]')) bar.show();
      },
      { passive: true },
    );
  }
  pageBar.render();
};

/* ==========================================================
   Scroll areas: [data-scroll-area="x|y"]
   ========================================================== */
const setupAreas = (signal: AbortSignal) => {
  document.querySelectorAll<HTMLElement>('[data-scroll-area]').forEach((area) => {
    const axis: Axis = area.dataset.scrollArea === 'x' ? 'x' : 'y';
    const frame = area.parentElement!;

    // smooth wheel scrolling inside vertical areas (desktop)
    let areaLenis: Lenis | null = null;
    if (axis === 'y' && desktop.matches && area.firstElementChild) {
      areaLenis = new Lenis({ wrapper: area, content: area.firstElementChild as HTMLElement, autoRaf: true, lerp: 0.1 });
      signal.addEventListener('abort', () => areaLenis?.destroy());
    }

    if (!finePointer.matches) return; // touch: native scrollbars already auto-hide

    // overlay bar, positioned over the area's edge inside its parent
    if (getComputedStyle(frame).position === 'static') frame.style.position = 'relative';
    const el = document.createElement('div');
    el.className = `scrollbar scrollbar--area scrollbar--${axis}`;
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = thumbMarkup;
    frame.appendChild(el);
    signal.addEventListener('abort', () => el.remove());

    const bar = createBar(
      el,
      {
        axis,
        size: () =>
          axis === 'y'
            ? { view: area.clientHeight, content: area.scrollHeight, pos: area.scrollTop }
            : { view: area.clientWidth, content: area.scrollWidth, pos: area.scrollLeft },
        scrollTo: (pos, smooth) =>
          areaLenis
            ? areaLenis.scrollTo(pos, { immediate: !smooth })
            : area.scrollTo({ [axis === 'y' ? 'top' : 'left']: pos, behavior: smooth ? 'smooth' : 'auto' }),
      },
      signal,
    );
    signal.addEventListener('abort', bar.destroy);

    // keep the bar glued to the area's edge
    const place = () => {
      // offsets ignore transforms (dialog open animation, scroll reveals); fall back to
      // rects when the area isn't laid out relative to its parent (e.g. position: fixed)
      let top: number, left: number, w: number, h: number;
      if (area.offsetParent === frame) {
        ({ offsetTop: top, offsetLeft: left, offsetWidth: w, offsetHeight: h } = area);
      } else {
        const ar = area.getBoundingClientRect();
        const fr = frame.getBoundingClientRect();
        top = ar.top - fr.top - frame.clientTop;
        left = ar.left - fr.left - frame.clientLeft;
        w = ar.width;
        h = ar.height;
      }
      Object.assign(el.style, axis === 'y'
        ? { top: `${top}px`, height: `${h}px`, left: `${left + w - 14}px` }
        : { top: `${top + h - 14}px`, width: `${w}px`, left: `${left}px` });
      bar.render();
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(area);
    if (area.firstElementChild) ro.observe(area.firstElementChild);
    signal.addEventListener('abort', () => ro.disconnect());

    // re-place on interaction too: areas can change size while hidden (closed dialog/menu)
    area.addEventListener('scroll', () => (place(), bar.show()), { passive: true, signal });
    area.addEventListener('wheel', () => (place(), bar.show()), { passive: true, signal });
    area.addEventListener(
      'pointermove',
      (e) => {
        if (e.pointerType !== 'mouse') return;
        const r = area.getBoundingClientRect();
        if (axis === 'y' ? e.clientX >= r.right - EDGE : e.clientY >= r.bottom - EDGE) (place(), bar.show());
      },
      { passive: true, signal },
    );
    // areas inside a dialog only become measurable once it opens
    const dialog = area.closest('dialog');
    if (dialog) {
      const mo = new MutationObserver(() => dialog.open && (place(), bar.show()));
      mo.observe(dialog, { attributes: true, attributeFilter: ['open'] });
      signal.addEventListener('abort', () => mo.disconnect());
    }
  });
};

/* ==========================================================
   In-page anchors: smooth, honouring the sticky header offset
   ========================================================== */
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
    // Lenis already honours html's scroll-padding-top (header + subnav)
    lenis.scrollTo(target, { duration: 1.1 });
    history.replaceState(history.state, '', a.hash);
    // move focus for keyboard and screen-reader users without a second jump
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  },
  true,
);

/* ==========================================================
   Lifecycle
   ========================================================== */
let pageController: AbortController | null = null;

const setup = () => {
  pageController?.abort();
  pageController = new AbortController();
  createPageLenis();
  setupPageBar();
  setupAreas(pageController.signal);
};

document.addEventListener('astro:page-load', setup);
document.addEventListener('astro:before-swap', () => {
  pageController?.abort();
  pageController = null;
  lenis?.destroy();
  lenis = null;
});
// keep the native-scrollbar-hiding class through ClientRouter's <html> attribute swap
document.addEventListener('astro:after-swap', () => {
  if (finePointer.matches && document.querySelector('[data-scrollbar]')) root.classList.add('has-overlay-scrollbar');
});
// crossing the desktop breakpoint (resize, tablet rotation) rebuilds everything
desktop.addEventListener('change', setup);
