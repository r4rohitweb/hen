(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let colour = 'brown';
  let serial = 0;
  function cartonMarkup(count) {
    const id = `carton-${serial++}`;
    const cols = count / 2, gap = 440 / cols, eggWidth = Math.min(67, gap * .8);
    const egg = (x, y, scale) => `<path class="carton-egg" d="M0 -52C-19 -52 -33 -12 -33 10C-33 38 -19 48 0 48S33 38 33 10C33 -12 19 -52 0 -52Z" transform="translate(${x} ${y}) scale(${eggWidth / 66 * scale} ${scale})" fill="url(#${id}-brown)" stroke="#614729" stroke-opacity=".1"/>`;
    const back = Array.from({length:cols},(_,i)=>egg(80 + gap * (i+.5),264,.91)).join('');
    const front = Array.from({length:cols},(_,i)=>egg(80 + gap * (i+.5),319,1)).join('');
    const cups = Array.from({length:cols},(_,i)=>{const x=80+gap*i;return `<path d="M${x} 338q${gap/2} 22 ${gap} 0l-7 58q-${gap/2-7} 19 -${gap-14} 0Z" fill="url(#${id}-pulp)" stroke="#b4a17b" stroke-width="1.5"/><path d="M${x+7} 346q${gap/2-7} 13 ${gap-14} 0" stroke="#f0e4c8" stroke-width="4"/>`}).join('');
    return `<svg class="carton-svg" viewBox="0 0 600 460" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="--white-egg-fill:url(#${id}-white)"><defs><linearGradient id="${id}-pulp" x2=".8" y2="1"><stop stop-color="#e2d4b5"/><stop offset=".45" stop-color="#c9b58d"/><stop offset="1" stop-color="#a58e66"/></linearGradient><linearGradient id="${id}-lid" x2=".7" y2="1"><stop stop-color="#d6c4a1"/><stop offset=".48" stop-color="#ecdfc2"/><stop offset="1" stop-color="#c4b08a"/></linearGradient><radialGradient id="${id}-brown" cx="32%" cy="25%" r="85%"><stop stop-color="#e1bb8e"/><stop offset=".5" stop-color="#ba8656"/><stop offset="1" stop-color="#895932"/></radialGradient><radialGradient id="${id}-white" cx="32%" cy="25%" r="85%"><stop stop-color="#fffefa"/><stop offset=".55" stop-color="#ecebe4"/><stop offset="1" stop-color="#b8b8aa"/></radialGradient><filter id="${id}-shadow"><feGaussianBlur stdDeviation="8"/></filter></defs><ellipse cx="300" cy="417" rx="249" ry="16" fill="#30200f" opacity=".2" filter="url(#${id}-shadow)"/><g class="carton-open"><path d="M61 49Q62 34 81 34H520Q541 34 541 55L534 226H65Z" fill="url(#${id}-pulp)" stroke="#ad9671" stroke-width="3"/><path d="M80 62Q80 53 94 53H508Q523 53 522 70L515 207H84Z" fill="url(#${id}-lid)" stroke="#b19a72" stroke-width="5"/><path d="M91 66H510" stroke="#f5ead2" stroke-width="5" stroke-linecap="round"/><path d="M145 66h38v10h-38zm260 0h38v10h-38z" fill="#786344"/><path d="M92 206h418" stroke="#a18962" stroke-width="5"/></g><path d="M60 249L78 220H522L543 249 550 396Q548 413 527 414H76Q55 413 52 396Z" fill="url(#${id}-pulp)" stroke="#aa926a" stroke-width="2"/><path d="M74 247H528L526 351H77Z" fill="#8b7755"/>${back}<path d="M80 288q220-35 440 0v35H80Z" fill="#c5b18b"/>${front}${cups}<path d="M55 395q245 30 493 0l-2 16q-248 27-490-1Z" fill="#d8c8a7" stroke="#b09b76" stroke-width="2"/><g class="carton-closed"><path d="M54 250Q54 236 72 235H526Q543 236 544 251L550 350Q548 364 531 365H70Q52 365 50 351Z" fill="url(#${id}-lid)" stroke="#af9872" stroke-width="3"/><path d="M62 349Q301 365 538 349" stroke="#f2e4c7" stroke-width="4"/><path d="M76 247H521" stroke="#eddfc1" stroke-width="4"/></g><g class="carton-sticker"><rect x="144" y="245" width="314" height="103" rx="6" fill="#f5f2dc"/><path d="M144 295Q247 277 458 287V342Q458 348 452 348H150Q144 348 144 342Z" fill="#224d3c"/><ellipse cx="377" cy="274" rx="31" ry="20" fill="#fcfbf2" transform="rotate(-20 377 274)"/><ellipse cx="412" cy="278" rx="24" ry="16" fill="#e8e7d9" transform="rotate(15 412 278)"/><path d="M339 280q-34-39-46-18 8 20 46 18m86-7q17-33 29-18-2 16-29 18" fill="#849446"/><text x="166" y="277" font-family="Nunito,Arial,sans-serif" font-weight="900" font-size="22" fill="#302216">Yolk &amp; Co.</text><text class="sticker-egg-text" x="164" y="315" font-family="Nunito,Arial,sans-serif" font-weight="900" font-size="18" fill="#fffbea">Fresh Brown Eggs</text><text x="165" y="335" font-family="Nunito,Arial,sans-serif" font-size="9" fill="#e7ead3">FROM OUR FLOCK TO YOUR PAN</text><circle cx="434" cy="327" r="17" fill="#f1d985"/><text x="434" y="330" text-anchor="middle" font-family="Nunito,Arial,sans-serif" font-weight="900" font-size="12" fill="#302216">10</text></g></svg>`;
  }
  document.querySelectorAll('[data-carton]').forEach(el => { el.innerHTML = cartonMarkup(Number(el.dataset.carton)); });
  function setColour(next) {
    colour = next;
    document.querySelectorAll('[data-colour]').forEach(button => {
      const active = button.dataset.colour === colour;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-carton]').forEach(el => {
      el.classList.toggle('white-eggs', colour === 'white');
      if (el.classList.contains('product-image')) el.setAttribute('aria-label', `Open carton of ${el.dataset.carton} ${colour} eggs`);
    });
    document.querySelectorAll('.product-colour').forEach(el => { el.textContent = colour === 'white' ? 'White' : 'Brown'; });
    document.querySelectorAll('.sticker-egg-text').forEach(el => { el.textContent = `Fresh ${colour === 'white' ? 'White' : 'Brown'} Eggs`; });
  }
  document.querySelectorAll('[data-colour]').forEach(button => button.addEventListener('click', () => setColour(button.dataset.colour)));
  document.querySelectorAll('[data-shop-colour]').forEach(link => link.addEventListener('click', () => setColour(link.dataset.shopColour)));
  const dialog = document.querySelector('.info-dialog');
  document.querySelectorAll('.buy-button').forEach(button => button.addEventListener('click', () => {
    dialog.querySelector('h2').textContent = 'A good choice.';
    const description = dialog.querySelector('p');
    description.replaceChildren();
    const summary = document.createElement('span');
    summary.className = 'order-summary';
    summary.textContent = `${colour === 'white' ? 'White' : 'Brown'} eggs · Pack of ${button.dataset.pack} · ₹${button.dataset.price}`;
    description.append(summary, document.createElement('br'), document.createElement('br'), 'Online checkout is not available yet. Your selection is ready for when ordering opens.');
    dialog.showModal();
  }));
  const care = document.querySelector('.care-section');
  const sticky = care.querySelector('.care-sticky');
  const sourceCarton = document.querySelector('.product-card:nth-child(2) .carton-svg');
  const destinationCarton = care.querySelector('.carton-svg');
  const flight = document.createElement('div');
  flight.className = 'carton-flight';
  flight.dataset.carton = '10';
  flight.setAttribute('aria-hidden', 'true');
  flight.innerHTML = cartonMarkup(10);
  document.body.append(flight);
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
  addEventListener('scroll', requestFrame, {passive:true});
  addEventListener('resize', measureShop);
  addEventListener('pageshow', requestFrame);
  if (document.fonts) document.fonts.ready.then(measureShop);
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
  const tour = document.querySelector('.tour-dialog');
  const tourItems = [
    ['assets/farm-exterior.png', 'Around the farm', 'The farm · 1 / 2', 'Illustrative exterior of a poultry farm at golden hour'],
    ['assets/farm-interior.png', 'Inside the barn', 'Inside the barn · 2 / 2', 'Illustrative interior of a sunlit poultry barn']
  ];
  let tourIndex = 0;
  function showTour(index) {
    tourIndex = (index + tourItems.length) % tourItems.length;
    const [src, title, caption, alt] = tourItems[tourIndex];
    tour.querySelector('.tour-image').src = src;
    tour.querySelector('.tour-image').alt = alt;
    tour.querySelector('.tour-title').textContent = title;
    tour.querySelector('.tour-caption').textContent = caption;
  }
  document.querySelector('.tour-button').addEventListener('click', () => { showTour(0); tour.showModal(); });
  tour.querySelector('.tour-close').addEventListener('click', () => tour.close());
  tour.querySelector('.tour-next').addEventListener('click', () => showTour(tourIndex + 1));
  tour.querySelector('.tour-prev').addEventListener('click', () => showTour(tourIndex - 1));
  tour.addEventListener('keydown', e => { if(e.key === 'ArrowRight') showTour(tourIndex + 1); if(e.key === 'ArrowLeft') showTour(tourIndex - 1); });
})();
