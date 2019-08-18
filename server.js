const puppeteer = require('puppeteer');
const { findMatchUrl } = require('./utils/findMatchUrl.js');

const searchText = 'datatables';

// Connect Puppeteer to remote browser endpoint running to docker container
puppeteer.connect({ browserWSEndpoint: 'ws://localhost:8080' }).then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  
  await page.focus('input[aria-label="Search"]');
  await page.keyboard.type(searchText);
  await page.click('input[aria-label="Google Search"]');

  // On google search results load
  await page.waitForSelector('#search');
  const searchResultsArray = await page.evaluate( () => {
    return  Array.from(document.querySelectorAll('div.r > a')).map( (entry) => entry.href )
  })
  console.log('SearchResultsArray: ', searchResultsArray);
  const matchUrl = findMatchUrl(searchText, searchResultsArray)
  console.log('MATCH-URL: ', matchUrl);

  // Navigate to matchUrl
  await page.click(`a[href="${matchUrl}"]`);
  await page.waitForSelector('#example') // Wait for table to load

  const tableHeadings = await page.evaluate( () => {
    return Array.from(document.querySelectorAll('#example > thead > tr > th')).map( (th) => {
      return th.innerHTML;
    })
  });

  console.log(tableHeadings); 

  console.log('--- Web scraping complete ---');
  await browser.close();
}).catch((err) => {
  console.log('*** ERROR ***');
  console.log('ERROR-MESSAGE: ', err);
});