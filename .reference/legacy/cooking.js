(() => {
  'use strict';
  const section = document.querySelector('#cooking');
  const sticky = section.querySelector('.cooking-sticky');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const select = name => section.querySelector(`.${name}`);
  const shell = select('cooking-shell'), left = select('shell-left'), right = select('shell-right');
  const crack = select('shell-crack'), white = select('falling-white'), yolk = select('falling-yolk');
  const raw = select('pan-raw-egg'), mixture = select('pan-mixture'), whisk = select('cooking-whisk');
  const omelette = select('pan-omelette'), fold = select('omelette-fold'), herbs = select('omelette-herbs');
  const steam = select('cooking-steam'), flames = select('kitchen-flames'), bubbles = select('cooking-bubbles');
  const knob = select('stove-knob'), indicator = select('gas-indicator'), sparkles = select('kitchen-sparkles');
  const swirl = select('mixture-swirl'), progressBar = select('cooking-progress');
  const progressFill = progressBar.querySelector('span'), count = select('cooking-stage-count');
  const label = select('cooking-stage-label'), shopLink = select('cooking-shop-link');
  const steps = [...section.querySelectorAll('.cooking-steps li')];
  const clamp = n => Math.max(0, Math.min(1, n));
  const range = (p, a, b) => clamp((p - a) / (b - a));
  const smooth = t => t * t * (3 - 2 * t);
  const opacity = (element, value) => { element.style.opacity = String(value); };
  flames.innerHTML = Array.from({length:11}, (_,i) => {
    const x = 297 + i * 25.5, y = 579 + Math.sin(i / 10 * Math.PI) * 24;
    return `<path d="M${x} ${y}c-13-14-9-29 0-44-1 16 15 25 10 37-2 5-5 7-10 7Z" fill="url(#kitchen-flame)"/><path d="M${x+1} ${y-2}c-5-8-2-15 1-20 1 8 7 14 4 18Z" fill="#d0f3f4"/>`;
  }).join('');
  const stages = [
    {at:0, label:'A little crack. A lot of possibility.'},
    {at:.25, label:'In goes the good stuff.'},
    {at:.43, label:'A little swirl of sunshine.'},
    {at:.58, label:'Warm pan. Happier mornings.'},
    {at:.81, label:'Golden, folded, ready to love.'}
  ];
  let queued = false, previousStage = -1;
  function render() {
    queued = false;
    const p = reduced ? 1 : clamp((scrollY - section.offsetTop) / Math.max(1, section.offsetHeight - sticky.offsetHeight));
    const arrive = smooth(range(p, 0, .09));
    const split = smooth(range(p, .15, .27));
    const shellExit = smooth(range(p, .32, .44));
    const drop = smooth(range(p, .26, .39));
    const landing = smooth(range(p, .35, .42));
    const mixing = smooth(range(p, .43, .56));
    const heating = smooth(range(p, .58, .65));
    const cooked = smooth(range(p, .66, .82));
    const folded = smooth(range(p, .83, .94));
    const finish = smooth(range(p, .94, 1));
    shell.style.transform = `translate(${(1-arrive)*-110}px,${(1-arrive)*-100}px) rotate(${(1-arrive)*-18}deg)`;
    opacity(shell, (1-shellExit) * (.35 + arrive * .65));
    left.style.transform = `translate(${-split*73}px,${-split*25}px) rotate(${-split*29}deg)`;
    left.style.transformOrigin = '365px 215px';
    right.style.transform = `translate(${split*73}px,${-split*25}px) rotate(${split*29}deg)`;
    right.style.transformOrigin = '485px 215px';
    crack.style.strokeDashoffset = String(1-range(p,.09,.16));
    opacity(crack,1-split);
    opacity(white, range(p,.23,.28) * (1-range(p,.36,.43)));
    white.style.transformOrigin = '425px 235px';
    white.style.transform = `scaleY(${.15+drop*.85})`;
    opacity(yolk, range(p,.245,.275) * (1-range(p,.37,.405)));
    yolk.style.transform = `translateY(${drop*211}px) scale(${1-drop*.12})`;
    yolk.style.transformOrigin = '425px 245px';
    opacity(raw, landing*(1-mixing));
    raw.style.transformOrigin = '425px 477px';
    raw.style.transform = `scale(${.55+landing*.45})`;
    opacity(mixture, mixing*(1-cooked));
    swirl.style.transform = `translate(${Math.sin(p*95)*3}px,0) rotate(${mixing*210}deg)`;
    const whisking = range(p,.42,.46)*(1-range(p,.53,.58));
    opacity(whisk,whisking);
    whisk.style.transform = reduced ? 'none' : `translate(${Math.sin(p*125)*24}px,${Math.cos(p*125)*8}px) rotate(${Math.sin(p*125)*11}deg)`;
    opacity(flames,heating*(1-finish));
    flames.style.transformOrigin = '425px 601px';
    flames.style.transform = reduced ? 'none' : `scaleY(${.9+Math.sin(p*220)*.1})`;
    knob.style.transform = `rotate(${heating*85*(1-finish)}deg)`;
    indicator.setAttribute('fill',heating>.2&&finish<.9?'#6a9f70':'#6d7460');
    opacity(omelette,cooked);
    fold.style.transform = `scaleY(${1-folded*2})`;
    opacity(herbs,folded);
    opacity(bubbles,heating*(1-folded)*(.65+Math.sin(p*160)*.25));
    bubbles.style.transformOrigin = '425px 477px';
    bubbles.style.transform = `scale(${.95+Math.sin(p*180)*.04})`;
    opacity(steam,range(p,.69,.78)*(1-finish*.5));
    steam.style.transform = reduced ? 'none' : `translateY(${-range(p,.69,1)*25}px)`;
    opacity(sparkles,folded);
    progressFill.style.transform = `scaleX(${p})`;
    progressBar.setAttribute('aria-valuenow',String(Math.round(p*100)));
    opacity(shopLink,finish);
    shopLink.style.visibility = finish>.05?'visible':'hidden';
    shopLink.style.translate = `0 ${(1-finish)*8}px`;
    const current = stages.reduce((index,stage,i)=>p>=stage.at?i:index,0);
    if (current !== previousStage) {
      previousStage = current;
      count.textContent = `0${current+1} / 05`;
      label.textContent = stages[current].label;
      steps.forEach((step,i)=>{
        step.classList.toggle('is-current',i===current);
        step.classList.toggle('is-done',i<current);
        if(i===current)step.setAttribute('aria-current','step');else step.removeAttribute('aria-current');
      });
    }
  }
  function schedule() { if(!queued){queued=true;requestAnimationFrame(render);} }
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule);
  addEventListener('pageshow',schedule);
  new ResizeObserver(schedule).observe(section);
  if(document.fonts)document.fonts.ready.then(schedule);
  render();
})();
