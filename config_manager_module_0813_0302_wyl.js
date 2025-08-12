// 代码生成时间: 2025-08-13 03:02:06
const fs = require('fs');
const path = require('path');

// 配置文件管理器
module.exports = class ConfigManager {

  constructor(configPath) {
    // 构造函数接收配置文件路径
    this.configPath = configPath;
  }

  // 读取配置文件
  readConfig() {
    try {
      // 确保配置文件存在
      if (!fs.existsSync(this.configPath)) {
        throw new Error(`Config file not found: ${this.configPath}`);
      }
      // 读取并返回配置文件内容
      return fs.readFileSync(this.configPath, 'utf8');
    } catch (error) {
      // 错误处理
      console.error('Error reading config:', error.message);
      throw error;
    }
  }

  // 写入配置文件
  writeConfig(data) {
    try {
      // 确保目录存在
      const dirPath = path.dirname(this.configPath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      // 写入配置文件
      fs.writeFileSync(this.configPath, data, 'utf8');
    } catch (error) {
      // 错误处理
      console.error('Error writing config:', error.message);
      throw error;
    }
  }

  // 验证配置文件内容
  validateConfig(data) {
    // 这里可以根据需要添加具体的验证逻辑
    // 例如，检查数据类型、必要字段等
    // 以下为示例验证逻辑
    if (typeof data !== 'object') {
      throw new Error('Config data must be an object');
    }
    // 可以根据需要扩展验证逻辑
  }

  // 更新配置文件
  updateConfig(updateFn) {
    try {
      // 读取当前配置
      const currentConfig = JSON.parse(this.readConfig());
      // 应用更新函数
      const updatedConfig = updateFn(currentConfig);
      // 验证更新后的配置
      this.validateConfig(updatedConfig);
      // 将更新后的配置写回文件
      this.writeConfig(JSON.stringify(updatedConfig, null, 2));
    } catch (error) {
      // 错误处理
      console.error('Error updating config:', error.message);
      throw error;
    }
  }

};
