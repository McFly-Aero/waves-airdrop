const bs58 = require('bs58');
const axlsign = require('axlsign');

function buildCreateAssetTransferSignatureData(transfer, privateKey, randomBytes, lengthBug) {

  let array = [
    Buffer([4]),
    base58StringToByteArray(transfer.senderPublicKey),
    Buffer([1]),
    base58StringToByteArray(transfer.assetId),
    Buffer([0]),
    Buffer(longToByteArray(transfer.timestamp)),
    Buffer(longToByteArray(transfer.amount)),
    Buffer(longToByteArray(transfer.fee)),
    base58StringToByteArray(transfer.recipient),
    // Buffer([0,0]),
    Buffer([0,transfer.attachment.length + (lengthBug || 0)]),
    Buffer.from(transfer.attachment)
  ];

  let signature = axlsign.sign(privateKey, new Buffer.concat(array), randomBytes );
  return bs58.encode(signature);
}

function base58StringToByteArray(base58String) {
  return bs58.decode(base58String);
}

function longToByteArray (value) {
  let bytes = new Array(7);
  for (let k = 7; k >= 0; k--) {
    bytes[k] = value & (255);
    value = value / 256;
  }

  return bytes;
}

// short to big-endian bytes
// function shortToByteArray (num) {
//   let bytes = []
//
//   for (let i = 0; i < 2; i++) {
//     let current = num % 256;
//     // bytes.push(current.toString(16));
//     bytes.unshift(current.toString(16));
//     num = num >> 8;
//   }
//   return bytes;
// };


export default buildCreateAssetTransferSignatureData;