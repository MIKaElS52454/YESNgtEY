// 代码生成时间: 2025-08-28 03:53:55
"use strict";

// Process Manager module
const { exec } = require('child_process');

class ProcessManager {
  // Constructor to initialize process list
  constructor() {
    this.processList = [];
  }

  // Function to add a new process
  addProcess(command) {
    return new Promise((resolve, reject) => {
      const process = exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else if (stderr) {
          reject(new Error(stderr));
        } else {
          resolve(stdout);
        }
      });

      // Save process to the list with its PID
      this.processList.push({
        command,
        pid: process.pid,
        stdout: '',
        stderr: ''
      });

      // Listen for stdout and stderr events
      process.stdout.on('data', (data) => {
        this.processList[this.processList.length - 1].stdout += data;
      });

      process.stderr.on('data', (data) => {
        this.processList[this.processList.length - 1].stderr += data;
      });

      process.on('close', (code) => {
        this.processList[this.processList.length - 1].exitCode = code;
      });
    });
  }

  // Function to get the list of all processes
  listProcesses() {
    return this.processList;
  }

  // Function to kill a process by its PID
  killProcess(pid) {
    return new Promise((resolve, reject) => {
      const processToKill = this.processList.find(p => p.pid === pid);
      if (!processToKill) {
        reject(new Error('Process not found'));
        return;
      }

      process.kill(pid, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve('Process killed successfully');
        }
      });
    });
  }
}

// Exporting the ProcessManager class for use in other parts of the application
module.exports = ProcessManager;