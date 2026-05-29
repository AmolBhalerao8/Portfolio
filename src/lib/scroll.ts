const NAV_OFFSET = 88;
const SCROLL_DURATION = 320;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const target = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  const start = window.scrollY;
  const distance = target - start;

  if (Math.abs(distance) < 2) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    window.scrollTo({ top: target, behavior: "auto" });
    return;
  }

  let startTime: number | null = null;

  function step(timestamp: number) {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / SCROLL_DURATION, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, start + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
