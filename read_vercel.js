import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://two-jet-81.vercel.app/', { waitUntil: 'networkidle0' });
  const text = await page.evaluate(() => document.body.innerText);
  console.log('TEXT:', text);
  
  await browser.close();
  process.exit(0);
})();
