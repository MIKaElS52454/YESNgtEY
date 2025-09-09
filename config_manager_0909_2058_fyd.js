// 代码生成时间: 2025-09-09 20:58:37
const fs = require('fs');
const path = require('path');

// 配置文件管理器类
class ConfigManager {
  // 构造函数，接收配置文件路径
  constructor(configPath) {
    this.configPath = configPath;
  }

  // 读取配置文件
  async readConfig() {
    try {
      // 同步检查文件是否存在
      if (!fs.existsSync(this.configPath)) {
        throw new Error('Config file not found.');
      }
      // 读取配置文件内容
      const rawData = fs.readFileSync(this.configPath, 'utf8');
      // 解析JSON数据
      return JSON.parse(rawData);
    } catch (error) {
      // 错误处理
      console.error('Failed to read config:', error.message);
      throw error;
    }
  }

  // 写入配置文件
  async writeConfig(configData) {
    try {
      // 同步将配置数据转换为JSON字符串
      const dataString = JSON.stringify(configData, null, 2);
      // 写入配置文件
      fs.writeFileSync(this.configPath, dataString, 'utf8');
    } catch (error) {
      // 错误处理
      console.error('Failed to write config:', error.message);
      throw error;
    }
  }
}

// 使用示例
const configPath = path.join(__dirname, 'config.json');
const configManager = new ConfigManager(configPath);

// 读取配置
configManager.readConfig()
  .then(config => {
    console.log('Read config:', config);
  })
  .catch(error => {
    console.error('Error reading config:', error);
  });

// 写入配置
const newConfig = {
  setting1: 'value1',
  setting2: 'value2',
};
configManager.writeConfig(newConfig)
  .then(() => {
    console.log('Config written successfully.');
  })
  .catch(error => {
    console.error('Error writing config:', error);
  });