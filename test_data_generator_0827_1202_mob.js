// 代码生成时间: 2025-08-27 12:02:37
const faker = require('faker');

// 测试数据生成器
class TestDataGenerator {
  // 生成单个用户测试数据
  static generateUser() {
    try {
      return {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zipCode: faker.address.zipCode()
      };
    } catch (error) {
      console.error('Error generating user data:', error);
      throw error;
    }
  }

  // 生成多个用户测试数据
  static generateUsers(count) {
    try {
      return Array.from({ length: count }, () => this.generateUser());
    } catch (error) {
      console.error('Error generating users data:', error);
      throw error;
    }
  }
}

// 示例用法
try {
  console.log('Single user data:', TestDataGenerator.generateUser());
  console.log('Multiple users data:', TestDataGenerator.generateUsers(10));
} catch (error) {
  console.error('Error in test data generation:', error);
}