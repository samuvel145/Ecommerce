import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173/');
  await new Promise(r => setTimeout(r, 1000));
  
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
  
  // Click first card
  const firstCard = await page.$('.group');
  await firstCard.click();
  
  await new Promise(r => setTimeout(r, 1000));
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log('After click, URL:', page.url());
  console.log('Contains Product not found?', html.includes('Product not found'));
  console.log('Contains Blue Striped Linen Shirt?', html.includes('Blue Striped Linen Shirt'));
  
  await browser.close();
})();
