const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = {

  exportToCsv: (objectArray, callback) => {
    const date = new Date();
    const timeStamp = date.getTime();
    const filename = path.join(__dirname, '../csv_output', `output-${timeStamp}.csv`);
    const output = [];

    // Create Header-Row
    const headerRow = [];
    Object.keys(objectArray[0]).forEach( (key) => {
      headerRow.push(key);
    })
    output.push(headerRow.join());

    objectArray.forEach( (object) => {
      const row = [];
      for (let key in object) {
        row.push(object[key]);
      }
      output.push(row.join());
    });

    fs.writeFileSync(filename, output.join(os.EOL));
    callback({ status: "Export to CSV complete", fileName: `output-${timeStamp}.csv` });
  }

}
  


