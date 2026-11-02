(() => {
  'use strict';
  const section=document.querySelector('#egg-escape');
  const sticky=section.querySelector('.escape-sticky');
  const stage=section.querySelector('.escape-stage');
  const svg=section.querySelector('.escape-scene');
  const world=section.querySelector('.escape-world');
  const egg=section.querySelector('.escape-egg');
  const shadow=section.querySelector('.escape-egg-shadow');
  const spoon=section.querySelector('.escape-spoon');
  const salt=section.querySelector('.escape-salt-shaker');
  const particles=section.querySelector('.escape-salt-particles');
  const hen=section.querySelector('.escape-hen');
  const speech=section.querySelector('.escape-hen-speech');
  const whoops=section.querySelector('.escape-whoops');
  const nailed=section.querySelector('.escape-nailed');
  const start=section.querySelector('.escape-start');
  const caption=section.querySelector('.escape-caption-title');
  const detail=section.querySelector('.escape-caption-copy');
  const count=section.querySelector('.escape-chapter');
  const controls=[...section.querySelectorAll('[data-escape-chapter]')];
  const actions=section.querySelector('.escape-end-actions');
  const cue=section.querySelector('.escape-scroll-note');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp=n=>Math.min(1,Math.max(0,n));
  const range=(p,a,b)=>clamp((p-a)/(b-a));
  const smooth=t=>t*t*(3-2*t);
  const mix=(a,b,t)=>a+(b-a)*t;
  const chapters=[
    {at:0,target:.05,title:'Just a little wobble…',detail:'Nothing to see here. Just one egg with big plans.'},
    {at:.13,target:.29,title:'Off we go. Mind the chai!',detail:'A quick roll, a little salt, and absolutely no turning back.'},
    {at:.44,target:.51,title:'That spoon looks like a good idea.',detail:'A little balance. A little bounce. What could go wrong?'},
    {at:.58,target:.7,title:'Whoops! We have lift-off.',detail:'One small egg. One very big leap of faith.'},
    {at:.83,target:.96,title:'A little adventure. A very good egg.',detail:'A soft landing, a familiar face, and a happy little ending.'}
  ];
  const grains=Array.from({length:25},(_,i)=>{
    const dot=document.createElementNS('http://www.w3.org/2000/svg','rect');
    dot.setAttribute('width',String(3+i%3));dot.setAttribute('height',String(2+i%2));dot.setAttribute('rx','1');particles.append(dot);
    return {dot,endX:895+(i*43)%210,endY:459+(i*11)%12,jump:12+(i*17)%46};
  });
  let viewWidth=1400,queued=false,previous=-1;
  function measure(){viewWidth=650*stage.clientWidth/Math.max(1,stage.clientHeight);svg.setAttribute('viewBox',`0 0 ${viewWidth} 650`);render();}
  function render(){
    queued=false;
    const p=reduced?1:clamp((scrollY-section.offsetTop)/Math.max(1,section.offsetHeight-sticky.offsetHeight));
    const roll=smooth(range(p,.12,.44));
    const load=smooth(range(p,.44,.54));
    const spring=smooth(range(p,.54,.59));
    const flight=range(p,.58,.83);
    const landed=smooth(range(p,.83,.9));
    const finish=smooth(range(p,.9,1));
    let x=mix(260,1288,roll),y=mix(395,377,roll),rotation=Math.sin(p*65)*range(p,0,.04)*6*(1-range(p,.1,.13));
    rotation+=roll*570;
    if(p>=.44){y=377+load*34-spring*65;rotation=570+spring*40;}
    if(p>=.58){x=mix(1288,2035,smooth(flight));y=mix(346,334,flight)-Math.sin(Math.PI*flight)*235;rotation=610+flight*470;}
    if(p>=.83){x=2035;y=334-Math.sin(landed*Math.PI)*22*(1-landed);rotation=mix(1080,1080+8*Math.sin(landed*Math.PI*2)*(1-landed),landed);}
    egg.style.transform=`translate(${x}px,${y}px) rotate(${rotation}deg)`;
    spoon.style.transform=`rotate(${-load*15+spring*38-landed*23}deg)`;
    const spill=smooth(range(p,.32,.41));
    salt.style.transform=`translateY(20px) rotate(${13+Math.sin(spill*Math.PI)*17}deg)`;
    grains.forEach(({dot,endX,endY,jump},i)=>{
      const t=smooth(range(spill,i*.013,.67+i*.013));
      dot.style.opacity=String(clamp(t*5));
      dot.setAttribute('x',String(mix(993,endX,t)));dot.setAttribute('y',String(mix(445,endY,t)-Math.sin(t*Math.PI)*jump));
    });
    const height=range(395-y,0,265);
    shadow.setAttribute('cx',String(x));shadow.setAttribute('cy',String(mix(468,390,smooth(range(p,.75,.84)))));
    shadow.setAttribute('rx',String(65-height*37));shadow.style.opacity=String((1-height*.55)*(1-landed));
    const reveal=smooth(range(p,.82,.94));
    hen.style.opacity=String(reveal);hen.style.transform=`translateY(${(1-reveal)*130}px)`;
    speech.style.opacity=String(smooth(range(p,.88,.98)));
    whoops.style.opacity=String(range(p,.59,.64)*(1-range(p,.75,.8)));
    nailed.style.opacity=String(landed);
    start.style.opacity=String(1-range(p,.09,.19));
    const follow=mix(x,2190,smooth(range(p,.82,.96)));
    const zoom=innerWidth<=640?1-smooth(range(p,.82,.96))*.24:1;
    const camera=Math.max(0,follow-viewWidth/zoom*(innerWidth<=640?.5:.45));
    world.style.transformOrigin='0 0';
    world.style.transform=`translate(${-camera*zoom}px,${470*(1-zoom)}px) scale(${zoom})`;
    const current=chapters.reduce((n,c,i)=>p>=c.at?i:n,0);
    if(previous!==current){previous=current;caption.textContent=chapters[current].title;detail.textContent=chapters[current].detail;count.textContent=`0${current+1} / 05`;}
    controls.forEach((button,i)=>{
      const next=chapters[i+1]?.at||1;
      button.querySelector('i').style.transform=`scaleX(${range(p,chapters[i].at,next)})`;
      if(i===current)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');
    });
    actions.style.display=p>.92?'flex':'none';cue.style.display=p>.92?'none':'inline';
  }
  function schedule(){if(!queued){queued=true;requestAnimationFrame(render);}}
  function go(progress){scrollTo({top:section.offsetTop+(section.offsetHeight-sticky.offsetHeight)*progress,behavior:reduced?'instant':'smooth'});}
  controls.forEach((button,i)=>button.addEventListener('click',()=>go(chapters[i].target)));
  section.querySelector('.escape-replay').addEventListener('click',()=>go(0));
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',measure);addEventListener('pageshow',measure);
  new ResizeObserver(measure).observe(stage);
  if(document.fonts)document.fonts.ready.then(measure);
  measure();
})();
