// 代码生成时间: 2025-09-15 10:29:33
 * @description Formats API responses into a standard structure with error handling.
 *
 * @author Your Name
 * @version 1.0
 */

// Import necessary modules
const axios = require('axios');

class ApiResponseFormatter {
  /**
   * Formats the API response or catches errors and formats them accordingly.
   *
   * @param {string} url - The URL of the API endpoint.
   * @param {Object} config - Axios request configuration.
   * @returns {Promise<Object>} - A promise that resolves with the formatted response.
   */
  static async formatResponse(url, config = {}) {
    try {
      // Perform the API request
      const response = await axios.request({ url, ...config });

      // Check if the response status is in the range of 200-299
      if (response.status >= 200 && response.status < 300) {
        // Return the data part of the response
        return {
          success: true,
          data: response.data,
          message: 'Request successful',
        };
      } else {
        // Handle non-successful status codes
        return {
          success: false,
          data: null,
          message: `Request failed with status: ${response.status}`,
        };
      }
    } catch (error) {
      // Handle any errors that occur during the request
      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        return {
          success: false,
          data: null,
          message: `Request failed with status: ${error.response.status}`,
        };
      } else if (error.request) {
        // The request was made but no response was received
        return {
          success: false,
          data: null,
          message: 'No response received from the server',
        };
      } else {
        // Something else happened while setting up the request
        return {
          success: false,
          data: null,
          message: 'Error setting up the request',
        };
      }
    }
  }
}

// Example usage:
// const formattedResponse = await ApiResponseFormatter.formatResponse('https://api.example.com/data', { method: 'GET' });
// console.log(formattedResponse);

module.exports = ApiResponseFormatter;