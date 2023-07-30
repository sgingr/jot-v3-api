"use strict";
const crypto = require("crypto");
const Logger = require("utils/logger");
/*
| -----------------------------------------------------------------------
|  EncryptionHelper
| -----------------------------------------------------------------------
*/
class EncryptionHelper {

  /*
  | -----------------------------------------------------------------------
  |  constructor
  | -----------------------------------------------------------------------
  */
  constructor() {
    let self = this;
    self.CIPHERS = {
      "AES_128": "aes128",          //requires 16 byte key
      "AES_128_CBC": "aes-128-cbc", //requires 16 byte key
      "AES_192": "aes192",          //requires 24 byte key
      "AES_256": "aes256"           //requires 32 byte key
    };
    self.logger = new Logger('EncryptionHelper');
    self.key = Buffer.from(process.env.ENCRYPT_KEY, "hex");
    self.iv = Buffer.from(process.env.ENCRYPT_IV, "hex");
  }

  /*
  | -----------------------------------------------------------------------
  |  encryptText
  | -----------------------------------------------------------------------
  */
  encryptText(text) {
    let self = this;
    var cipher_alg = "aes256";
    var encoding = "base64";
    var cipher = crypto.createCipheriv(cipher_alg, self.key, self.iv);
    var result = cipher.update(text, "utf8", encoding);
    result += cipher.final(encoding);
    return result;
  }

  /*
  | -----------------------------------------------------------------------
  |  decryptText
  | -----------------------------------------------------------------------
  */
  decryptText(text) {
    let self = this;
    var cipher_alg = "aes256";
    var encoding = "base64";
    try {
      var decipher = crypto.createDecipheriv(cipher_alg, self.key, self.iv);
      var result = decipher.update(text, encoding);
      result += decipher.final();
      return result;
    } catch(err) {
      self.logger.error('Unable to decrypt string [' + err + ']');
    }
  }

}
module.exports = EncryptionHelper;
