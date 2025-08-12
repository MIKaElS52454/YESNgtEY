// 代码生成时间: 2025-08-12 12:20:14
const axios = require('axios');
const cheerio = require('cheerio');

/**
 * WebContentScraper class to scrape web content.
 * @class
 */
class WebContentScraper {
  constructor(url) {
    this.url = url;
  }

  /**
   * Fetches the HTML content from the provided URL.
   * @returns {Promise<string>} HTML content.
   */
  async fetchHtmlContent() {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error) {
      console.error('Error fetching HTML content:', error);
      throw error;
    }
  }

  /**
   * Extracts and returns the content from the HTML.
   * @param {string} selector - The CSS selector to find the content.
   * @returns {Promise<string>} Extracted content.
   */
  async extractContent(selector) {
    try {
      const html = await this.fetchHtmlContent();
      const $ = cheerio.load(html);
      const content = $(selector).text().trim();
      return content;
    } catch (error) {
      console.error('Error extracting content:', error);
      throw error;
    }
  }
}

// Usage example:
(async () => {
  try {
    const scraper = new WebContentScraper('https://example.com');
    const content = await scraper.extractContent('body');
    console.log('Extracted content:', content);
  } catch (error) {
    console.error('Failed to scrape content:', error);
  }
})();