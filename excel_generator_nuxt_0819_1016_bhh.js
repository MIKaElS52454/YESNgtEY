// 代码生成时间: 2025-08-19 10:16:28
 * It handles error checking and provides a clear structure for maintenance and extension.
 */

const ExcelJS = require('exceljs');

// A function to generate an Excel workbook and add a worksheet with data
async function generateExcel(data, sheetName) {
  try {
    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();

    // Add a new worksheet to the workbook
    const worksheet = workbook.addWorksheet(sheetName);

    // Add data rows to the worksheet
    data.forEach((row, index) => {
      if (index === 0) {
        // Add headers if it's the first row
        worksheet.addRow(Object.keys(row));
      }
      worksheet.addRow(Object.values(row));
    });

    // Write the workbook to a file
    await workbook.xlsx.writeFile('output.xlsx');
    console.log('Excel file generated successfully.');
  } catch (error) {
    console.error('Failed to generate Excel file:', error);
  }
}

// A function to handle the request to generate an Excel file
async function handleGenerateExcelRequest(req, res) {
  // Check if the request contains the required data
  if (!req.body || !req.body.data) {
    res.status(400).send('Missing required data in request.');
    return;
  }

  try {
    // Generate the Excel file
    await generateExcel(req.body.data, 'Generated Data');
    res.status(200).send('Excel file generated successfully.');
  } catch (error) {
    res.status(500).send('An error occurred while generating the Excel file.');
  }
}

// Export the function to be used in other parts of the NUXT application
module.exports = {
  generateExcel,
  handleGenerateExcelRequest
};