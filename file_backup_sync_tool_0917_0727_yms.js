// 代码生成时间: 2025-09-17 07:27:11
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

// 配置文件备份和同步的源路径和目标路径
const sourcePath = 'path/to/source/directory';
const destPath = 'path/to/destination/directory';

// 函数：检查目标路径是否存在，不存在则创建
async function ensureDestPathExists() {
  try {
    await fs.ensureDir(destPath);
  } catch (error) {
    console.error(chalk.red(`Error ensuring destination path exists: ${error.message}`));
    throw error;
  }
}

// 函数：复制文件或文件夹
async function copyItem(itemPath) {
  const destItemPath = path.join(destPath, path.relative(sourcePath, itemPath));
  try {
    await fs.copy(itemPath, destItemPath);
    console.log(chalk.green(`Successfully copied ${itemPath} to ${destItemPath}`));
  } catch (error) {
    console.error(chalk.red(`Error copying ${itemPath}: ${error.message}`));
    throw error;
  }
}

// 函数：同步文件和文件夹
async function syncFiles() {
  try {
    await ensureDestPathExists();
    const items = await fs.readdir(sourcePath);
    for (const item of items) {
      const itemPath = path.join(sourcePath, item);
      const stats = await fs.stat(itemPath);
      if (stats.isDirectory()) {
        // 递归同步子文件夹
        await syncFiles(itemPath);
      } else if (stats.isFile()) {
        // 复制文件
        await copyItem(itemPath);
      }
    }
  } catch (error) {
    console.error(chalk.red(`Error syncing files: ${error.message}`));
    throw error;
  }
}

// 主函数：开始文件备份和同步
async function backupAndSync() {
  try {
    console.log(chalk.blue('Starting file backup and sync...'));
    await syncFiles();
    console.log(chalk.blue('File backup and sync completed successfully.'));
  } catch (error) {
    console.error(chalk.red('File backup and sync failed:'), error);
  }
}

// 执行主函数
backupAndSync();