import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));

  console.log('Navigating to https://two-jet-81.vercel.app/');
  await page.goto('https://two-jet-81.vercel.app/', { waitUntil: 'networkidle0' });
  
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
  // We don't know if Vercel has the `<a>` or `<motion.div>` click version yet!
  const firstCardLink = await page.$('a[href^="/product"]');
  const firstCardDiv = await page.$('.group');
  
  const target = firstCardLink || firstCardDiv;
  
  if (target) {
    await target.click();
    console.log('Wait after clicking product...');
    await new Promise(r => setTimeout(r, 2000));
    console.log('Current URL:', page.url());
    
    const html = await page.evaluate(() => document.body.innerHTML);
    console.log('Contains eKids or eTrends branding on header?', html.includes('eKids') ? 'eKids' : (html.includes('eTrends') ? 'eTrends' : 'neither'));
    
    // Look for product details
    console.log('Contains Product not found?', html.includes('Product not found'));
    console.log('Contains Blue Striped Linen Shirt?', html.includes('Blue Striped Linen Shirt'));
  } else {
    console.log('No product card found!');
  }
  
  await browser.close();
  process.exit(0);
})();
