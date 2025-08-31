// 代码生成时间: 2025-08-31 21:36:34
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');

// 配置源目录和目标目录
const srcDir = './src';
const destDir = './dest';

// 检查并创建目标目录
function ensureDestDir() {
  return fs.ensureDir(destDir)
    .then(() => console.log(chalk.green(`确保目标目录 ${destDir} 存在。`)))
    .catch(err => console.error(chalk.red(`创建目标目录时出错: ${err}`)));
}

// 复制文件或目录
function copy(src, dest) {
  return fs.copy(src, dest, { overwrite: true })
    .then(() => console.log(chalk.green(`复制文件或目录 ${src} 到 ${dest} 成功。`)))
    .catch(err => console.error(chalk.red(`复制文件或目录时出错: ${err}`)));
}

// 删除文件或目录
function remove(src) {
  return fs.remove(src)
    .then(() => console.log(chalk.green(`删除文件或目录 ${src} 成功。`)))
    .catch(err => console.error(chalk.red(`删除文件或目录时出错: ${err}`)));
}

// 文件备份和同步工具的入口函数
async function main() {
  try {
    // 确保目标目录存在
    await ensureDestDir();

    // 复制源目录到目标目录
    await copy(srcDir, destDir);

    // 如果需要删除源目录，可以取消下面代码注释
    // await remove(srcDir);

    console.log(chalk.green('文件备份和同步完成。'));
  } catch (err) {
    console.error(chalk.red(`操作过程中出错: ${err}`));
  }
}

// 程序入口
main();

// 注意：
// 1. 请确保 node_modules 目录中安装了 fs-extra 和 rimraf 包。
// 2. 此脚本假定源目录和目标目录都已正确设置。
// 3. 根据实际需求，可能需要更多的错误处理和功能扩展。