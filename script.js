(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.hero');
  const inner = hero.querySelector('.hero-inner');
  const scene = hero.querySelector('.hero-scene');
  const walker = hero.querySelector('.hen-walker');
  const head = hero.querySelector('.hen-head');
  const legs = [...hero.querySelectorAll('.hen-leg')];
  const ground = [...hero.querySelectorAll('.hen-ground')];
  const nest = hero.querySelector('.hero-nest');
  const nestFront = document.querySelector('.hero-nest-front');
  const copy = hero.querySelector('.hero-copy');
  const display = hero.querySelector('.egg-display');
  const basket = hero.querySelector('.egg-tokri');
  const hint = hero.querySelector('.hen-scroll-hint');
  const speech = hero.querySelector('.speech');
  const sparkles = [...hero.querySelectorAll('.sparkle')];
  const eggSection = document.querySelector('#eggs');
  const eggs = [...document.querySelectorAll('.egg-layer .egg')];
  const origins = [hero.querySelector('.hero-brown'), hero.querySelector('.hero-white')];
  const destinations = [...document.querySelectorAll('.destination')];
  const intro = document.createElement('p');
  const landscape = hero.querySelector('.hero-landscape');
  intro.className = 'hero-intro-word';
  intro.textContent = 'One hen. Two good eggs.';
  intro.setAttribute('aria-hidden','true');
  inner.append(intro);
  const front = document.createElement('div');
  front.className = 'tokri-front';
  front.setAttribute('aria-hidden','true');
  front.innerHTML = '<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg"><path d="M60 235Q300 322 540 235L490 350Q300 410 110 350Z" fill="url(#tokri-weave)" stroke="#a57441" stroke-width="2"/><path d="M60 235Q300 322 540 235L490 350Q300 410 110 350Z" fill="url(#tokri-wood)" opacity=".18"/><path d="M61 236Q300 322 539 236" fill="none" stroke="#e7bb80" stroke-width="14" stroke-linecap="round"/><path d="M61 240Q300 326 539 240" fill="none" stroke="#a87640" stroke-width="3"/><path d="M110 350Q300 410 490 350" fill="none" stroke="#d7a669" stroke-width="7"/><path d="m72 251 18 49m420-50-18 50" stroke="#e5b77e" stroke-width="7" stroke-linecap="round"/></svg>';
  document.querySelector('.egg-layer').append(front);
  const clamp = n => Math.min(1, Math.max(0,n));
  const range = (n,a,b) => clamp((n-a)/(b-a));
  const smooth = t => t*t*(3-2*t);
  const mix = (a,b,t) => a+(b-a)*t;
  let geometry = {}, eggLayout = [], basketLayout = {}, queued = false;
  function measure() {
    const pinDistance = reduced ? 0 : Math.max(0,hero.offsetHeight-inner.offsetHeight);
    const pin = Math.min(scrollY,pinDistance);
    const rect = scene.getBoundingClientRect();
    const w=walker.offsetWidth,h=walker.offsetHeight;
    // Locate the hen's belly in the fitted SVG, relative to the CSS transform origin.
    const fit=Math.min(w/560,h/570);
    geometry = {pinDistance,width:w,height:h,center:rect.left+walker.offsetLeft+w*.5,
      foot:rect.top+scrollY-pin+walker.offsetTop+h*.93,
      bellyX:(w-560*fit)/2+322*fit-w*.5,
      bellyY:(h-570*fit)/2+477*fit-h*.93};
    eggLayout=origins.map((el,i)=>{
      const a=el.getBoundingClientRect(),b=destinations[i].getBoundingClientRect();
      return {x:a.left+(a.width-el.offsetWidth)/2,y:a.top+scrollY-pin+(a.height-el.offsetHeight)/2,
        w:el.offsetWidth,h:el.offsetHeight,endX:b.left,endY:b.top+scrollY,endW:b.width,endH:b.height};
    });
    const br=basket.getBoundingClientRect();
    basketLayout={x:br.left,y:br.top+scrollY-pin,w:br.width,h:br.height};
    render();
  }
  function render() {
    queued=false;
    const pinDistance=geometry.pinDistance||0;
    const stage=reduced?1:clamp(scrollY/Math.max(1,pinDistance));
    const pin=Math.min(scrollY,pinDistance);
    const departure=smooth(range(stage,.22,.67));
    const basketReveal=reduced?1:smooth(range(stage,.54,.75));
    const textReveal=reduced?1:smooth(range(stage,.32,.61));
    const exitEnd=Math.max(pinDistance+1,eggSection.offsetTop-innerHeight*.13);
    const exit=clamp((scrollY-pinDistance)/(exitEnd-pinDistance));
    const eggTravel=smooth(exit);
    const basketOpacity=basketReveal*(1-range(exit,0,.38));
    const fullHeight=Math.min(innerHeight*.88,innerWidth*1.13,900);
    const fullScale=fullHeight/Math.max(1,geometry.height);
    const fullFoot=Math.min(inner.offsetHeight-55,inner.offsetHeight*.56+fullHeight*.4);
    const journey = document.body.classList.contains('egg-journey');
    const nestBox=nest.getBoundingClientRect();
    const settle=smooth(range(stage,.68,.78));
    const lift=smooth(range(stage,.81,.93));
    const seatedScaleX=.62;
    const seatedScaleY=.62-settle*.06;
    // Anchor the belly to the nest's hollow; hiding the legs must not leave a gap.
    const nestCenter=nestBox.left+nestBox.width*(.53+lift*.04)-geometry.bellyX*seatedScaleX;
    const nestFoot=nestBox.top+nestBox.height*(.35+settle*.08)-geometry.bellyY*seatedScaleY;
    const targetCenter=mix(innerWidth*.46,journey?nestCenter:geometry.center+innerWidth*.08,departure);
    const targetFoot=mix(fullFoot,journey?nestFoot:geometry.foot+20,departure);
    const peckPhase=range(stage,.04,.22);
    const peck=stage>.04&&stage<.22?Math.pow(Math.sin(peckPhase*Math.PI),2):0;
    walker.style.transform=`translate3d(${targetCenter-geometry.center}px,${targetFoot-geometry.foot}px,0) scale(${mix(fullScale,journey ? seatedScaleX : .55,departure)},${mix(fullScale,journey ? seatedScaleY : .55,departure)}) rotate(${peck*4}deg)`;
    walker.style.opacity=reduced?'0':journey?'1':String(1-smooth(range(stage,.46,.7)));
    head.style.transform=`translateY(${peck*120}px) rotate(${peck*60}deg)`;
    legs.forEach((leg,i)=>{
      leg.style.transform=`rotate(${Math.sin(departure*Math.PI*6)*(i?-9:9)}deg)`;
      leg.style.opacity=journey?String(1-settle):'1';
    });
    ground.forEach(element=>{element.style.opacity=journey?String(1-settle):'1';});
    // Introduce the nest only after the large opening hen has finished moving.
    const nestOpacity=journey?smooth(range(stage,.67,.74))*(1-smooth(range(exit,0,.5))):0;
    nest.style.opacity=String(nestOpacity);
    nestFront.style.opacity=String(nestOpacity);
    nestFront.style.width=`${nestBox.width}px`;
    nestFront.style.height=`${nestBox.height}px`;
    nestFront.style.transform=`translate3d(${nestBox.left}px,${nestBox.top}px,0)`;
    copy.style.opacity=String(textReveal);
    copy.style.translate=`0 ${(1-textReveal)*26}px`;
    copy.style.pointerEvents=textReveal>.85?'auto':'none';
    copy.style.visibility=textReveal>0?'visible':'hidden';
    intro.style.opacity=String(1-smooth(range(stage,.12,.35)));
    landscape.style.opacity=reduced?'0':String(1-smooth(range(stage,.34,.68))*(journey ? .78 : 1));
    hint.style.opacity=String(1-smooth(range(stage,.08,.28)));
    speech.style.visibility='hidden';
    sparkles.forEach(el=>{el.style.opacity=String(basketOpacity*.7);});
    display.style.opacity=String(basketOpacity);
    front.style.width=`${basketLayout.w}px`;
    front.style.height=`${basketLayout.h}px`;
    front.style.transform=`translate3d(${basketLayout.x}px,${basketLayout.y+pin}px,0)`;
    front.style.opacity=String(basketOpacity);
    eggLayout.forEach((a,i)=>{
      // The journey controller owns both eggs while the story is active.
      if (journey) return;
      const reveal=reduced?1:smooth(range(stage,.69+i*.045,.86+i*.045));
      const scale=i?.88:.94;
      const heroW=a.w*scale,heroH=a.h*scale;
      const heroX=a.x-(heroW-a.w)/2+(innerWidth<=640?(i?-13:8):(i?-48:28));
      const heroY=a.y+pin-(innerWidth<=640?(i?62:79):(i?157:181));
      const w=mix(heroW,a.endW,eggTravel),h=mix(heroH,a.endH,eggTravel);
      const x=mix(heroX,a.endX,eggTravel),y=mix(heroY,a.endY,eggTravel);
      eggs[i].style.width=`${w}px`;
      eggs[i].style.height=`${h}px`;
      eggs[i].style.opacity=String(reveal);
      eggs[i].style.transform=`translate3d(${x}px,${y-(1-reveal)*80}px,0) rotate(${mix(i?11:-12,0,eggTravel)}deg) scale(${.86+reveal*.14})`;
    });
  }
  function schedule(){if(!queued){queued=true;requestAnimationFrame(render);}}
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',measure);
  addEventListener('pageshow',measure);
  new ResizeObserver(measure).observe(scene);
  if(document.fonts)document.fonts.ready.then(measure);
  measure();
  const dialog=document.querySelector('.info-dialog');
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.querySelector('.dialog-done').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
})();
