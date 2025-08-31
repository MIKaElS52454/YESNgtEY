// 代码生成时间: 2025-08-31 10:16:05
const randomNumberGenerator = () => {
  // 获取用户输入的最小值和最大值
  const min = parseInt(process.env.MIN_VALUE, 10);
  const max = parseInt(process.env.MAX_VALUE, 10);
  
  // 验证输入是否为有效数字
  if (isNaN(min) || isNaN(max)) {
    throw new Error('MIN_VALUE and MAX_VALUE must be valid numbers');
  }

  // 验证最大值是否大于最小值
  if (max <= min) {
    throw new Error('MAX_VALUE must be greater than MIN_VALUE');
  }

  // 生成随机数
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 导出函数
exports.randomNumberGenerator = randomNumberGenerator;

// 文档说明
/**
 * @function randomNumberGenerator
 * @description Generates a random integer between two given values.
 * @param {number} min - The minimum value (inclusive) for the random number.
 * @param {number} max - The maximum value (inclusive) for the random number.
 * @returns {number} A random integer between min and max.
 * @throws Error if min or max is not a number or max is not greater than min.
 */
