const {chromium}=require('C:/xampp/htdocs/testing/ar-video/node_modules/playwright-core');
const assert=require('node:assert/strict');
const baseURL=process.env.CARE_TEST_URL||'http://127.0.0.1:5173/';
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
  for(const viewport of [{width:1440,height:900},{width:390,height:844},{width:320,height:700}]){
   const page=await browser.newPage({viewport});const errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.goto(baseURL,{waitUntil:'networkidle'});
   await page.locator('#care').scrollIntoViewIfNeeded();
   await page.locator('.care-3d-ready').waitFor();
   await page.evaluate(()=>document.fonts.ready);
   const layout=await page.locator('#care').evaluate(el=>({top:el.offsetTop,range:el.offsetHeight-el.querySelector('.care-sticky').offsetHeight}));
   for(const p of [0,.3,.6,.74,.98,.3,.98]){
    await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),layout.top+layout.range*p);
    await page.waitForTimeout(180);
    const state=await page.locator('#care').evaluate(el=>({filled:Number(el.dataset.careFilled),closing:Number(el.dataset.careClosing),sealing:Number(el.dataset.careSealing),active:[...el.querySelectorAll('.care-steps li')].findIndex(el=>el.classList.contains('is-current')),count:el.querySelector('.care-fill-count').textContent,pin:el.querySelector('.care-sticky').getBoundingClientRect().top}));
    assert(Math.abs(state.pin)<2,'section stays pinned');
    if(p===0)assert.equal(state.filled,0);
    if(p===.3)assert(state.filled>0&&state.filled<10,'eggs fill one by one in both directions');
    if(p===.6){assert.equal(state.filled,10);assert.equal(state.closing,0);}
    if(p===.74){assert(state.closing>0&&state.closing<1);assert.equal(state.active,1);}
    if(p===.98){assert.equal(state.sealing,1);assert.equal(state.active,2);assert.equal(state.count,'10 / 10');}
    await page.screenshot({path:`.reference/care-story-${viewport.width}-${p}.png`});
   }
   await page.locator('.care-toggle [data-colour="white"]').click();
   assert.equal(await page.locator('.shop-section [data-colour="white"]').getAttribute('aria-pressed'),'true');
   const fit=await page.locator('.care-stage').evaluate(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight;});
   assert(fit,'carton fits in the pinned viewport');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'no horizontal overflow');
   assert.deepEqual(errors,[]);await page.close();
   console.log(`${viewport.width}px: all packing chapters, reverse scroll, colour toggle and layout passed`);
  }
  const reduced=await browser.newPage({reducedMotion:'reduce'});
  await reduced.goto(baseURL,{waitUntil:'networkidle'});
  await reduced.locator('#care').scrollIntoViewIfNeeded();await reduced.locator('.care-3d-ready').waitFor();await reduced.waitForTimeout(200);
  assert.equal(await reduced.locator('#care').getAttribute('data-care-sealing'),'1.000');
  await reduced.close();
  const fallback=await browser.newPage();
  await fallback.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type.startsWith('webgl')?null:original.call(this,type,...args);};});
  await fallback.goto(baseURL,{waitUntil:'networkidle'});
  await fallback.locator('#care').scrollIntoViewIfNeeded();await fallback.waitForTimeout(600);
  assert.equal(await fallback.locator('.care-3d-ready').count(),0);
  assert.equal(await fallback.locator('.care-carton').evaluate(el=>getComputedStyle(el).visibility),'visible');
  console.log('PASS: desktop, mobile, reverse scroll, colour sync, reduced motion, WebGL fallback');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
