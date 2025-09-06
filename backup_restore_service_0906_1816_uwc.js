// 代码生成时间: 2025-09-06 18:16:08
// backup_restore_service.js
// 这个服务提供了数据备份和恢复的功能

const fs = require('fs');
const path = require('path');
const util = require('util');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const appendFileAsync = promisify(fs.appendFile);

class BackupRestoreService {
  // 构造函数，接受备份文件的存储路径和工作目录
  constructor(backupPath, workDir) {
    this.backupPath = backupPath;
    this.workDir = workDir;
  }

  // 备份数据的方法
  async backupData() {
    try {
      // 读取工作目录下的所有文件
      const files = await util.promisify(fs.readdir)(this.workDir);
      for (const file of files) {
        const filePath = path.join(this.workDir, file);
        const fileContent = await readFileAsync(filePath, 'utf8');
        // 将文件内容写入备份文件
        await writeFileAsync(
          path.join(this.backupPath, `${file}_backup.json`),
          JSON.stringify(fileContent),
          'utf8'
        );
      }
      console.log('Backup completed successfully.');
    } catch (error) {
      console.error('Error during backup:', error.message);
      throw error;
    }
  }

  // 恢复数据的方法
  async restoreData() {
    try {
      // 读取备份目录下的所有文件
      const backupFiles = await util.promisify(fs.readdir)(this.backupPath);
      for (const backupFile of backupFiles) {
        if (backupFile.endsWith('_backup.json')) {
          const backupFilePath = path.join(this.backupPath, backupFile);
          const backupContent = await readFileAsync(backupFilePath, 'utf8');
          const originalFileName = backupFile.replace('_backup.json', '');
          const originalFilePath = path.join(this.workDir, originalFileName);
          // 将备份文件内容恢复到原始文件
          await writeFileAsync(originalFilePath, backupContent, 'utf8');
        }
      }
      console.log('Restore completed successfully.');
    } catch (error) {
      console.error('Error during restore:', error.message);
      throw error;
    }
  }
}

// 导出服务以便在其他模块中使用
module.exports = BackupRestoreService;