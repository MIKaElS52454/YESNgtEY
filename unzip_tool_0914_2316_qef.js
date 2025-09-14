// 代码生成时间: 2025-09-14 23:16:01
// Import required modules
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

// Function to extract a zip file
async function unzipFile(zipFilePath, outputDir) {
  // Check if the file exists
  if (!fs.existsSync(zipFilePath)) {
    throw new Error('File does not exist.');
  }

  // Check if the output directory exists, create it if it doesn't
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create an instance of AdmZip
  const zip = new AdmZip(zipFilePath);

  // Extract the zip file to the output directory
  try {
    zip.extractAllTo(outputDir, /*overwrite*/true);
  } catch (error) {
    throw new Error(`Error extracting zip file: ${error.message}`);
  }

  // Log the extraction success
  console.log('File extracted successfully.');
}

// Example usage of the unzipFile function
(async () => {
  try {
    // Define the path to the zip file and the output directory
    const zipFilePath = 'path/to/your.zip';
    const outputDir = 'path/to/output';

    // Call the unzipFile function
    await unzipFile(zipFilePath, outputDir);
  } catch (error) {
    // Handle any errors that occur during unzipping
    console.error('Error:', error.message);
  }
})();