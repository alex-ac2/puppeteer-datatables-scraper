const expect = require('chai').expect;
const puppeteer = require('puppeteer');
const { findMatchUrl } = require('../utils/findMatchUrl');

const searchResultsArray = [ 
  'https://datatables.net/',
  'https://mdbootstrap.com/docs/jquery/tables/datatables/',
  'https://github.com/DataTables/DataTables',
  'https://docs.microsoft.com/en-us/dotnet/api/system.data.datatable',
  'https://www.c-sharpcorner.com/interview-question/what-is-difference-between-dataset-and-datatable',
  'https://datatables.net/faqs/',
  'https://datatables.net/license/',
  'https://datatables.net/manual/styling/bootstrap',
  'https://cran.r-project.org/web/packages/knitr/vignettes/datatables.html' 
];


describe ('Puppeteer-DataTables-Scraper:', () => {

  describe ('Google-HomePage-Selectors', () => {

    it('Random-Null-Selector should output false', (done) => {
      puppeteer.connect({ browserWSEndpoint: 'ws://localhost:8080' }).then(async browser => {
        const page = await browser.newPage();
        await page.goto('https://www.google.com');
        
        const nullSelector = await page.$('random-selector-dsfsdfsdfsd') !== null; // Random selector to return null
        await browser.close();
        return nullSelector;
      })
      .then( (result) => {
        expect(result).to.equal(false);
        done();
      })
      .catch(err => console.log(err));    
    });

    it('Google-Search-Input-Selector should output true', (done) => {
      puppeteer.connect({ browserWSEndpoint: 'ws://localhost:8080' }).then(async browser => {
        const page = await browser.newPage();
        await page.goto('https://www.google.com');
        
        const googleSearchInputSelector = await page.$('input[aria-label="Search"]') !== null;
        await browser.close();
        return googleSearchInputSelector
      })
      .then( (result) => {
        expect(result).to.equal(true);
        done();
      })
      .catch(err => console.log(err));    
    });

    it('Google-Search-Button-Selector should output true', (done) => {
      puppeteer.connect({ browserWSEndpoint: 'ws://localhost:8080' }).then(async browser => {
        const page = await browser.newPage();
        await page.goto('https://www.google.com');
        
        const googleSearchButtonSelector = await page.$('input[aria-label="Google Search"]') !== null;
        await browser.close();
        return googleSearchButtonSelector
      })
      .then( (result) => {
        expect(result).to.equal(true);
        done();
      })
      .catch(err => console.log(err));    
    });
    
  });

  describe ('Find-Match-Url Module', () => {
    it('Match url should output https://datatables.net/faqs/', (done) => {
      const searchText = 'datatables faq';
      const matchUrl = findMatchUrl(searchText, searchResultsArray);
      expect(matchUrl).to.equal('https://datatables.net/faqs/');
      done();
    });
    it('Match url should output https://datatables.net/', (done) => {
      const searchText = 'datatables';
      const matchUrl = findMatchUrl(searchText, searchResultsArray);
      expect(matchUrl).to.equal('https://datatables.net/');
      done();
    });
  });

});
    
    

