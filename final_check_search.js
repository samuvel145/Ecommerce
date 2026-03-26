import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));

  console.log('Navigating to http://127.0.0.1:5173/');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  
  // Now we have a search bar.
  // Search for "boys"
  await page.type('input[placeholder*="Search"]', 'boys');
  await new Promise(r => setTimeout(r, 1000));
  
  const link = await page.$('a[href^="/product"]');
  if (link) {
    console.log('Clicking product link in search results...');
    await link.click();
    await new Promise(r => setTimeout(r, 1000));
    console.log('Final URL:', page.url());
    
    // Check if "Product not found" is on screen
    const text = await page.evaluate(() => document.body.innerText);
    console.log('Is "Product not found" visible?', text.includes('Product not found'));
  } else {
    console.log('No cards found for "boys" search.');
  }

  await browser.close();
  process.exit(0);
})();
