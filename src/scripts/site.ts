// Global behaviour shared by every page: header state, mobile menu,
// the Get started dialog, scroll reveals, and in-page subnav scroll-spy.
//
// Pages are swapped by Astro's <ClientRouter />, so this module runs once.
// Everything bound to page elements is set up in `astro:page-load` (fires on the
// first load and after every navigation) and torn down in `astro:before-swap`
// through an AbortController, so no listener outlives its page.

import { onPage } from './lifecycle';
import { startScroll, stopScroll } from './scroll';
import { closeDialog } from './dialog';

/* ---------- Get started dialog: delegated once, works on every page ---------- */
document.addEventListener('click', (e) => {
  const trigger = (e.target as HTMLElement).closest('[data-get-started]');
  const dialog = document.getElementById('get-started') as HTMLDialogElement | null;
  if (trigger && dialog) {
    e.preventDefault();
    dialog.showModal();
    stopScroll();
  }
});

onPage((signal) => {
  const opts = { signal };
  const passive = { signal, passive: true };

  /* ---------- header: solid after scrolling past the top ---------- */
  const header = document.getElementById('site-header');
  if (header) {
    const update = () => header.setAttribute('data-scrolled', String(window.scrollY > 24));
    update();
    window.addEventListener('scroll', update, passive);
  }

  /* ---------- mobile menu ---------- */
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  if (header && toggle) {
    const setOpen = (open: boolean) => {
      header.setAttribute('data-menu-open', String(open));
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.sr-only')!.textContent = open ? 'Close menu' : 'Open menu';
      document.body.style.overflow = open ? 'hidden' : '';
      open ? stopScroll() : startScroll();
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'), opts);
    document.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
          setOpen(false);
          toggle.focus();
        }
      },
      opts,
    );
    header.querySelectorAll('[data-menu] a, [data-menu] [data-get-started]').forEach((el) => el.addEventListener('click', () => setOpen(false), opts));
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && setOpen(false), opts);
    // never carry a locked scroll into the next page
    signal.addEventListener('abort', () => (document.body.style.overflow = ''));
  }

  /* ---------- Get started dialog: close controls ---------- */
  const dialog = document.getElementById('get-started') as HTMLDialogElement | null;
  if (dialog) {
    // every close is animated (scripts/dialog.ts)
    dialog.querySelectorAll('[data-dialog-close]').forEach((b) => b.addEventListener('click', () => closeDialog(dialog), opts));
    // links: mailto opens the mail app, other pages navigate; same-page anchors
    // (e.g. /submit#form while on /submit) are closed-then-scrolled by scripts/scroll.ts
    dialog.querySelectorAll('[data-dialog-dismiss]').forEach((a) => a.addEventListener('click', () => closeDialog(dialog), opts));
    dialog.addEventListener('click', (e) => e.target === dialog && closeDialog(dialog), opts);
    // Esc: replace the instant native close with the animated one
    dialog.addEventListener(
      'cancel',
      (e) => {
        e.preventDefault();
        closeDialog(dialog);
      },
      opts,
    );
    // pause smooth scrolling while the dialog is open, however it gets closed (button, Esc, backdrop)
    const mo = new MutationObserver(() => (dialog.open ? stopScroll() : startScroll()));
    mo.observe(dialog, { attributes: true, attributeFilter: ['open'] });
    signal.addEventListener('abort', () => mo.disconnect());
  }

  /* ---------- scroll reveal ---------- */
  const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    reveals.forEach((el) => io.observe(el));
    signal.addEventListener('abort', () => io.disconnect());
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- subnav scroll-spy ---------- */
  const subnav = document.querySelector<HTMLElement>('[data-subnav]');
  document.documentElement.style.setProperty('--subnav-h', subnav ? `${subnav.offsetHeight}px` : '0px');
  if (subnav) {
    const navLinks = Array.from(subnav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const targets = navLinks.map((a) => document.querySelector<HTMLElement>(a.hash)).filter(Boolean) as HTMLElement[];

    const setActive = (id: string) => {
      navLinks.forEach((a) => {
        const on = a.hash === `#${id}`;
        a.toggleAttribute('data-active', on);
        if (on) {
          a.setAttribute('aria-current', 'location');
          // keep the active pill visible on small screens without moving the page
          const strip = a.parentElement?.parentElement;
          if (strip && strip.scrollWidth > strip.clientWidth) {
            strip.scrollTo({ left: a.offsetLeft - 24, behavior: 'smooth' });
          }
        } else a.removeAttribute('aria-current');
      });
    };

    const onScroll = () => {
      const line = window.innerHeight * 0.3;
      let current = '';
      for (const t of targets) if (t.getBoundingClientRect().top <= line) current = t.id;
      if (current) setActive(current);
      else navLinks.forEach((a) => (a.removeAttribute('data-active'), a.removeAttribute('aria-current')));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, passive);
  }
});
