// 代码生成时间: 2025-09-29 00:01:10
const fs = require('fs');
const path = require('path');

// 组件库入口文件
module.exports = function (moduleOptions) {
  // 合并配置
  const options = {
    ...this.options.uiComponentLibrary,
    ...moduleOptions,
  };

  // 确保组件目录存在
  const componentsDir = path.resolve(this.options.srcDir, 'components');
  if (!fs.existsSync(componentsDir)) {
    throw new Error('Components directory does not exist');
  }

  // 引入所有组件
  const components = fs.readdirSync(componentsDir)
    .filter(file => file.endsWith('.vue'))
    .map(file => ({
      name: file.replace('.vue', ''),
      path: path.resolve(componentsDir, file),
    }));

  // 添加组件到NUXT
  this.addTemplate({
    src: path.resolve(__dirname, 'templates', 'components.js'),
    options: { components },
  });

  // 插件初始化
  this.nuxt.hook('components:extend', (components) => {
    components.forEach(component => {
      if (component.name) {
        this.addPlugin({
          src: component.path,
          mode: 'all',
        });
      }
    });
  });
};

// 模块的配置
module.exports.meta = require('./package.json');