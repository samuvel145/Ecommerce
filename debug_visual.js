import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));

  console.log('Navigating to http://localhost:5173/');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  
  console.log('Clicking Boys tab...');
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Boys')) {
      await btn.click();
      break;
    }
  }
  
  await new Promise(r => setTimeout(r, 1000));
  
  console.log('Clicking the first product in Boys tab...');
  // Since we changed it to an <a> tag
  const firstCard = await page.$('a[href^="/product"]');
  if (firstCard) {
    await firstCard.click();
    console.log('Wait after clicking product...');
    await new Promise(r => setTimeout(r, 2000));
    console.log('Current URL:', page.url());
    await page.screenshot({ path: 'error_view.png' });
    console.log('Took screenshot error_view.png');
  } else {
    console.log('No product card found!');
  }
  
  await browser.close();
})();
