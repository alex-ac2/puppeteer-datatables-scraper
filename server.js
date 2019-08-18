const puppeteer = require('puppeteer');

const searchText = 'datatables';

// Connect Puppeteer to remote browser endpoint running to docker container
puppeteer.connect({ browserWSEndpoint: 'ws://localhost:8080' }).then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  
  await page.focus('input[aria-label="Search"]');
  await page.keyboard.type(searchText);
  await page.click('input[aria-label="Google Search"]');

  console.log('complete');

  await browser.close();
}).catch((err) => {
  console.log('*** ERROR ***');
  console.log('ERROR-MESSAGE: ', err);
});