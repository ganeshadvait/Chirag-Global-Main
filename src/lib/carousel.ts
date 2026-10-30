// Shared horizontal carousel behaviour (doctors, reviews).
//
// Markup:
//   [data-carousel]            root
//     [data-track]             scrolling list (CSS scroll-snap), one child per card
//     [data-prev] [data-next]  arrow buttons
//     [data-controls]          optional: wrapper hidden when everything fits
//   data-fade on the root fades whichever edge has more cards behind it.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function init(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>('[data-track]');
  const prev = root.querySelector<HTMLButtonElement>('[data-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-next]');
  const controls = root.querySelector<HTMLElement>('[data-controls]');
  if (!track || !prev || !next) return;

  const cards = () => [...track.children] as HTMLElement[];
  const maxScroll = () => track.scrollWidth - track.clientWidth;
  // Card positions relative to the track's scroll origin (they match the snap points)
  const offsets = () => cards().map((c) => c.offsetLeft - cards()[0].offsetLeft);
  // How many cards are fully visible at once. `unit` is card width + gap, and the last
  // visible card has no gap after it, so add one gap before dividing.
  const perPage = () => {
    const list = offsets();
    const unit = list[1] ?? 0;
    if (!unit) return 1;
    const gap = unit - cards()[0].offsetWidth;
    return Math.max(1, Math.floor((track.clientWidth + gap + 1) / unit));
  };

  // Smooth scrolling on a snapping list can stall part-way in some browsers (notably
  // mobile Safari/Chrome), leaving the carousel between cards. If it hasn't arrived
  // shortly after the animation should have finished, jump the rest of the way.
  let settle: number | undefined;
  const scrollToCard = (i: number) => {
    const list = offsets();
    const target = Math.min(Math.max(i, 0), list.length - 1);
    const left = Math.min(list[target], maxScroll());
    const smooth = !reduceMotion.matches;
    track.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
    window.clearTimeout(settle);
    if (smooth) {
      settle = window.setTimeout(() => {
        if (Math.abs(track.scrollLeft - left) > 2) track.scrollTo({ left, behavior: 'auto' });
      }, 700);
    }
  };

  // Move by however many cards are fully visible, so one click = one "page"
  const go = (dir: 1 | -1) => {
    const i = offsets().findIndex((o) => o >= track.scrollLeft - 2);
    scrollToCard((i < 0 ? cards().length - 1 : i) + dir * perPage());
  };

  const update = () => {
    const max = maxScroll();
    const atStart = track.scrollLeft <= 2;
    const atEnd = track.scrollLeft >= max - 2;
    prev.disabled = atStart;
    next.disabled = atEnd;
    if (controls) controls.hidden = max <= 2;

    if (root.hasAttribute('data-fade')) {
      const left = atStart ? '#000' : 'transparent';
      const right = atEnd ? '#000' : 'transparent';
      track.style.maskImage = `linear-gradient(to right, ${left}, #000 3rem, #000 calc(100% - 3rem), ${right})`;
    }
  };

  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  track.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(track);
  update();
}

document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(init);
