const puppeteer = require('puppeteer');
const { findMatchUrl } = require('./utils/findMatchUrl.js');
const { Employee } = require('./models/Employee');
const { exportToCsv } = require('./utils/createCSV');

const searchText = 'datatables';

// Connect Puppeteer to remote browser endpoint running on docker container
puppeteer.connect({ browserWSEndpoint: 'ws://localhost:8080' }).then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  
  await page.waitForSelector('input[aria-label="Search"]');
  await page.focus('input[aria-label="Search"]');
  await page.keyboard.type(searchText);
  await page.waitForSelector('input[aria-label="Google Search"]');
  await page.evaluate( () => {
    document.querySelector('input[aria-label="Google Search"]').click();
  });

  // On google search results load
  await page.waitForSelector('#search');
  const searchResultsArray = await page.evaluate( () => {
    return  Array.from(document.querySelectorAll('div.r > a')).map( (entry) => entry.href )
  })
  console.log('SearchResultsArray: ', searchResultsArray);
  const matchUrl = findMatchUrl(searchText, searchResultsArray);
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

  const employeeTableData = await page.evaluate( (EmployeeClassString) => { 
    const Employee = new Function(' return (' + EmployeeClassString + ').apply(null, arguments)');
    const employeeObjectArray = [];

    // Iterate over table pages
    document.querySelectorAll('#example_paginate > span > a.paginate_button').forEach( (element) => {
      // Click on new table page
      document.querySelector(`a[data-dt-idx="${element.innerHTML}"]`).click();
      
      document.querySelectorAll('#example > tbody > tr').forEach( (tr) => { 
        const tableRowEntry = [];
        tr.querySelectorAll('td').forEach( (td) => {
          tableRowEntry.push(td.innerHTML);
        })
        employeeObjectArray.push(new Employee(...tableRowEntry));
      });
    });

    return employeeObjectArray;
  }, Employee.toString());

  console.log('EMPLOYEE-TABLE-DATA: : ', employeeTableData);

  const exportDataToCsv = new Promise( (resolve, reject) => {
    exportToCsv(employeeTableData, (exportResult) => {
      resolve(exportResult);
    });
  });

  exportDataToCsv.then( (res) => {
    console.log(res);
  })


  console.log('--- Web scraping complete ---');
  await browser.close();
}).catch((err) => {
  console.log('*** ERROR ***');
  console.log('ERROR-MESSAGE: ', err);
});