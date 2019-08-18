# Puppeteer-Datatables-Scraper

Web scraper built using the Puppeteer library for extracting and exporting employee data from Datatables.net online example table to .csv file.

This application relies on running a browserless instance of chrome. Please ensure you have **`Docker`** **installed** to run the appropriate **`browserless/chrome`** docker image.        

#### Local Deployment
[1] Clone repository 
    ```
    git clone https://github.com/alex-ac2/puppeteer-datatables-scraper.git
    ```






#### Running tests

Test modules have been created using Mocha and Chai to help maintain the scraper and ensure `querySelectors` are still present on both Google's and DataTables's homepage.  

[1] Run test module 
    ```
    npm test
    ```