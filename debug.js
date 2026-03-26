import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));

  console.log('Navigating to http://localhost:5173/');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  
  console.log('Clicking Boys tab...');
  // Find the button with text "👦 Boys"
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Boys')) {
      await btn.click();
      break;
    }
  }
  
  console.log('Waiting after tab switch...');
  await new Promise(r => setTimeout(r, 1000));
  
  console.log('Clicking the first product in Boys tab...');
  const firstCard = await page.$('.group');
  if (firstCard) {
    await firstCard.click();
    console.log('Wait after clicking product...');
    await new Promise(r => setTimeout(r, 2000));
    console.log('Current URL:', page.url());
  } else {
    console.log('No product card found!');
  }
  
  await browser.close();
})();
