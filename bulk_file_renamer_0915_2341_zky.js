// 代码生成时间: 2025-09-15 23:41:23
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// 将fs.rename方法转换为返回Promise的形式
const rename = promisify(fs.rename);

/**
 * 批量文件重命名工具
 * @param {string} directory - 文件夹路径
 * @param {RegExp} searchPattern - 搜索模式，用于匹配旧的文件名中的文本
 * @param {string} replacePattern - 替换模式，用于替换旧的文件名中的文本
 * @returns {Promise<void>}
 */
async function bulkRename(directory, searchPattern, replacePattern) {
  try {
    // 读取目录中的所有文件
    const files = fs.readdirSync(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      // 检查是否为文件
      if (fs.statSync(filePath).isFile()) {
        // 查找匹配的文件名并替换
        const newFileName = file.replace(searchPattern, replacePattern);
        // 构建新的文件路径
        const newFilePath = path.join(directory, newFileName);
        // 重命名文件
        await rename(filePath, newFilePath);
        console.log(`Renamed ${filePath} to ${newFilePath}`);
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

// 使用示例
// bulkRename('/path/to/directory', /oldText/g, 'newText');