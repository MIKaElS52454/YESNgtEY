// 代码生成时间: 2025-08-06 21:08:25
const nodeSchedule = require('node-schedule');
const logger = require('~/utils/logger'); // 引入日志工具

/**
 * 定时任务调度器模块
 * @module scheduler
 */

// 存储任务的集合
const tasks = [];

/**
 * 添加定时任务
 * @param {string} name - 任务名
 * @param {string} rule - 执行规则（cron格式）
 * @param {function} job - 执行的任务函数
 */
function addTask(name, rule, job) {
  try {
    // 验证任务规则是否有效
    if (!nodeSchedule.parse(rule)) {
      throw new Error('Invalid schedule rule.');
    }

    // 创建定时任务
    const task = nodeSchedule.scheduleJob(rule, job);

    // 将任务存储到集合中
    tasks.push({ name, task });
  } catch (error) {
    logger.error(`Failed to add task ${name}: ${error.message}`);
  }
}

/**
 * 移除定时任务
 * @param {string} name - 任务名
 */
function removeTask(name) {
  try {
    // 查找并移除任务
    tasks.forEach((task, index) => {
      if (task.name === name) {
        task.task.cancel();
        tasks.splice(index, 1);
      }
    });
  } catch (error) {
    logger.error(`Failed to remove task ${name}: ${error.message}`);
  }
}

// 导出模块
module.exports = {
  addTask,
  removeTask,
};