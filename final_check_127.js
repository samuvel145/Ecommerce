import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to http://127.0.0.1:5173/');
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
    
    // Check for eTrends
    const html = await page.evaluate(() => document.body.innerHTML);
    if (!html.includes('eTrends')) {
      console.log('eTrends NOT found. Current HTML length:', html.length);
    } else {
      console.log('eTrends found!');
    }
    
    // Click Boys
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Boys')) {
        await btn.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 1000));
    
    // Click product
    const card = await page.$('a[href^="/product"]');
    if (card) {
      await card.click();
      await new Promise(r => setTimeout(r, 1000));
      console.log('Current URL:', page.url());
      const text = await page.evaluate(() => document.body.innerText);
      console.log('PAGE TEXT:', text.substring(0, 500));
    } else {
      console.log('No cards found.');
    }
  } catch (err) {
    console.error('ERROR:', err.message);
  }
  
  await browser.close();
  process.exit(0);
})();
