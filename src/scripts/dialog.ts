// Animated close for native <dialog>. `dialog.close()` is instant, so we play the
// exit animation (see `dialog.is-closing` in global.css) and close when it ends.
// Every way out — close button, Esc, backdrop click, links — goes through here.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const EXIT_MS = 220;

export const closeDialog = (dialog: HTMLDialogElement): Promise<void> =>
  new Promise((resolve) => {
    if (!dialog.open) return resolve();
    if (reduceMotion.matches) {
      dialog.close();
      return resolve();
    }
    if (dialog.classList.contains('is-closing')) {
      dialog.addEventListener('close', () => resolve(), { once: true });
      return;
    }
    dialog.classList.add('is-closing');
    window.setTimeout(() => {
      dialog.classList.remove('is-closing');
      dialog.close();
      resolve();
    }, EXIT_MS);
  });
