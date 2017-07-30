import cli from './utils/cli'
import csv from './utils/csv'
import * as _ from 'lodash'
import logger from './utils/logger'
let log = logger('index');
var colors = require('colors');
import transfer from './utils/transfer'
const Promise = require('bluebird');

let options;
cli.init()
  .tap(()=>{
    log.log('Mass sender started')
  })
  .then((_options)=>{
      options = _options
      return Promise.map(options.lists, csv.read);
  })
  .then(concatLists)
  .then(processList)
  .then(showEndMessage)
  .catch((err)=>{
    console.log('Error', err);
  })


function concatLists(arrayOfObjects){

  let firstOne = arrayOfObjects.pop();
  let list =  _.spread(_.assign)([firstOne].concat(arrayOfObjects));
  list = _.map(list);
  log.log(
    String(list.length).bold.white +
    ' unique items loaded from ' +
    String(options.lists.length).bold.white +
    ' lists.'
  );
  //list is object for duplicate removing. now we should get an array
  return list;
}


function processList(list){

  log.log('Start processing...');
  let i = 0;
  return Promise.map(list, (line)=>{
    let obj = {
      server: options.server,
      amount: options.amount,
      attachment: options.attachment,
      assetId: options.assetId,
      senderPublicKey: options.publicKey,
      recipient:line.address,
      fee: options.fee,
      privateKey:options.privateKey
    }
    log.log('processing:\t'+i+' / '+list.length);
    i++;
    return transfer(obj)
      .then((error)=>{
        if(error){
          log.saveFailedTransaction(error)
        }
        return null;
      })
  }, {concurrency: 3})
}

function showEndMessage(){

  log.log('done');
}