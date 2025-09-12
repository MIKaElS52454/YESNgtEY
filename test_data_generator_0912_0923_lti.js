// 代码生成时间: 2025-09-12 09:23:54
// Import necessary libraries
const faker = require('faker');

// Function to generate random data for testing
function generateTestData() {
  // Generate a random user object
  const user = generateRandomUser();
  // Generate a random product object
  const product = generateRandomProduct();
  // Generate a random transaction object
  const transaction = generateRandomTransaction();

  // Return the mock data objects
  return { user, product, transaction };
}

// Function to generate a random user object
function generateRandomUser() {
  try {
    // Use faker to generate random user data
    return {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
    };
  } catch (error) {
    // Handle any errors that occur during user data generation
    console.error('Error generating user data:', error);
    throw error;
  }
}

// Function to generate a random product object
function generateRandomProduct() {
  try {
    // Use faker to generate random product data
    return {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
    };
  } catch (error) {
    // Handle any errors that occur during product data generation
    console.error('Error generating product data:', error);
    throw error;
  }
}

// Function to generate a random transaction object
function generateRandomTransaction() {
  try {
    // Use faker to generate random transaction data
    return {
      id: faker.datatype.uuid(),
      date: faker.date.recent(),
      amount: faker.commerce.amount(),
      status: faker.finance.transactionType(),
    };
  } catch (error) {
    // Handle any errors that occur during transaction data generation
    console.error('Error generating transaction data:', error);
    throw error;
  }
}

// Export the generateTestData function for use in other modules
module.exports = { generateTestData };
