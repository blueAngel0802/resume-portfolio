export function smoothScrollToId(
  id: string,
  opts?: { offset?: number; duration?: number }
) {
  const el = document.getElementById(id);
  if (!el) return;

  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const offset = opts?.offset ?? 84;
  const duration = opts?.duration ?? 700;

  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + window.scrollY - offset;
  const diff = targetY - startY;

  if (prefersReduced || Math.abs(diff) < 2) {
    window.scrollTo(0, targetY);
    return;
  }

  const start = performance.now();

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function step(now: number) {
    const elapsed = now - start;
    const t = Math.min(1, elapsed / duration);
    const eased = easeInOutCubic(t);
    window.scrollTo(0, startY + diff * eased);
    if (t < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
