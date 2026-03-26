import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));

  console.log('Navigating to http://localhost:5173/');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  
  console.log('Clicking Girls tab...');
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Girls')) {
      await btn.click();
      break;
    }
  }
  
  await new Promise(r => setTimeout(r, 1000));
  
  const firstCard = await page.$('a[href^="/product"]');
  if (firstCard) {
    const href = await page.evaluate(el => el.getAttribute('href'), firstCard);
    console.log('Clicking product link with href:', href);
    await firstCard.click();
    console.log('Wait after clicking product...');
    await new Promise(r => setTimeout(r, 2000));
    console.log('Current URL:', page.url());
    
    // Save screenshot to project dir
    await page.screenshot({ path: 'public/bug_check.png' });
    console.log('Captured screenshot of result.');
    
    const html = await page.evaluate(() => document.body.innerHTML);
    console.log('Has empty message?', html.includes('Product not found'));
    console.log('Has real product name?', html.includes('Cream & Red Ethnic Suit'));
  } else {
    console.log('No product card found!');
  }
  
  await browser.close();
  process.exit(0);
})();
