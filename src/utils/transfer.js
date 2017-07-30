import signature from './signature'
import logger from './logger'
let log = logger('transfer');
const bs58 = require('bs58');
const crypto = require('crypto');
const Promise = require('bluebird');
const rp = require('request-promise');
let minfee = 100000;
function transfer({amount, attachment, assetId, senderPublicKey, recipient, fee, privateKey, server, attempt}){
  return new Promise((resolve, reject)=>{
    let ts = new Date().getTime();
    let _privateKey = bs58.decode(privateKey);
    let randomBytes = crypto.randomBytes(64);
    let json = {
      "assetId": assetId,
      "senderPublicKey": senderPublicKey,
      "recipient": recipient,
      "fee": minfee+fee,
      "amount": amount,
      "attachment": attachment || 'Surprise! <a href="www.ya.ru"> link</a>',
      "timestamp": ts,
    };

    json['signature'] = signature(json, _privateKey, randomBytes);
    json['attachment'] = encode(json['attachment'])

    let options = {
      method: 'POST',
      uri: server+'/assets/broadcast/transfer',
      body: json,
      json:true
    };
    //
    // resolve({
    //   message:'err',
    //   attempt:attempt,
    //   recipient:recipient
    // })
    //
    rp(options)
      .then(function (parsedBody) {
        resolve()
      })
      .catch(function (err) {
        resolve(err.message)
      });

  })

}
function encode(text){
  return bs58.encode(Buffer.from(text));
}

export default transfer;