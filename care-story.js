// The local module path supports both Vite and the existing XAMPP source URL.
import * as THREE from './node_modules/three/build/three.module.js';

function mountPackingStory() {
  const section = document.querySelector('#care');
  const stage = section?.querySelector('.care-stage');
  if (!stage || stage.querySelector('canvas')) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = value => Math.max(0, Math.min(1, value));
  const range = (value, start, end) => clamp((value-start)/(end-start));
  const smooth = value => value*value*(3-2*value);
  const mix = (a,b,t) => a+(b-a)*t;
  let p = 0, colour = section.querySelector('[data-colour].is-active')?.dataset.colour || 'brown';

  // Scroll-driven atmosphere has no timer and reverses with the packing story.
  const atmosphere = document.createElement('div');
  atmosphere.className = 'care-atmosphere';
  atmosphere.setAttribute('aria-hidden','true');
  const feathers = Array.from({length:14}, (_,i) => {
    const feather = document.createElement('span');
    feather.className = 'care-feather';
    feather.style.left = `${3+(i*37)%94}%`;
    feather.style.top = `${(i*23)%96}%`;
    const fill = i%3===0 ? '#d6a879' : '#fff3d7';
    feather.innerHTML = `<svg viewBox="0 0 20 48" fill="none"><path d="M10 2C-6 16 2 33 10 43 18 28 24 11 10 2Z" fill="${fill}"/><path d="M10 8v39m0-18-5-6m5 12 5-7" stroke="#b89465" stroke-width=".7"/></svg>`;
    atmosphere.append(feather);
    return feather;
  });
  for (let i=0;i<60;i++) {
    const dot = document.createElement('span');
    dot.className = 'care-mote';
    dot.style.left = `${(i*41.37)%100}%`;
    dot.style.top = `${(i*29.13)%100}%`;
    atmosphere.append(dot);
  }
  section.querySelector('.care-sticky').prepend(atmosphere);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  } catch {
    // The original SVG carton remains a working, scroll-controlled fallback.
    atmosphere.remove();
    return;
  }
  renderer.domElement.className = 'care-canvas';
  renderer.domElement.setAttribute('aria-hidden','true');
  renderer.setClearColor(0x000000,0);
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.16;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-4.5,4.5,4,-4,.1,60);
  camera.position.set(6.5,6.5,11.8);
  camera.lookAt(0,1.05,0);
  scene.add(new THREE.HemisphereLight(0xfff9e7,0x9e7950,2.3));
  const key = new THREE.DirectionalLight(0xfff0ce,3.1);
  key.position.set(-3,8,5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024,1024);
  Object.assign(key.shadow.camera,{left:-6,right:6,top:6,bottom:-6,near:.1,far:24});
  key.shadow.bias = -.0007;
  key.shadow.normalBias = .025;
  key.shadow.radius = 4;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff,1.4);
  rim.position.set(4,5,-5);
  scene.add(rim);

  const pulpCanvas = document.createElement('canvas');
  pulpCanvas.width = pulpCanvas.height = 128;
  const pulpContext = pulpCanvas.getContext('2d');
  pulpContext.fillStyle = '#e5d6af';
  pulpContext.fillRect(0,0,128,128);
  for (let i=0;i<1800;i++) {
    const x=(i*71.39)%128, y=(i*47.61)%128;
    pulpContext.fillStyle = i%2 ? '#bfab7d18' : '#fff9e61e';
    pulpContext.fillRect(x,y,1+(i%3),1);
  }
  const pulpTexture = new THREE.CanvasTexture(pulpCanvas);
  pulpTexture.colorSpace = THREE.SRGBColorSpace;
  pulpTexture.wrapS = pulpTexture.wrapT = THREE.RepeatWrapping;
  pulpTexture.repeat.set(3,3);
  const pulp = new THREE.MeshStandardMaterial({color:0xffffff,map:pulpTexture,roughness:.95});
  const innerPulp = new THREE.MeshStandardMaterial({color:'#d2bf92',roughness:1,side:THREE.DoubleSide});
  const edgePulp = new THREE.MeshStandardMaterial({color:'#d6c399',roughness:.95});
  const brown = new THREE.MeshStandardMaterial({color:'#bd8550',roughness:.5});
  const white = new THREE.MeshStandardMaterial({color:'#f5f0df',roughness:.48});

  function roundedShape(width,height,radius) {
    const x=-width/2, y=-height/2;
    const shape = new THREE.Shape();
    shape.moveTo(x+radius,y);
    shape.lineTo(x+width-radius,y);
    shape.quadraticCurveTo(x+width,y,x+width,y+radius);
    shape.lineTo(x+width,y+height-radius);
    shape.quadraticCurveTo(x+width,y+height,x+width-radius,y+height);
    shape.lineTo(x+radius,y+height);
    shape.quadraticCurveTo(x,y+height,x,y+height-radius);
    shape.lineTo(x,y+radius);
    shape.quadraticCurveTo(x,y,x+radius,y);
    return shape;
  }
  function extrusion(shape,depth,mat,bevel=.035) {
    const geometry = new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:bevel,bevelThickness:bevel,curveSegments:20});
    const mesh = new THREE.Mesh(geometry,mat);
    mesh.castShadow = mesh.receiveShadow = true;
    return mesh;
  }
  function box(parent,size,position,mat) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size),mat);
    mesh.position.set(...position);
    mesh.castShadow = mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  const carton = new THREE.Group();
  scene.add(carton);
  const tray = new THREE.Group();
  carton.add(tray);
  const positions = Array.from({length:10},(_,i)=>({x:(i%5-2)*1.23,z:i<5?-.66:.66}));
  const deckShape = roundedShape(6.65,2.95,.17);
  positions.forEach(({x,z})=>{
    const hole = new THREE.Path();
    hole.absarc(x,z,.49,0,Math.PI*2,true);
    deckShape.holes.push(hole);
  });
  const deck = extrusion(deckShape,.095,pulp,.025);
  deck.rotation.x = -Math.PI/2;
  deck.position.y = .45;
  tray.add(deck);
  const cupPoints = [[0,-.31],[.21,-.31],[.32,-.26],[.41,-.13],[.49,0]].map(([x,y])=>new THREE.Vector2(x,y));
  const cupGeometry = new THREE.LatheGeometry(cupPoints,32);
  positions.forEach(({x,z})=>{
    const cup = new THREE.Mesh(cupGeometry,innerPulp);
    cup.position.set(x,.45,z);
    cup.receiveShadow = cup.castShadow = true;
    tray.add(cup);
  });
  box(tray,[6.6,.31,.13],[0,.27,1.43],edgePulp);
  box(tray,[6.6,.31,.13],[0,.27,-1.43],edgePulp);
  box(tray,[.13,.31,2.8],[-3.25,.27,0],edgePulp);
  box(tray,[.13,.31,2.8],[3.25,.27,0],edgePulp);
  // Small moulded dividers separate the two rows and support the top shell.
  const dividerGeometry = new THREE.ConeGeometry(.16,.35,5);
  for (let i=0;i<4;i++) {
    const divider = new THREE.Mesh(dividerGeometry,pulp);
    divider.position.set((i-1.5)*1.23,.64,0);
    divider.castShadow = true;
    tray.add(divider);
  }

  const eggPoints = Array.from({length:33},(_,i)=>{
    const theta=i/32*Math.PI;
    const y=-Math.cos(theta)*.67;
    const radius=Math.sin(theta)*(.43-.075*Math.sin(theta-Math.PI/2));
    return new THREE.Vector2(radius,y);
  });
  const eggGeometry = new THREE.LatheGeometry(eggPoints,40);
  const eggs = positions.map(({x,z})=>{
    const egg = new THREE.Mesh(eggGeometry,brown);
    egg.position.set(x,.53,z);
    egg.scale.setScalar(.84);
    egg.castShadow = egg.receiveShadow = true;
    carton.add(egg);
    return egg;
  });

  const lid = new THREE.Group();
  lid.position.set(0,.58,-1.47);
  carton.add(lid);
  const panel = extrusion(roundedShape(6.65,2.95,.17),.14,pulp,.045);
  panel.position.set(0,1.475,-.73);
  lid.add(panel);
  const inside = extrusion(roundedShape(6.23,2.52,.2),.045,edgePulp,.025);
  inside.position.set(0,1.475,-.57);
  lid.add(inside);
  // The lid's skirt encloses the eggs instead of letting them intersect its top.
  box(lid,[6.55,.12,.62],[0,2.9,-.285],pulp);
  box(lid,[.12,2.8,.62],[-3.25,1.47,-.285],pulp);
  box(lid,[.12,2.8,.62],[3.25,1.47,-.285],pulp);
  box(lid,[6.4,.08,.65],[0,.08,-.29],pulp);
  const latch = box(tray,[.65,.13,.2],[0,.51,1.47],pulp);
  latch.rotation.x = -.12;

  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 768;
  labelCanvas.height = 384;
  const labelContext = labelCanvas.getContext('2d');
  const labelTexture = new THREE.CanvasTexture(labelCanvas);
  labelTexture.colorSpace = THREE.SRGBColorSpace;
  labelTexture.anisotropy = Math.min(8,renderer.capabilities.getMaxAnisotropy());
  function updateLabel() {
    const ctx=labelContext;
    ctx.fillStyle='#f5ebc8'; ctx.fillRect(0,0,768,384);
    ctx.fillStyle='#24513b'; ctx.fillRect(10,10,748,364);
    ctx.strokeStyle='#d2ca8b'; ctx.lineWidth=2; ctx.strokeRect(24,24,720,336);
    ctx.fillStyle='#f7cb48';
    for(let i=0;i<12;i++) {
      ctx.save();ctx.translate(107,109);ctx.rotate(i*Math.PI/6);
      ctx.beginPath();ctx.ellipse(0,-38,9,18,0,0,Math.PI*2);ctx.fill();ctx.restore();
    }
    ctx.beginPath();ctx.arc(107,109,23,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#fff5cf';ctx.font='900 66px Nunito, sans-serif';ctx.fillText('Yolk & Co.',175,120);
    ctx.font='24px Nunito, sans-serif';ctx.fillText('A LITTLE GOOD, EVERY DAY.',178,160);
    ctx.fillStyle='#f5e8ba';ctx.font='900 30px Nunito, sans-serif';ctx.fillText(`Fresh ${colour==='white'?'White':'Brown'} Eggs`,53,246);
    ctx.font='19px Nunito, sans-serif';ctx.fillText('FROM OUR FLOCK TO YOUR PAN',54,286);
    ctx.fillStyle='#f7cb48';ctx.beginPath();ctx.arc(657,266,49,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#24513b';ctx.textAlign='center';ctx.font='900 35px Nunito, sans-serif';ctx.fillText('10',657,269);
    ctx.font='13px Nunito, sans-serif';ctx.fillText('GOOD EGGS',657,291);ctx.textAlign='left';
    labelTexture.needsUpdate=true;
  }
  const sticker = new THREE.Mesh(new THREE.PlaneGeometry(3.05,1.525),new THREE.MeshStandardMaterial({map:labelTexture,roughness:.85,side:THREE.DoubleSide}));
  sticker.rotation.y = Math.PI;
  sticker.rotation.z = Math.PI;
  sticker.position.set(0,1.475,-.78);
  lid.add(sticker);
  sticker.castShadow = true;
  updateLabel();
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(14,10),new THREE.ShadowMaterial({opacity:.22}));
  floor.rotation.x=-Math.PI/2;
  floor.position.y=-.09;
  floor.receiveShadow=true;
  scene.add(floor);

  let disposed=false, visible=true, frame=0;
  function draw() {
    frame=0;
    if(disposed||!visible||document.hidden) return;
    eggs.forEach((egg,i)=>{
      const t=range(p,.06+i*.045,.155+i*.045);
      egg.visible=t>0;
      // A fast drop, a small soft bounce, then a stable seat in the cup.
      const fall=1-Math.pow(1-t,3);
      const bounce=Math.sin(range(t,.68,1)*Math.PI)*.13*(1-t);
      egg.position.y=.53+(1-fall)*5.5+bounce;
      egg.position.x=positions[i].x+Math.sin(i*2.3)*(1-t)*.3;
      egg.rotation.z=Math.sin(i*1.7)*(1-t)*.45;
      egg.material=colour==='white'?white:brown;
    });
    const closing=smooth(range(p,.62,.81));
    const sealing=smooth(range(p,.84,.96));
    lid.rotation.x=mix(-.13,Math.PI/2,closing);
    sticker.visible=sealing>0;
    sticker.position.z=mix(-2.5,-.78,sealing);
    sticker.rotation.z=Math.PI+(1-sealing)*-.12;
    const turn=smooth(range(p,.56,.97));
    carton.rotation.y=mix(-.13,.23,turn);
    carton.rotation.z=mix(-.055,0,turn);
    carton.position.y=mix(-.08,.1,turn);
    feathers.forEach((feather,i)=>{
      const distance=((i*23+p*145)%130)-15;
      feather.style.top=`${distance}%`;
      feather.style.transform=`translate3d(${Math.sin(p*5+i)*23}px,0,0) rotate(${i*31+p*(i%2?170:-140)}deg)`;
    });
    section.dataset.careFilled=String(eggs.filter((egg,i)=>p>=.155+i*.045).length);
    section.dataset.careClosing=closing.toFixed(3);
    section.dataset.careSealing=sealing.toFixed(3);
    renderer.render(scene,camera);
  }
  function schedule() {if(!frame&&!disposed) frame=requestAnimationFrame(draw);}
  function readProgress() {
    const sticky=section.querySelector('.care-sticky');
    p=motion.matches?1:clamp((scrollY-section.offsetTop)/Math.max(1,section.offsetHeight-sticky.offsetHeight));
    schedule();
  }
  function onFrame(event) {p=event.detail.p;schedule();}
  function onColour(event) {colour=event.detail;updateLabel();schedule();}
  function resize() {
    const width=Math.max(1,stage.clientWidth),height=Math.max(1,stage.clientHeight);
    renderer.setSize(width,height,false);
    const halfHeight=4.5/(width/height);
    camera.top=halfHeight;camera.bottom=-halfHeight;
    camera.updateProjectionMatrix();
    readProgress();
  }
  function onLost(event) {
    event.preventDefault();
    section.classList.remove('care-3d-ready');
    window.dispatchEvent(new Event('resize'));
  }
  function onRestored() {section.classList.add('care-3d-ready');resize();}
  const sizes=new ResizeObserver(resize);
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)readProgress();},{rootMargin:'100px'});
  function dispose() {
    if(disposed)return;
    disposed=true;
    cancelAnimationFrame(frame);
    observer.disconnect();sizes.disconnect();
    section.removeEventListener('care-frame',onFrame);
    section.removeEventListener('care-colour',onColour);
    motion.removeEventListener('change',readProgress);
    document.removeEventListener('visibilitychange',readProgress);
    window.removeEventListener('pagehide',onPageHide);
    renderer.domElement.removeEventListener('webglcontextlost',onLost);
    renderer.domElement.removeEventListener('webglcontextrestored',onRestored);
    const geometries=new Set(),materials=new Set();
    scene.traverse(object=>{if(object.geometry)geometries.add(object.geometry);if(object.material)materials.add(object.material);});
    geometries.forEach(item=>item.dispose());materials.forEach(item=>item.dispose());
    pulpTexture.dispose();labelTexture.dispose();renderer.dispose();
    renderer.domElement.remove();atmosphere.remove();section.classList.remove('care-3d-ready');
  }
  function onPageHide(event) {if(!event.persisted)dispose();}
  stage.append(renderer.domElement);
  section.classList.add('care-3d-ready');
  section.addEventListener('care-frame',onFrame);
  section.addEventListener('care-colour',onColour);
  motion.addEventListener('change',readProgress);
  document.addEventListener('visibilitychange',readProgress);
  window.addEventListener('pagehide',onPageHide);
  renderer.domElement.addEventListener('webglcontextlost',onLost);
  renderer.domElement.addEventListener('webglcontextrestored',onRestored);
  sizes.observe(stage);observer.observe(section);
  resize();
  document.fonts?.ready.then(()=>{if(!disposed){updateLabel();schedule();}});
  // Reset the SVG handoff now that the independently rendered carton owns this scene.
  window.dispatchEvent(new Event('resize'));
  if(import.meta.hot) import.meta.hot.dispose(dispose);
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mountPackingStory,{once:true});
else mountPackingStory();
