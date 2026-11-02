const {chromium}=require('C:/xampp/htdocs/testing/ar-video/node_modules/playwright-core');
const assert=require('node:assert/strict');
const urls=process.argv.slice(2);
if(!urls.length)urls.push('file:///C:/xampp/htdocs/testing/egg/index.html');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
  for(const url of urls){
   const page=await browser.newPage({viewport:{width:1440,height:900}});
   const errors=[];page.on('pageerror',error=>errors.push(error.message));
   await page.goto(url,{waitUntil:'networkidle'});
   await page.waitForFunction(()=>document.body.classList.contains('egg-journey'));
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('.product-image .carton-svg').count(),3,'shop initializes');
   const scenes=[
    ['#home','.hero-inner','.hen-walker','transform'],
    ['#inside','.inside-sticky','.inside-shell-left','transform'],
    ['#egg-escape','.escape-sticky','.escape-world','transform'],
    ['#cooking','.cooking-sticky','.cooking-progress span','transform'],
    ['#mornings','.morning-sticky','#mornings','--morning-bg'],
   ];
   for(const [section,sticky,element,property] of scenes){
    const layout=await page.locator(section).evaluate((el,selector)=>({top:el.offsetTop,range:el.offsetHeight-el.querySelector(selector).offsetHeight}),sticky);
    const states=[];
    for(const progress of [.1,.7]){
     await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),layout.top+layout.range*progress);
     await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
     await page.waitForTimeout(100);
     states.push(await page.locator(element).evaluate((el,key)=>el.style.getPropertyValue(key),property));
    }
    assert(states[0]&&states[1]&&states[0]!==states[1],`${section} responds to scrolling`);
   }
   await page.locator('#care').scrollIntoViewIfNeeded();
   await page.locator('.care-3d-ready').waitFor();
   const layout=await page.locator('#care').evaluate(el=>({top:el.offsetTop,range:el.offsetHeight-el.querySelector('.care-sticky').offsetHeight}));
   for(const progress of [.3,.98,.3]){
    await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),layout.top+layout.range*progress);
    await page.waitForTimeout(140);
    const filled=Number(await page.locator('#care').getAttribute('data-care-filled'));
    assert(progress===.98?filled===10:filled>0&&filled<10,'packing scene responds in both directions');
   }
   await page.locator('.care-toggle [data-colour="white"]').click();
   await page.locator('.buy-button').first().click();
   assert.match(await page.locator('.info-dialog').textContent(),/White eggs/);
   await page.locator('.dialog-done').click();
   await page.locator('.tour-button').click();await page.locator('.tour-next').click();
   await page.waitForFunction(()=>{const image=document.querySelector('.tour-image');return image.complete&&image.naturalWidth>0;});
   assert.deepEqual(errors,[]);
   console.log(`PASS ${url}: hero, inside, escape, cooking, mornings, packing, shop and farm tour`);
   await page.close();
  }
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
