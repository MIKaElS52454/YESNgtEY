// 代码生成时间: 2025-09-07 20:07:52
const axios = require('axios');

/**
 * Function to validate a URL.
 * @param {string} url - The URL to be validated.
 * @returns {Promise<boolean>} - A promise that resolves to true if the URL is valid, otherwise false.
 */
async function validateUrl(url) {
  try {
    // Use axios to make a HEAD request to check if the URL is reachable.
    const response = await axios.head(url, {
      timeout: 5000 // Set a timeout for the request.
    });
    // If the HTTP status code is 2xx, the URL is considered valid.
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    // If there's an error (e.g., network issues, timeout), the URL is considered invalid.
    console.error('URL validation error:', error.message);
    return false;
  }
}

/**
 * Usage example.
 * @param {string} sampleUrl - An example URL to test the validator.
 */
async function testUrlValidator(sampleUrl) {
  const isValid = await validateUrl(sampleUrl);
  if (isValid) {
    console.log(`The URL ${sampleUrl} is valid.`);
  } else {
    console.log(`The URL ${sampleUrl} is not valid.`);
  }
}

// Example usage of the function with an example URL.
// Replace 'http://example.com' with any URL you want to validate.
testUrlValidator('http://example.com');