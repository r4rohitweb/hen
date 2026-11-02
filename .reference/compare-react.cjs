const {chromium}=require('C:/xampp/htdocs/testing/ar-video/node_modules/playwright-core');
const fs=require('node:fs');
const mode=process.argv[2]||'before';
const url=process.env.REACT_TEST_URL||'file:///C:/xampp/htdocs/testing/egg/index.html';
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const records=[];
 try{
  for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
   const page=await browser.newPage({viewport});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(url,{waitUntil:'networkidle'});
   await page.waitForFunction(()=>document.body.classList.contains('egg-journey'));
   await page.evaluate(()=>document.fonts.ready);
   await page.waitForTimeout(2100);
   const layout=await page.locator('main>section').evaluateAll(elements=>elements.map(el=>({id:el.id,top:el.offsetTop,height:el.offsetHeight})));
   const headings=await page.locator('h1,h2,h3').allTextContents();
   const scenes=[['home','.hero-inner',.96],['inside','.inside-sticky',.55],['egg-escape','.escape-sticky',.5],['cooking','.cooking-sticky',.7],['mornings','.morning-sticky',.4],['care','.care-sticky',.3],['care','.care-sticky',.98]];
   for(const [id,sticky,p] of scenes){
    const position=await page.locator(`#${id}`).evaluate((el,{sticky,p})=>el.offsetTop+(el.offsetHeight-el.querySelector(sticky).offsetHeight)*p,{sticky,p});
    await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),position);
    if(id==='care')await page.locator('.care-3d-ready').waitFor();
    await page.waitForTimeout(250);
    await page.screenshot({path:`.reference/react-${mode}-${viewport.width}-${id}-${p}.png`});
   }
   records.push({viewport,layout,headings,errors});
   await page.close();
  }
  fs.writeFileSync(`.reference/react-${mode}.json`,JSON.stringify(records,null,2));
  console.log(`${mode}: recorded desktop/mobile layout, content, errors and all scroll scenes`);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
