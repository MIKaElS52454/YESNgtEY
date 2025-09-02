// 代码生成时间: 2025-09-02 21:32:37
const fs = require('fs-extra');
const path = require('path');
const prompt = require('prompt-sync')();

// 定义配置常量
const SOURCE_DIR = './source';
const BACKUP_DIR = './backup';
const SYNC_DIR = './sync';

// 检查并创建备份目录
function ensureBackupDir() {
  const backupPath = path.join(BACKUP_DIR);
  if (!fs.existsSync(backupPath)) {
    fs.mkdirSync(backupPath);
  }
}

// 检查并创建同步目录
function ensureSyncDir() {
  const syncPath = path.join(SYNC_DIR);
  if (!fs.existsSync(syncPath)) {
    fs.mkdirSync(syncPath);
  }
}

// 备份文件函数
function backupFiles(sourceDir, backupDir) {
  try {
    fs.copySync(sourceDir, backupDir, { overwrite: true });
    console.log('Backup completed successfully.');
  } catch (error) {
    console.error('Error during backup:', error);
  }
}

// 同步文件函数
function syncFiles(sourceDir, syncDir) {
  try {
    fs.copySync(sourceDir, syncDir, { overwrite: true });
    console.log('Sync completed successfully.');
  } catch (error) {
    console.error('Error during sync:', error);
  }
}

// 主函数，用于执行备份和同步操作
function main() {
  // 确保备份和同步目录存在
  ensureBackupDir();
  ensureSyncDir();

  // 进行备份
  backupFiles(SOURCE_DIR, BACKUP_DIR);

  // 进行同步
  syncFiles(SOURCE_DIR, SYNC_DIR);
}

// 运行主函数
main();