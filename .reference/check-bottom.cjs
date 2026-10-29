const {chromium}=require('C:/xampp/htdocs/testing/ar-video/node_modules/playwright-core');
(async()=>{
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});await page.waitForTimeout(2500);
await page.locator('#shop').scrollIntoViewIfNeeded();await page.waitForTimeout(1200);await page.screenshot({path:'.reference/shop-desktop.png'});
await page.locator('.shop-section [data-colour="white"]').click();console.log('white',await page.locator('.product-colour').allTextContents());
await page.locator('.buy-button').first().click();console.log('selection',await page.locator('.info-dialog p').innerText());await page.locator('.dialog-done').click();
const pos=await page.locator('#care').evaluate(e=>({top:e.offsetTop,range:e.offsetHeight-e.querySelector('.care-sticky').offsetHeight}));
for(const t of [0,.5,1]){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),pos.top+pos.range*t);await page.waitForTimeout(300);await page.screenshot({path:`.reference/care-${t}.png`});console.log('care',t,await page.locator('.care-carton').evaluate(e=>({open:getComputedStyle(e.querySelector('.carton-open')).opacity,closed:getComputedStyle(e.querySelector('.carton-closed')).opacity,sticker:getComputedStyle(e.querySelector('.carton-sticker')).opacity})));}
await page.locator('#farm').scrollIntoViewIfNeeded();await page.waitForTimeout(1100);await page.screenshot({path:'.reference/farm-desktop.png'});
await page.locator('.tour-button').click();await page.locator('.tour-next').click();console.log('tour',await page.locator('.tour-title').textContent());await page.keyboard.press('Escape');
for(const size of [{width:390,height:844},{width:320,height:700}]){await page.setViewportSize(size);await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(250);console.log('mobile',size,await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)})));const c=await page.locator('#care').evaluate(e=>e.offsetTop+(e.offsetHeight-e.querySelector('.care-sticky').offsetHeight)*.85);await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),c);await page.waitForTimeout(300);await page.screenshot({path:`.reference/care-mobile-${size.width}.png`});}
console.log('errors',errors);await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
