const CryptoJS = require("crypto-js");
const SECRET_KEY = process.env.CRYPTO_SECRET_KEY;

const encrypt = (data) => {
  const stringified = JSON.stringify(data);
  // console.log(stringified);
  return CryptoJS.AES.encrypt(stringified, SECRET_KEY).toString();
};

const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};

module.exports = { encrypt, decrypt };
