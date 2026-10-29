const {chromium}=require('C:/xampp/htdocs/testing/ar-video/node_modules/playwright-core');
(async()=>{
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
await page.waitForTimeout(2700);
await page.screenshot({path:'.reference/desktop.png'});
await page.locator('.meet-button').click();await page.waitForTimeout(1600);
await page.screenshot({path:'.reference/scroll.png'});
console.log('desktop',await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,scrollY,eggs:[...document.querySelectorAll('.egg')].map(e=>({opacity:getComputedStyle(e).opacity,top:e.getBoundingClientRect().top}))})));
await page.locator('.back-link').click();await page.waitForTimeout(1200);
await page.locator('.order-button').click();console.log('dialog',await page.locator('dialog').evaluate(e=>e.open));await page.locator('.dialog-done').click();
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});await page.waitForTimeout(2600);
await page.screenshot({path:'.reference/mobile.png',fullPage:true});
console.log('mobile',await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,heroHeight:document.querySelector('.hero').offsetHeight})), 'errors',errors);
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
