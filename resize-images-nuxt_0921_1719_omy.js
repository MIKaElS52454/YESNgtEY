// 代码生成时间: 2025-09-21 17:19:08
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

// 图片尺寸批量调整器
async function resizeImages(srcDir, destDir, resizeOptions) {
  // 检查源目录是否存在
  if (!(await fs.stat(srcDir)).isDirectory()) {
    throw new Error(`Source directory ${srcDir} does not exist or is not a directory`);
  }

  // 检查目标目录是否存在，如果不存在则创建
  await fs.mkdir(destDir, { recursive: true });

  // 读取源目录下所有图片文件
  const files = await fs.readdir(srcDir);
  for (const file of files) {
    // 获取文件完整路径
    const filePath = path.join(srcDir, file);
    // 检查是否为文件
    if ((await fs.stat(filePath)).isFile()) {
      // 获取文件扩展名
      const ext = path.extname(file).toLowerCase();
      // 只处理图片文件
      if (['.jpg', '.jpeg', '.png', '.gif', '.bmp'].includes(ext)) {
        try {
          // 调整图片尺寸
          const resizedImage = await sharp(filePath).resize(resizeOptions);
          // 获取目标文件路径
          const destFilePath = path.join(destDir, file);
          // 保存调整后的图片
          await resizedImage.toFile(destFilePath);
          console.log(`Resized image saved to ${destFilePath}`);
        } catch (error) {
          console.error(`Error resizing ${file}: ${error.message}`);
        }
      }
    }
  }
}

// 示例用法
const srcDir = 'path/to/source/images';
const destDir = 'path/to/destination/images';
const resizeOptions = {
  width: 800,
  height: 600,
  fit: 'inside'
};

resizeImages(srcDir, destDir, resizeOptions)
  .then(() => console.log('All images resized successfully'))
  .catch(error => console.error('Error resizing images:', error.message));