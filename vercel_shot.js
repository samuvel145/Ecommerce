import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));

  console.log('Navigating to https://two-jet-81.vercel.app/');
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://two-jet-81.vercel.app/', { waitUntil: 'networkidle0' });
  
  await page.screenshot({ path: 'vercel_home.png' });
  console.log('Took vercel_home.png');
  
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log('HTML length:', html.length);
  
  await browser.close();
  process.exit(0);
})();
