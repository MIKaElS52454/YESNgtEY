// 代码生成时间: 2025-08-08 21:31:02
import crypto from 'crypto';

/**
 * A utility class for encrypting and decrypting passwords.
# 增强安全性
 */
class EncryptDecryptTool {
  /**
   * Encrypts a password using the specified algorithm.
# 优化算法效率
   * @param {string} password - The password to be encrypted.
# TODO: 优化性能
   * @param {string} [algorithm='aes-256-cbc'] - The encryption algorithm to use.
   * @returns {string} The encrypted password.
   */
  static encryptPassword(password, algorithm = 'aes-256-cbc') {
# FIXME: 处理边界情况
    // Generate a random salt
# 优化算法效率
    const salt = crypto.randomBytes(16).toString('hex');

    // Create a key from the salt and a default passphrase
# FIXME: 处理边界情况
    const key = crypto.scryptSync(password, salt, 32, { N: 1024, r: 8, p: 16 });

    // Create cipher and cipher text
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
# 改进用户体验
    let encrypted = cipher.update(password);
# TODO: 优化性能
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // Return the IV and encrypted text as a single string
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  /**
   * Decrypts an encrypted password.
   * @param {string} encrypted - The encrypted password to be decrypted.
   * @param {string} [algorithm='aes-256-cbc'] - The encryption algorithm used for decryption.
# 添加错误处理
   * @returns {string} The decrypted password.
   */
  static decryptPassword(encrypted, algorithm = 'aes-256-cbc') {
# 优化算法效率
    // Split the encrypted string into IV and encrypted text
    const [iv, encryptedText] = encrypted.split(':');
    if (!iv || !encryptedText) {
      throw new Error('Invalid encrypted format.');
    }

    // Convert IV and encrypted text from hex to buffers
    const ivBuffer = Buffer.from(iv, 'hex');
    const encryptedBuffer = Buffer.from(encryptedText, 'hex');

    // Create a key from the password and the IV
# NOTE: 重要实现细节
    const key = crypto.scryptSync(process.env.PASSWORD, ivBuffer.toString('hex'), 32, { N: 1024, r: 8, p: 16 });

    // Create decipher and decipher text
    const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
    let decrypted = decipher.update(encryptedBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // Return the decrypted text
    return decrypted.toString();
  }
}

// Usage example:
try {
  const password = 'mySecretPassword';
  const encrypted = EncryptDecryptTool.encryptPassword(password);
  console.log(`Encrypted: ${encrypted}`);
  const decrypted = EncryptDecryptTool.decryptPassword(encrypted);
  console.log(`Decrypted: ${decrypted}`);
} catch (error) {
  console.error('An error occurred:', error.message);
}
# 优化算法效率