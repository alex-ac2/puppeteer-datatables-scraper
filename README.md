# Puppeteer-Datatables-Scraper

Web scraper built using the Puppeteer library for extracting and exporting employee data from Datatables.net online example table to .csv file.

This application relies on running a browserless instance of chrome. Please ensure you have **`Docker`** **installed** to run the appropriate **`browserless/chrome`** docker image.        

#### Local Deployment
[1] Clone repository 
    ```
    git clone https://github.com/alex-ac2/puppeteer-datatables-scraper.git
    ```

[2] Run browserless/chrome image
    ```
    docker run -p 8080:3000 --restart always -d --name browserless browserless/chrome
    ```

[3] Install dependencies
    ```
    npm install
    ```

[4] Run scraper!
    ```
    npm start
    ```

**ON Complete**: Navigate to the `csv_output` directory to view your newly exported output-[timestamp].csv file

#### Running tests

Test modules have been created using Mocha and Chai to help maintain the scraper and ensure `querySelectors` are still present on both Google's and DataTables's homepage.  

Run test module 
    ```
    npm test
    ```

---

#### Dependencies
  - puppeteer
  - string-similarity
  - chai
  - mocha

