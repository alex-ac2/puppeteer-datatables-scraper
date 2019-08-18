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
    let nullSelector = null;


    it('should output null', (done) => {
      //const nullSelector = page.$('hfjhsdjkfhsjkdfhsjkd');
      puppeteer.connect({ browserWSEndpoint: 'ws://localhost:8080' }).then(async browser => {
        const page = await browser.newPage();
        await page.goto('https://www.google.com');
        
        console.log('Done scraping');
        const nullSelector = await page.$('dsfsdfsdfsd');
        await browser.close();
        return nullSelector
      })
      .then((result) => {
        console.log('result:', result);
        expect(result).to.equal(null);
        done();
      })
      .catch(err => console.log(err));      
    });
  
  });

  describe ('Find-Match-Url Module', () => {
    it('should output https://datatables.net/faqs/', (done) => {
      const searchText = 'datatables faq';
      const matchUrl = findMatchUrl(searchText, searchResultsArray);
      expect(matchUrl).to.equal('https://datatables.net/faqs/');
      done();
    });
    it('should output https://datatables.net/', (done) => {
      const searchText = 'datatables';
      const matchUrl = findMatchUrl(searchText, searchResultsArray);
      expect(matchUrl).to.equal('https://datatables.net/');
      done();
    });
  });

});
    
    

