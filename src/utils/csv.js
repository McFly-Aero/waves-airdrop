const Promise = require('bluebird');
const fs = require('fs');
const csv = require('csv');
const csvParse =  Promise.promisify(csv.parse);

function read(filename){
  return new Promise((resolve, reject)=>{
    fs.readFile(filename, 'utf8', function (err,data) {
      if (err) {
        return reject(err)
      }
      resolve(data)
    });
  })
  .then((data)=>{
    return csvParse(data, {
      auto_parse_date:true,
      columns:true,
      objname:'address',
      delimiter:';',
      skip_empty_lines:true,
      skip_lines_with_empty_values:true
    })
  })
}


export default {
  read
};