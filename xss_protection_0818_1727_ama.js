// 代码生成时间: 2025-08-18 17:27:13
// Import necessary modules
const { h } = require('vue')
const sanitizeHtml = require('sanitize-html')

// Define a function to sanitize user input
function sanitizeInput(input) {
  // Use sanitize-html to remove any potentially malicious code
  const sanitizedInput = sanitizeHtml(input, {
    // Define allowed tags and attributes to prevent XSS
    allowedTags: [
      'b', 'i', 'em', 'strong', 'p', 'br', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img'
    ],
    allowedAttributes: {
      'a': ['href', 'name', 'target'],
      'img': ['src', 'alt']
    },
    selfClosing: ['img', 'br', 'hr', 'area', 'base', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'],
    allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
    allowedSchemesAppliedToAttributes: ['href', 'src'],
    allowProtocolRelative: false
  })
  
  // Return the sanitized input
  return sanitizedInput
}

// Export the sanitizeInput function for use in Nuxt.js
module.exports = { sanitizeInput }