(() => {
  'use strict';
  const section = document.querySelector('#inside');
  if (!section) return;
  const sticky = section.querySelector('.inside-sticky');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const find = name => section.querySelector(`.inside-${name}`);
  const assembly = find('egg-assembly'), left = find('shell-left'), right = find('shell-right');
  const intact = find('shell-intact');
  const white = find('white'), yolk = find('yolk'), shadow = find('shadow');
  const cartonBack = find('carton-back'), cartonFront = find('carton-front');
  const labels = ['shell', 'white', 'yolk'].map(name => find(`label-${name}`));
  const nav = find('nav'), finish = find('finish'), note = find('art-note');
  const buttons = [...section.querySelectorAll('[data-inside-step]')];
  const chapters = [
    { at: 0, target: 0, title: 'One ordinary egg.', copy: 'Familiar shape. Quiet little wonder. There’s more to this morning staple than meets the eye.' },
    { at: .16, target: .24, title: 'Look a little closer.', copy: 'That softly speckled shell is just the beginning. Let’s open up a different kind of story.' },
    { at: .34, target: .43, title: 'Open the story.', copy: 'Peel back the familiar. A delicate white and a golden centre come into view.' },
    { at: .55, target: .65, title: 'Meet the good inside.', copy: 'A protective shell. A clear cushion of white. A golden yolk at the heart of it all.' },
    { at: .79, target: 1, title: 'Now you know us inside out.', copy: 'Every little part, back together. Our little egg has somewhere to be. Follow it to the next chapter.' }
  ];
  const clamp = n => Math.max(0, Math.min(1, n));
  const range = (p, a, b) => clamp((p - a) / (b - a));
  const smooth = t => t * t * (3 - 2 * t);
  let queued = false, previous = -1;
  function render() {
    queued = false;
    const reduced = motion.matches;
    const p = reduced ? .65 : clamp((scrollY - section.offsetTop) / Math.max(1, section.offsetHeight - sticky.offsetHeight));
    const zoom = smooth(range(p, .12, .29));
    const opening = smooth(range(p, .31, .53));
    const closing = smooth(range(p, .78, .89));
    const spread = opening * (1 - closing);
    intact.style.opacity = String(1 - smooth(range(spread, 0, .05)));
    const packed = document.body.classList.contains('egg-journey') ? 0 : smooth(range(p, .89, 1));
    const scale = (1 + zoom * .17) * (1 - packed * .75);
    assembly.style.transform = `translate(0,${packed * 92}px) scale(${scale})`;
    left.style.transform = `translate(${-145 * spread}px,${-20 * spread}px) rotate(${-13 * spread}deg)`;
    right.style.transform = `translate(${165 * spread}px,${-20 * spread}px) rotate(${13 * spread}deg)`;
    // Only fade the near half after it moves aside; the shell remains intact at both ends.
    right.style.opacity = String(1 - spread * .18);
    white.style.transform = `translateX(${-28 * spread}px) scale(${1 - spread * .13})`;
    yolk.style.transform = `translate(${65 * spread}px,${34 * spread}px)`;
    cartonBack.style.opacity = cartonFront.style.opacity = document.body.classList.contains('egg-journey') ? '0' : String(smooth(range(p, .88, .97)));
    shadow.style.transform = `translateY(${packed * 22}px) scaleX(${1 + packed * .2})`;
    const labelReveal = smooth(range(p, .53, .62)) * (1 - smooth(range(p, .76, .81)));
    labels.forEach(label => {
      label.style.opacity = String(labelReveal);
      label.style.visibility = labelReveal > .01 ? 'visible' : 'hidden';
    });
    note.style.opacity = String(1 - smooth(range(p, .77, .85)));
    const current = chapters.reduce((n, chapter, i) => p >= chapter.at ? i : n, 0);
    if (current !== previous) {
      previous = current;
      find('count').textContent = `0${current + 1} / 05`;
      find('chapter-title').textContent = chapters[current].title;
      find('chapter-copy').textContent = chapters[current].copy;
    }
    buttons.forEach((button, i) => {
      button.style.setProperty('--inside-fill', String(range(p, chapters[i].at, chapters[i + 1]?.at ?? 1)));
      if (i === current) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    finish.hidden = !reduced && p < .97;
  }
  function schedule() {
    if (!queued) { queued = true; requestAnimationFrame(render); }
  }
  function configure() {
    section.classList.toggle('inside-ready', !motion.matches);
    nav.hidden = motion.matches;
    render();
  }
  assembly.style.transformOrigin = '380px 338px';
  buttons.forEach((button, i) => button.addEventListener('click', () => {
    if (motion.matches) return;
    scrollTo({ top: section.offsetTop + (section.offsetHeight - sticky.offsetHeight) * chapters[i].target, behavior: 'smooth' });
  }));
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  addEventListener('pageshow', schedule);
  motion.addEventListener('change', configure);
  new ResizeObserver(schedule).observe(section);
  if (document.fonts) document.fonts.ready.then(schedule);
  configure();
})();
