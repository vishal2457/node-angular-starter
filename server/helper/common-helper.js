const config = require("config");
const crypto = require("crypto-js")

const encryptData = (data) => {
  let dataToBeEncrypted = JSON.stringify(data)
    var ciphertext = crypto.AES.encrypt(
        dataToBeEncrypted,
      config.get("secret")
    ).toString();
    return ciphertext;
  };

const decryptData = (data) => {
    let cipherData = crypto.AES.decrypt(data, config.get("secret"));
    console.log(cipherData);
    return cipherData.toString(crypto.enc.Utf8);
  }
  
module.exports = {
    encryptData,
    decryptData
}