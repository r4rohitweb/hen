const {chromium}=require('C:/xampp/htdocs/testing/ar-video/node_modules/playwright-core');
const assert=require('node:assert/strict');
const url=process.argv[2]||'http://127.0.0.1:5173/';
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('Cross origin requests')&&!m.text().startsWith('Failed to load resource'))errors.push(m.text());});
  page.on('response',response=>{if(response.status()>=400&&!response.url().endsWith('/favicon.ico'))errors.push(`${response.status()} ${response.url()}`);});
  await page.goto(url,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.querySelector('.journey-egg'));
  assert.equal(await page.locator('.journey-egg').count(),1);
  assert.equal(await page.locator('.hero-intro-word').count(),1);
  assert.equal(await page.locator('.tokri-front').count(),1);
  assert.equal(await page.locator('.morning-garnish').count(),16);
  for(const colour of ['white','brown','white']){
   await page.locator(`.shop-section [data-colour="${colour}"]`).click();
   assert.equal(await page.locator(`.care-toggle [data-colour="${colour}"]`).getAttribute('aria-pressed'),'true');
   assert((await page.locator('.product-colour').allTextContents()).every(text=>text.toLowerCase()===colour));
   for(const index of [0,2]){
    await page.locator('.buy-button').nth(index).click();
    assert.match(await page.locator('.info-dialog').innerText(),new RegExp(`${colour==='white'?'White':'Brown'} eggs · Pack of ${index===0?6:12}`));
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.info-dialog').evaluate(el=>el.open),false);
   }
  }
  await page.locator('.tour-button').click();
  await page.keyboard.press('ArrowRight');assert.equal(await page.locator('.tour-title').textContent(),'Inside the barn');
  await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('.tour-title').textContent(),'Around the farm');
  await page.keyboard.press('Escape');
  await page.locator('#care').scrollIntoViewIfNeeded();await page.locator('.care-3d-ready').waitFor();
  assert.equal(await page.locator('.care-canvas').count(),1);
  assert.equal(await page.locator('.care-atmosphere').count(),1);
  await page.locator('.care-toggle [data-colour="brown"]').click();
  await page.locator('.care-toggle [data-colour="white"]').click();
  assert.equal(await page.locator('.care-canvas').count(),1);
  assert.equal(await page.locator('.journey-egg').count(),1);
  assert.deepEqual(errors,[]);
  console.log(`PASS ${url}: React state, all packs, modal Escape, tour arrows and single animation instances`);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
