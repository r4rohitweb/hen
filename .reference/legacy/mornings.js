(() => {
  'use strict';
  const section=document.querySelector('#mornings');
  const sticky=section.querySelector('.morning-sticky');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const panels=[...section.querySelectorAll('.morning-panel')];
  const plates=[...section.querySelectorAll('.morning-plate')];
  const buttons=[...section.querySelectorAll('[data-morning]')];
  const seed=section.querySelector('.morning-seed');
  const cup=section.querySelector('.morning-cup');
  const note=section.querySelector('.morning-scene-note');
  const linen=section.querySelector('.morning-linen');
  const garnishLayer=section.querySelector('.morning-garnishes');
  const clamp=n=>Math.min(1,Math.max(0,n));
  const smooth=t=>t*t*(3-2*t);
  const range=(p,a,b)=>clamp((p-a)/(b-a));
  const chapters=[.17,.37,.57,.77];
  const colours=['#f8edcc','#f5e4b5','#e3e8d3','#f0ded3','#e8d0b8','#f7ecd0'];
  const accents=['#ae8947','#ac7d38','#75825a','#aa7b64','#9f7046','#9b7841'];
  const garnishes=[['chilli','onion','tomato','herb'],['onion','herb','chilli','tomato'],['berry','cinnamon','butter','berry'],['herb','egghalf','chilli','tomato']].map((items,i)=>items.map((kind,j)=>{
    const el=document.createElementNS('http://www.w3.org/2000/svg','svg');
    el.setAttribute('viewBox','0 0 80 80');
    el.classList.add('morning-garnish');
    el.innerHTML=`<use href="#morning-${kind}"/>`;
    garnishLayer.append(el);
    return {el,x:[4,85,0,87][j],y:[9,18,73,77][j],angle:[-25,18,22,-17][j],side:j%2?1:-1};
  }));
  function rgb(hex){return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));}
  let queued=false,currentPanel=-1;
  function weights(p){
    const values=[1,0,0,0,0,0];
    const transitions=[[.07,.15],[.27,.35],[.47,.55],[.67,.75],[.88,.97]];
    transitions.forEach(([a,b],i)=>{const t=smooth(range(p,a,b));values[i]*=1-t;values[i+1]=t;});
    return values;
  }
  function render(){
    queued=false;
    const p=reduced?1:clamp((scrollY-section.offsetTop)/Math.max(1,section.offsetHeight-sticky.offsetHeight));
    const w=weights(p),finale=w[5];
    let red=0,green=0,blue=0,ar=0,ag=0,ab=0;
    w.forEach((v,i)=>{const c=rgb(colours[i]),a=rgb(accents[i]);red+=c[0]*v;green+=c[1]*v;blue+=c[2]*v;ar+=a[0]*v;ag+=a[1]*v;ab+=a[2]*v;});
    section.style.setProperty('--morning-bg',`rgb(${Math.round(red)},${Math.round(green)},${Math.round(blue)})`);
    section.style.setProperty('--morning-accent',`rgb(${Math.round(ar)},${Math.round(ag)},${Math.round(ab)})`);
    const active=w.indexOf(Math.max(...w));
    panels.forEach((panel,i)=>{
      panel.style.opacity=String(w[i]);
      panel.style.visibility=w[i]>.001?'visible':'hidden';
      panel.style.pointerEvents=w[i]>.8?'auto':'none';
      panel.style.transform=`translateY(${reduced?0:(1-w[i])*17}px)`;
      if(active!==currentPanel)panel.setAttribute('aria-hidden',String(i!==active));
    });
    currentPanel=active;
    seed.style.opacity=String(w[0]);
    seed.style.transform=`translateY(${-range(p,0,.1)*24}px) rotate(${-13+range(p,0,.15)*28}deg) scale(${1-range(p,.07,.15)*.35})`;
    const spread=[[-24,-23],[24,-23],[-24,23],[24,23]];
    plates.forEach((plate,i)=>{
      const local=range(p,chapters[i]-.1,chapters[i]+.13);
      const incoming=1-smooth(range(p,chapters[i]-.1,chapters[i]-.02));
      const opacity=Math.min(1,w[i+1]+finale);
      const offset=(1-opacity)*36;
      const x=spread[i][0]*finale,y=spread[i][1]*finale;
      const scale=1-finale*.49;
      const angle=(1-finale)*(incoming*(i%2?12:-12)+(local-.5)*2);
      plate.style.opacity=String(opacity);
      plate.style.transform=`translate(${x}%,${y}%) translateY(${offset}px) scale(${scale}) rotate(${angle}deg)`;
      plate.setAttribute('aria-hidden',String(opacity<.5));
      plate.querySelector('.morning-plate-tag').style.opacity=String(1-finale);
      garnishes[i].forEach(({el,x,y,angle,side},j)=>{
        const appear=smooth(range(p,chapters[i]-.07+j*.007,chapters[i]+.015));
        const visible=w[i+1]*(1-finale);
        el.style.left=`${x}%`;el.style.top=`${y}%`;
        el.style.opacity=String(visible);
        el.style.transform=`translate(${(1-appear)*side*100}px,${(1-appear)*-35}px) rotate(${angle+local*35}deg)`;
      });
    });
    buttons.forEach((button,i)=>{
      const filled=range(p,chapters[i]-.1,chapters[i]+.1);
      button.querySelector('i').style.transform=`scaleX(${filled})`;
      button.classList.toggle('is-active',active===i+1);
      if(active===i+1)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');
    });
    cup.style.opacity=String((w[2]+w[3])*.85);
    cup.style.transform=`translateY(${(1-w[2]-w[3])*25}px)`;
    note.style.opacity=String(finale);
    linen.style.transform=`translateX(${(p-.5)*-35}px)`;
  }
  function schedule(){if(!queued){queued=true;requestAnimationFrame(render);}}
  buttons.forEach((button,i)=>button.addEventListener('click',()=>{
    const travel=section.offsetHeight-sticky.offsetHeight;
    scrollTo({top:section.offsetTop+travel*chapters[i],behavior:reduced?'instant':'smooth'});
  }));
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule);
  addEventListener('pageshow',schedule);
  new ResizeObserver(schedule).observe(section);
  if(document.fonts)document.fonts.ready.then(schedule);
  render();
})();
