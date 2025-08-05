// 代码生成时间: 2025-08-05 22:04:07
import CryptoJS from 'crypto-js';

const PasswordEncryptionDecryptionTool = {
  /*
   * Encrypts a password using AES encryption algorithm.
   *
   * @param {string} password - The password to encrypt.
   * @param {string} secretKey - The secret key for encryption.
   * @returns {string} - The encrypted password.
   */
  encryptPassword(password, secretKey) {
    try {
      // Check for null or undefined values
      if (!password || !secretKey) {
        throw new Error('Password and secret key cannot be null or undefined.');
      }
      // Use CryptoJS to encrypt the password
      const encrypted = CryptoJS.AES.encrypt(password, secretKey).toString();
      return encrypted;
    } catch (error) {
      // Handle errors
      console.error('Error encrypting password:', error.message);
      throw error;
    }
  },

  /*
   * Decrypts an encrypted password using AES encryption algorithm.
   *
   * @param {string} encryptedPassword - The encrypted password to decrypt.
   * @param {string} secretKey - The secret key for decryption.
   * @returns {string} - The decrypted password.
   */
  decryptPassword(encryptedPassword, secretKey) {
    try {
      // Check for null or undefined values
      if (!encryptedPassword || !secretKey) {
        throw new Error('Encrypted password and secret key cannot be null or undefined.');
      }
      // Use CryptoJS to decrypt the password
      const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    } catch (error) {
      // Handle errors
      console.error('Error decrypting password:', error.message);
      throw error;
    }
  }
};

export default PasswordEncryptionDecryptionTool;