// 代码生成时间: 2025-09-01 11:12:33
const faker = require('faker');

// TestDataGenerator class is responsible for generating test data
class TestDataGenerator {
  // Generate a random user
  generateUser() {
    try {
      return {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        address: {
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          zipCode: faker.address.zipCode()
        },
        phone: faker.phone.phoneNumber(),
      };
    } catch (error) {
      console.error('Error generating user:', error);
      throw error;
    }
  }

  // Generate a list of random users
  generateUsers(count) {
    try {
      if (count < 1) {
        throw new Error('Count must be greater than 0');
      }
      const users = [];
      for (let i = 0; i < count; i++) {
        users.push(this.generateUser());
      }
      return users;
    } catch (error) {
      console.error('Error generating users:', error);
      throw error;
    }
  }
}

// Exporting the TestDataGenerator class for use in other parts of the application
module.exports = TestDataGenerator;