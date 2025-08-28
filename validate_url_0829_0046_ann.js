// 代码生成时间: 2025-08-29 00:46:43
const axios = require('axios');

/**
 * Validates a URL for its existence and correctness.
 *
 * @param {string} url - The URL to validate.
 * @returns {Promise<boolean>} - A promise that resolves to true if the URL is valid, false otherwise.
 */
async function validateURL(url) {
  // Regular expression for basic URL validation
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
  // Check if the URL matches the regex pattern
  if (!urlRegex.test(url)) {
    return false;
  }
  
  try {
    // Use axios to perform a HEAD request to check the URL
    const response = await axios.head(url, {
      timeout: 5000 // 5 seconds timeout
    });
    // Check if the response status code is in the 200 range (OK)
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    // If there's an error in the request or timeout, consider the URL invalid
    console.error('Error validating URL:', error.message);
    return false;
  }
}

// Export the function for use in other parts of the Nuxt.js application
module.exports = validateURL;