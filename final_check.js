import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  
  // Click Boys tab
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Boys')) {
      await btn.click();
      break;
    }
  }
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Click first card link
  const card = await page.$('a[href^="/product"]');
  await card.click();
  
  await new Promise(r => setTimeout(r, 1000));
  
  const text = await page.evaluate(() => document.body.innerText);
  console.log('PAGE TEXT AFTER CLICK:', text);
  
  await browser.close();
  process.exit(0);
})();
