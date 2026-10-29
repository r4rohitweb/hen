(() => {
  'use strict';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const get = selector => document.querySelector(selector);
  const hero = get('#home'), farm = get('#farm'), eggs = get('#eggs');
  const inside = get('#inside'), escape = get('#egg-escape'), cooking = get('#cooking'), morning = get('#mornings');
  const insideEgg = get('.inside-egg-assembly'), escapeEgg = get('.escape-egg');
  const shell = get('.cooking-shell'), omelette = get('.pan-omelette'), plate = get('.morning-plate');
  const whiteEgg = get('.egg-layer .egg-white');
  const traveler = document.createElement('div');
  traveler.className = 'egg egg-brown journey-egg';
  traveler.setAttribute('aria-hidden', 'true');
  traveler.innerHTML = '<span></span>';
  document.body.append(traveler);
  const clamp = n => Math.max(0, Math.min(1, n));
  const range = (p, a, b) => clamp((p - a) / (b - a));
  const smooth = t => t * t * (3 - 2 * t);
  const mix = (a, b, t) => a + (b - a) * t;
  const pinRange = (section, selector) => Math.max(0, section.offsetHeight - section.querySelector(selector).offsetHeight);
  let queued = false;
  // Project a DOM anchor to the requested scroll position, accounting for its
  // sticky scene. Document coordinates keep the trip continuous in both directions.
  function anchor(element, time, section, stickySelector) {
    const r = element.getBoundingClientRect();
    let correction = 0;
    if (section && stickySelector) {
      const distance = pinRange(section, stickySelector);
      correction = Math.max(0, Math.min(time - section.offsetTop, distance)) - Math.max(0, Math.min(scrollY - section.offsetTop, distance));
    }
    return {time, x:r.left + r.width / 2, y:r.top + scrollY + r.height / 2 + correction, w:r.width, h:r.height};
  }
  function paint(point, opacity = 1, angle = 0, cooked = false) {
    traveler.classList.toggle('is-cooked', cooked);
    traveler.style.visibility = opacity > 0 ? 'visible' : 'hidden';
    traveler.style.opacity = String(opacity);
    traveler.style.width = `${point.w}px`;
    traveler.style.height = `${point.h}px`;
    traveler.style.transform = `translate3d(${point.x - point.w / 2}px,${point.y - scrollY - point.h / 2}px,0) rotate(${angle}deg)`;
  }
  function heroRest(time) {
    const scene = anchor(get('.hero-scene'), time, hero, '.hero-inner');
    const slot = anchor(get('.hero-brown'), time, hero, '.hero-inner');
    const w = Math.min(slot.w * .85, innerHeight * .3);
    const h = w * 1.4;
    // Keep the egg in the centre of the illustration, above the viewport edge.
    const centreY = Math.min(innerWidth <= 640 ? scene.y - time : innerHeight * .6, innerHeight - h / 2 - 65);
    return {time, x:scene.x, y:time + centreY, w, h};
  }
  function travel(a, b, cooked = false) {
    const t = range(scrollY, a.time, b.time), eased = smooth(t);
    if (Math.abs(a.x-b.x) < .5 && Math.abs(a.y-b.y) < .5 && Math.abs(a.w-b.w) < .5) {
      paint(a, 1, 0, cooked);
      return;
    }
    const point = {};
    for (const key of ['x','y','w','h']) point[key] = mix(a[key], b[key], eased);
    // A restrained sideways arc makes the egg roll between chapters.
    const arc = Math.sin(t * Math.PI);
    if (!cooked) {
      const shrink = 1 - arc * (innerWidth <= 640 ? .4 : .18);
      point.w *= shrink; point.h *= shrink;
      point.x += arc * (innerWidth <= 640 ? innerWidth * .5 : innerWidth * .16);
      point.x = Math.max(point.w / 2 + 8, Math.min(innerWidth - point.w / 2 - 8, point.x));
    }
    paint(point, 1, Math.sin(t * Math.PI * 2) * (cooked ? 5 : 12), cooked);
  }
  function render() {
    queued = false;
    if (motion.matches) {
      traveler.style.visibility = 'hidden';
      whiteEgg.style.opacity = '1';
      [insideEgg, escapeEgg, shell, omelette, plate].forEach(el => el.style.visibility = '');
      return;
    }
    const H = innerHeight, W = innerWidth;
    const heroEnd = pinRange(hero, '.hero-inner');
    const nest = get('.journey-farm-egg');
    const nestBox = nest.getBoundingClientRect();
    const farmTime = Math.max(heroEnd + 1, nestBox.top + scrollY + nestBox.height / 2 - H * .55);
    const farmExit = Math.max(farmTime + 1, farm.offsetTop + farm.offsetHeight - H * .7);
    const eggTime = Math.max(farmExit + 1, eggs.offsetTop - H * .08);
    // Complete the reveal in time, so pausing the scroll never leaves a ghost egg.
    whiteEgg.style.opacity = scrollY >= eggTime ? '1' : '0';
    const insideStart = inside.offsetTop, insideEnd = insideStart + pinRange(inside, '.inside-sticky');
    const escapeStart = escape.offsetTop, escapeEnd = escapeStart + pinRange(escape, '.escape-sticky');
    const cookingEntry = cooking.offsetTop + pinRange(cooking, '.cooking-sticky') * .09;
    const cookingEnd = cooking.offsetTop + pinRange(cooking, '.cooking-sticky');
    const morningEntry = morning.offsetTop + pinRange(morning, '.morning-sticky') * .17;
    insideEgg.style.visibility = scrollY >= insideStart && scrollY <= insideEnd ? 'visible' : 'hidden';
    escapeEgg.style.visibility = scrollY >= escapeStart && scrollY <= escapeEnd ? 'visible' : 'hidden';
    shell.style.visibility = scrollY >= cookingEntry ? 'visible' : 'hidden';
    omelette.style.visibility = scrollY <= cookingEnd ? 'visible' : 'hidden';
    plate.style.visibility = scrollY >= morningEntry ? 'visible' : 'hidden';
    if (scrollY < heroEnd) {
      const p = clamp(scrollY / Math.max(1, heroEnd));
      const svg = get('.hen');
      const laid = new DOMPoint(230, 435).matrixTransform(svg.getScreenCTM());
      const rest = heroRest(scrollY);
      const t = smooth(range(p, .34, .68));
      const w = mix(W <= 640 ? 53 : 90, rest.w, t);
      paint({x:mix(laid.x, rest.x, t), y:mix(laid.y + scrollY + 25, rest.y, t), w, h:w * 1.4}, smooth(range(p, .27, .35)), -10 * (1-t));
      return;
    }
    if (scrollY <= insideStart) {
      const eggExit = Math.min(insideStart - 1, Math.max(eggTime + 1, eggs.offsetTop + eggs.offsetHeight - H * .65));
      const origin = heroRest(heroEnd);
      const nodes = [origin, anchor(nest, farmTime),
        {time:farmExit,x:W * .84,y:farmExit + H * .62,w:W <= 640 ? 55 : 82,h:W <= 640 ? 77 : 115},
        anchor(get('.destination-brown'), eggTime), anchor(get('.destination-brown'), eggExit),
        anchor(get('.inside-shell-intact'), insideStart, inside, '.inside-sticky')];
      const i = nodes.findIndex((n,index) => index < nodes.length-1 && scrollY <= nodes[index+1].time);
      travel(nodes[Math.max(0,i)], nodes[Math.max(0,i)+1]);
      return;
    }
    if (scrollY > insideEnd && scrollY < escapeStart) {
      travel(anchor(get('.inside-shell-intact'), insideEnd, inside, '.inside-sticky'), anchor(escapeEgg, escapeStart, escape, '.escape-sticky'));
      return;
    }
    if (scrollY > escapeEnd && scrollY < cookingEntry) {
      travel(anchor(escapeEgg, escapeEnd, escape, '.escape-sticky'), anchor(shell, cookingEntry, cooking, '.cooking-sticky'));
      return;
    }
    if (scrollY > cookingEnd && scrollY < morningEntry) {
      const from = anchor(omelette, cookingEnd, cooking, '.cooking-sticky');
      const to = anchor(plate, morningEntry, morning, '.morning-sticky');
      // Travel as the cooked egg, then settle into the first breakfast plate.
      to.w *= .48; to.h = to.w * .53;
      travel(from, to, true);
      return;
    }
    traveler.style.visibility = 'hidden';
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(render); } }
  function configure() {
    document.body.classList.toggle('egg-journey', !motion.matches);
    // Refresh the comparison egg after handing ownership to this controller.
    dispatchEvent(new Event('resize'));
    schedule();
  }
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule);
  addEventListener('pageshow', schedule);
  motion.addEventListener('change', configure);
  new ResizeObserver(schedule).observe(document.querySelector('main'));
  if (document.fonts) document.fonts.ready.then(schedule);
  configure();
})();
