// 代码生成时间: 2025-10-10 19:01:44
const crypto = require('crypto');

/**
 * Desensitization Tool Service
 *
 * This service provides functionality to desensitize data such as names,
 * phone numbers, and email addresses.
 */
class DesensitizationService {
  /**
   * Desensitize a full name by replacing all but the first character with asterisks.
   *
   * @param {string} fullName - The full name to be desensitized.
   * @returns {string} Desensitized name.
   */
  static desensitizeName(fullName) {
    if (typeof fullName !== 'string' || !fullName.trim()) {
      throw new Error('Invalid full name provided.');
    }

    const [firstName, ...rest] = fullName.split(' ');
    return `${firstName.charAt(0).toUpperCase()}${rest.map(() => '*').join(' ')}`;
  }

  /**
   * Desensitize a phone number by replacing all but the last four digits with asterisks.
   *
   * @param {string} phoneNumber - The phone number to be desensitized.
   * @returns {string} Desensitized phone number.
   */
  static desensitizePhoneNumber(phoneNumber) {
    if (typeof phoneNumber !== 'string' || !phoneNumber.trim()) {
      throw new Error('Invalid phone number provided.');
    }

    const sanitizedPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (sanitizedPhone.length < 4) {
      throw new Error('Phone number is too short to desensitize.');
    }

    return `${'*'.repeat(sanitizedPhone.length - 4)}${sanitizedPhone.slice(-4)}`;
  }

  /**
   * Desensitize an email address by replacing all characters after the '@' with asterisks.
   *
   * @param {string} email - The email address to be desensitized.
   * @returns {string} Desensitized email address.
   */
  static desensitizeEmail(email) {
    if (typeof email !== 'string' || !email.includes('@')) {
      throw new Error('Invalid email address provided.');
    }

    const [localPart, domain] = email.split('@');
    return `${localPart}@${'*'.repeat(domain.length)}`;
  }
}

module.exports = DesensitizationService;