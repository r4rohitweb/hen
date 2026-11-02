const {chromium} = require('C:/xampp/htdocs/testing/ar-video/node_modules/playwright-core');
const assert = require('node:assert/strict');
(async()=>{
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try {
    for(const viewport of [{width:1895,height:807},{width:1440,height:900},{width:390,height:844}]) {
      const page=await browser.newPage({viewport});
      const errors=[];
      page.on('pageerror',error=>errors.push(error.message));
      await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
      await page.evaluate(()=>document.fonts.ready);
      const end=await page.locator('.hero').evaluate(el=>el.offsetHeight-el.querySelector('.hero-inner').offsetHeight);
      for(const p of [.2,.32,.42,.6,.78,.86,.96,.99,1.05,.96,0,.96]) {
        await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),end*p);
        await page.waitForTimeout(80);
        if(p===.96||p===.99) await page.waitForFunction(()=>['.journey-egg','.egg-layer .egg-white'].every(selector=>getComputedStyle(document.querySelector(selector)).opacity==='1'));
        if(p<=.6) {
          const nestOpacity=await page.locator('.hero-nest,.hero-nest-front').evaluateAll(elements=>elements.map(el=>Number(getComputedStyle(el).opacity)));
          assert.deepEqual(nestOpacity,[0,0],'nest stays hidden throughout the large hen introduction');
        }
        const eggs=await page.evaluate(()=>['.journey-egg','.egg-layer .egg-white'].map(selector=>{
          const el=document.querySelector(selector), r=el.getBoundingClientRect(),s=getComputedStyle(el);
          return {x:r.x,y:r.y,w:r.width,h:r.height,opacity:Number(s.opacity),visibility:s.visibility};
        }));
        if(p===.32) assert.equal(eggs[1].visibility,'hidden','white egg waits for its reveal');
        if(p>=.78&&p<=.99) {
          const seat=await page.evaluate(()=>{
            const nest=document.querySelector('.hero-nest').getBoundingClientRect();
            const belly=new DOMPoint(322,477).matrixTransform(document.querySelector('.hen').getScreenCTM());
            return {depth:(belly.y-nest.top)/nest.height,center:(belly.x-nest.left)/nest.width,
              groundHidden:[...document.querySelectorAll('.hen-ground')].every(el=>Number(getComputedStyle(el).opacity)<.001)};
          });
          assert(seat.depth>.4&&seat.depth<.46,'hen body rests inside the nest hollow');
          assert(seat.center>.5&&seat.center<.6,'hen stays centered over the nest');
          assert(seat.groundHidden,'ground marks disappear in the seated pose');
        }
        if(p===.96||p===.99) {
          eggs.forEach(egg=>{
            assert.equal(egg.opacity,1);
            assert.equal(egg.visibility,'visible');
            assert(egg.x>=0&&egg.x+egg.w<=viewport.width,'egg stays within viewport horizontally');
            assert(egg.y>=0&&egg.y+egg.h<=viewport.height,'egg stays within viewport vertically');
          });
          assert(eggs[0].x+eggs[0].w<eggs[1].x,'eggs settle side by side without overlapping');
        }
        if(p===0) eggs.forEach(egg=>assert.equal(egg.visibility,'hidden','reverse scrolling resets reveal'));
      }
      await page.screenshot({path:`.reference/two-eggs-${viewport.width}.png`});
      const nested=await page.evaluate(()=>{
        const nest=document.querySelector('.hero-nest').getBoundingClientRect();
        const front=document.querySelector('.hero-nest-front').getBoundingClientRect();
        return {
          aligned:Math.abs(nest.x-front.x)+Math.abs(nest.y-front.y)<2,
          visible:getComputedStyle(document.querySelector('.hero-nest-front')).opacity==='1',
          seated:[...document.querySelectorAll('.hen-leg')].every(el=>getComputedStyle(el).opacity==='0'),
          eggsInside:['.journey-egg','.egg-layer .egg-white'].every(selector=>{
            const egg=document.querySelector(selector).getBoundingClientRect();
            return egg.left>nest.left&&egg.right<nest.right&&egg.bottom>nest.top&&egg.bottom<nest.bottom;
          })
        };
      });
      assert.deepEqual(nested,{aligned:true,visible:true,seated:true,eggsInside:true});
      const target=await page.locator('#eggs').evaluate(el=>el.offsetTop);
      await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),target);
      await page.waitForTimeout(100);
      const alignment=await page.evaluate(()=>{
        const actual=document.querySelector('.egg-layer .egg-white').getBoundingClientRect();
        const target=document.querySelector('.destination-white').getBoundingClientRect();
        return Math.abs(actual.x-target.x)+Math.abs(actual.y-target.y);
      });
      assert(alignment<2,'white egg reaches its matching label');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      assert.deepEqual(errors,[]);
      console.log(`${viewport.width}px: seated hen, nest layers, both eggs in nest, reverse scroll and comparison handoff passed`);
      await page.close();
      const reduced=await browser.newPage({viewport,reducedMotion:'reduce'});
      await reduced.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
      assert.equal(await reduced.locator('.egg-layer .egg-white').evaluate(el=>getComputedStyle(el).opacity),'1');
      assert.equal(await reduced.locator('body').evaluate(el=>el.classList.contains('egg-journey')),false);
      await reduced.close();
    }
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
