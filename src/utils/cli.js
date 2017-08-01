const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');
const Promise = require('bluebird');

const optionDefinitions = [
  {
    name: 'lists',
    alias: 'l',
    typeLabel: '[underline]{file}',
    description: ' * CSV list of addresses. Should has address column. Amount is optional',
    // defaultOption: true,
    multiple: true,
    type: String
  },
  {
    name: 'amount',
    alias: 'a',
    description: 'Amount of currency to send. Default: 1',
    defaultValue: 1,
    type: Number
  },
  {
    name: 'message',
    alias: 'm',
    description: 'Message to be attached to payment. Default: Surprise!',
    defaultValue: 'Surprise!',
    type: String
  },
  {
    name: 'assetId',
    alias: 'c',
    description: ' * AssetID',
    type: String
  },
  {
    name: 'publicKey',
    alias: 'b',
    description: ' * Public sender key ',
    type: String
  },
  {
    name: 'privateKey',
    alias: 'r',
    description: ' * Private sender key ',
    type: String
  },
  {
    name: 'server',
    alias: 's',
    description: 'Server url. Default: http://dev.pywaves.org:6869',
    defaultValue: 'http://dev.pywaves.org:6869',
    // defaultValue: 'http://localhost:6869',
    type: String
  },
  {
    name: 'fee',
    alias: 'f',
    description: 'How many assets to add to minimum fee (10000)',
    defaultValue: 0,
    type: Number
  },
  {
    name: 'dontsend',
    alias: 'x',
    description: 'FAKE sending money if flag is set',
    defaultValue: false,
    type: Boolean
  }
];



const options = commandLineArgs(optionDefinitions)
// console.log('options',options)

const sections = [
  {
    header: 'Waves mass-payment tool',
    content: 'Takes a list of recipients and send a payment to each. lists, assetId, publicKey, privateKey - are required'
  },
  {
    header: 'Options',
    optionList: optionDefinitions

  },
  {
    content: 'Maintainer: [underline]{https://github.com/gen4sp}'
  }
]
const usage = getUsage(sections)


function checkRequired(opts){
  return !(!opts.assetId ||
  !opts.publicKey ||
  !opts.privateKey ||
  !opts.lists || opts.lists.length<=0 ||
  (opts.message && opt.message.length>140));
}

function init(){
  return new Promise((resolve, reject)=>{
    if(checkRequired(options)){
      resolve(options)
    } else {
      console.log(usage)
      reject();
    }
  })
}


export default {
  options:options,
  init:init
}