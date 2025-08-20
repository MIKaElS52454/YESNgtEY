// 代码生成时间: 2025-08-20 14:41:27
const fs = require('fs');
const path = require('path');

/**
 * ConfigFileManager class responsible for managing configuration files.
 */
class ConfigFileManager {

  /**
   * Initialize the ConfigFileManager with the path to the config directory.
   * @param {string} configDirPath - The path to the configuration directory.
   */
  constructor(configDirPath) {
    this.configDirPath = configDirPath;
  }

  /**
   * Load a configuration file.
   * @param {string} fileName - The name of the configuration file.
   * @returns {object} - The contents of the configuration file.
   */
  loadConfigFile(fileName) {
    try {
      const configFilePath = path.join(this.configDirPath, fileName);
      if (!fs.existsSync(configFilePath)) {
        throw new Error(`Configuration file ${fileName} does not exist.`);
      }
      const configFileContent = fs.readFileSync(configFilePath, 'utf8');
      return JSON.parse(configFileContent);
    } catch (error) {
      console.error('Error loading configuration file:', error.message);
      throw error;
    }
  }

  /**
   * Save a configuration file.
   * @param {string} fileName - The name of the configuration file.
   * @param {object} configData - The data to be saved in the configuration file.
   * @returns {void}
   */
  saveConfigFile(fileName, configData) {
    try {
      const configFilePath = path.join(this.configDirPath, fileName);
      const configFileContent = JSON.stringify(configData, null, 2);
      fs.writeFileSync(configFilePath, configFileContent, 'utf8');
    } catch (error) {
      console.error('Error saving configuration file:', error.message);
      throw error;
    }
  }
}

// Example usage:

// Create an instance of ConfigFileManager pointing to a directory where
// configuration files are stored.
const configManager = new ConfigFileManager('./config');

// Load a configuration file named 'settings.json'.
try {
  const settings = configManager.loadConfigFile('settings.json');
  console.log('Loaded settings:', settings);
} catch (error) {
  // Handle error when loading fails.
}

// Save updated settings to a configuration file named 'settings.json'.
try {
  const updatedSettings = { theme: 'dark', language: 'en' };
  configManager.saveConfigFile('settings.json', updatedSettings);
  console.log('Settings updated successfully.');
} catch (error) {
  // Handle error when saving fails.
}