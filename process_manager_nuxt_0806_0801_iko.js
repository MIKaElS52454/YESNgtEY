// 代码生成时间: 2025-08-06 08:01:32
const { exec } = require('child_process'); // 引入child_process模块

// 进程管理器类，用于管理系统进程
class ProcessManager {
  // 构造函数
  constructor() {
    // 初始化进程列表
    this.processList = [];
  }

  // 添加进程
  addProcess(processName) {
    try {
      // 检查进程是否已存在
      if (this.processList.includes(processName)) {
        throw new Error('Process already exists.');
      }
      // 启动进程
      const process = exec(`node ${processName}.js`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
          return;
        }
        console.log(`Process started: ${processName}`);
        console.log(stdout);
      });
      // 将进程添加到列表
      this.processList.push(processName);
    } catch (error) {
      console.error(error.message);
    }
  }

  // 停止进程
  stopProcess(processName) {
    try {
      // 查找进程
      const processIndex = this.processList.indexOf(processName);
      if (processIndex === -1) {
        throw new Error('Process not found.');
      }
      // 停止进程
      exec(`kill ${this.processList[processIndex]}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
          return;
        }
        console.log(`Process stopped: ${processName}`);
        console.log(stdout);
        // 从列表中移除进程
        this.processList.splice(processIndex, 1);
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  // 列出所有进程
  listProcesses() {
    console.log('Current processes:', this.processList);
  }
}

// 示例使用
const processManager = new ProcessManager();
processManager.addProcess('exampleProcess');
processManager.listProcesses();
setTimeout(() => {
  processManager.stopProcess('exampleProcess');
}, 5000); // 5秒后停止进程