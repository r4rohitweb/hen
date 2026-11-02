export default function initShopAndCare(scope) {
  const { requestAnimationFrame, ResizeObserver, IntersectionObserver } = scope;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const care = document.querySelector('.care-section');
  const sticky = care.querySelector('.care-sticky');
  const sourceCarton = document.querySelector('.product-card:nth-child(2) .carton-svg');
  const destinationCarton = care.querySelector('.carton-svg');
  const flight = document.querySelector('.carton-flight');
  const open = care.querySelector('.carton-open');
  const closed = care.querySelector('.carton-closed');
  const sticker = care.querySelector('.carton-sticker');
  const note = care.querySelector('.sticker-note');
  const packedEggs = [...care.querySelectorAll('.carton-egg')];
  const steps = [...document.querySelectorAll('.care-steps li')];
  const clamp = n => Math.min(1, Math.max(0, n));
  const shop = document.querySelector('.shop-section');
  const shopHeading = shop.querySelector('.section-heading');
  const shopCards = [...shop.querySelectorAll('.product-card')];
  let shopLayout = [];
  function measureShop() {
    // Layout offsets exclude the animated translate/scale, so scrolling cannot
    // feed the animation's own movement back into its progress calculation.
    function documentTop(element) {
      let top = 0;
      for (let node = element; node; node = node.offsetParent) top += node.offsetTop;
      return top;
    }
    shopLayout = [shopHeading, ...shopCards].map((element, index) => ({
      element, top: documentTop(element), index,
      stagger: innerWidth > 640 && index > 0 ? (index - 1) * 30 : 0
    }));
    requestFrame();
  }
  if (!reduced) {
    shop.querySelectorAll('.reveal').forEach(element => element.classList.remove('reveal'));
    shop.classList.add('shop-scroll-ready');
  }
  let frame = false;
  function animateScroll() {
    frame = false;
    if (!reduced) {
      shopLayout.forEach(({element, top, index, stagger}) => {
        const start = top - innerHeight * .96 + stagger;
        const distance = Math.min(280, innerHeight * .32);
        const progress = clamp((scrollY - start) / distance);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.style.setProperty('--shop-opacity', String(progress));
        element.style.setProperty('--shop-y', `${(1 - eased) * (index ? 70 : 30)}px`);
        element.style.setProperty('--shop-scale', String(1 - (1 - eased) * (index ? .045 : .015)));
        element.style.setProperty('--shop-rotate', `${index ? (1 - eased) * [0, -2.5, 0, 2.5][index] : 0}deg`);
      });
      // Carry the actual carton composition across the section boundary. The
      // endpoints stay in viewport coordinates as the page moves underneath.
      const handoffStart = care.offsetTop - innerHeight * .85;
      const handoffEnd = care.offsetTop - innerHeight * .05;
      const handoff = clamp((scrollY - handoffStart) / (handoffEnd - handoffStart));
      const flying = handoff > 0 && handoff < 1;
      sourceCarton.style.opacity = handoff === 0 ? '1' : '0';
      destinationCarton.style.opacity = handoff === 1 ? '1' : '0';
      flight.style.visibility = flying ? 'visible' : 'hidden';
      if (flying) {
        const source = sourceCarton.getBoundingClientRect();
        const destination = destinationCarton.getBoundingClientRect();
        const t = handoff * handoff * (3 - 2 * handoff);
        const lerp = (a, b) => a + (b - a) * t;
        const arc = Math.sin(Math.PI * handoff);
        flight.style.width = `${lerp(source.width, destination.width)}px`;
        flight.style.height = `${lerp(source.height, destination.height)}px`;
        flight.style.transform = `translate3d(${lerp(source.left, destination.left)}px,${lerp(source.top, destination.top) - arc * 38}px,0) rotate(${arc * -3}deg)`;
      }
    }
    const p = clamp((scrollY - care.offsetTop) / Math.max(1, care.offsetHeight - sticky.offsetHeight));
    const closing = clamp((p - .17) / .36);
    const sealing = clamp((p - .65) / .25);
    open.style.transform = `scaleY(${1 - closing})`;
    open.style.opacity = String(1 - closing);
    closed.style.opacity = String(closing);
    closed.style.transform = reduced ? '' : `translateY(${-45 * (1 - closing)}px)`;
    packedEggs.forEach(egg => { egg.style.opacity = String(1 - closing); });
    sticker.style.opacity = String(sealing);
    sticker.style.transform = reduced ? '' : `translateY(${-25 * (1 - sealing)}px)`;
    note.style.opacity = String(sealing);
    note.style.transform = `translateY(${12 * (1 - sealing)}px)`;
    const active = p < .35 ? 0 : p < .72 ? 1 : 2;
    steps.forEach((step, i) => {
      step.classList.toggle('is-active', i <= active);
      step.classList.toggle('is-current', i === active);
    });
    if (!reduced) {
      const farm = document.querySelector('.farm-gallery');
      const offset = clamp((innerHeight - farm.getBoundingClientRect().top) / (innerHeight + farm.offsetHeight));
      farm.style.setProperty('--farm-shift', `${-8 + offset * 7}%`);
    }
  }
  function requestFrame() { if (!frame) { frame = true; requestAnimationFrame(animateScroll); } }
  scope.on(window, 'scroll', requestFrame, {passive:true});
  scope.on(window, 'resize', measureShop);
  scope.on(window, 'pageshow', requestFrame);
  if (document.fonts) document.fonts.ready.then(scope.guard(measureShop));
  new ResizeObserver(requestFrame).observe(care);
  new ResizeObserver(measureShop).observe(shop);
  measureShop();
  animateScroll();
  if (!reduced && 'IntersectionObserver' in window) {
    document.body.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), {threshold:.1});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

}
