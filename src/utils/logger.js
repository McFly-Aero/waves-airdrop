
const logFilename = 'log.txt';
const colors = require('colors/safe');
const csv = require('csv');
const csvStringify = require('csv-stringify');
import path from 'path'
import process from 'process'
import fs  from 'fs'
const logpath = path.join(__dirname,'..','..','/logs/',''+Date.now());
fs.mkdirSync(logpath);
const logCSVStream = fs.createWriteStream(logpath+'/failed.csv', {'flags': 'a'});
const logFileStream = fs.createWriteStream(logpath+'/log.txt', {'flags': 'a'});
const logErrorStream = fs.createWriteStream(logpath+'/errors.txt', {'flags': 'a'});

let regex = new RegExp('s/\x1b\[[0-9;]*m//g');
let failedRecords = []

function init (source = 'unknown'){
  let saveFailedTransaction = (record) => {
    error(colors.white.bold(record.recipient) +' has an error:\t'+ record.message);
    let obj = [Date.now(),record.recipient, record.name, (record.attempt || 0) + 1];
    failedRecords.push(obj);
    csvStringify([obj], {
      delimiter:';'
    }, function(err, output){
      if(err){
        error('log write error: \t'+err);
      }
      logCSVStream.write(output);
    });
  };

  let log = (text) => {
    let ts =  new Date();
    let line = colors.gray(ts.toUTCString()) +'\t' + colors.green('['+source+']') +'\t'+ text;
    log2file(text, 'INFO');
    console.log(line);
  };

  let error = (text) => {
    let ts =  new Date();
    let line = colors.gray(ts.toUTCString()) +'\t' + colors.red('['+source+']') +'\t'+ text;
    log2file(text, 'ERROR');
    err2file(text);
    console.log(line);
  };

  let log2file = (text, level='LOG') => {
    let ts =  new Date();
    let line = ts.toUTCString() + '\t' + '['+level+']'+'\t'+ text+"\r\n";
    logFileStream.write(line.replace(regex,''));
  };

  let err2file = (text) => {
    let ts =  new Date();
    let line = ts.toUTCString() + '\t'+ text+"\r\n";
    logErrorStream.write(line.replace(regex,''));
  };


  return {
    saveFailedTransaction,
    getFails:() => {
      return failedRecords
    },
    log,
    error
  }

}


export default init;