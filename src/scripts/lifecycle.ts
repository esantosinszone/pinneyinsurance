// Page lifecycle helper for Astro's <ClientRouter />.
//
// `onPage(setup)` runs `setup` on the first load and after every client-side
// navigation. The AbortSignal it receives is aborted right before the next page
// is swapped in — pass it to addEventListener (or listen for 'abort') so
// listeners, observers, and timers never leak across pages.

type Setup = (signal: AbortSignal) => void;

export function onPage(setup: Setup) {
  let controller: AbortController | null = null;

  document.addEventListener('astro:page-load', () => {
    controller?.abort();
    controller = new AbortController();
    setup(controller.signal);
  });

  document.addEventListener('astro:before-swap', () => {
    controller?.abort();
    controller = null;
  });
}
