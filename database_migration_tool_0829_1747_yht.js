// 代码生成时间: 2025-08-29 17:47:57
 * Features:
 * - Structured and readable code
 * - Error handling
 * - Comments and documentation
 * - Following JavaScript best practices
 * - Maintainability and extensibility
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Function to run a migration script
function runMigration(migrationScriptPath) {
  return new Promise((resolve, reject) => {
    exec(`node ${migrationScriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running migration script: ${error.message}`);
        reject(error);
      } else if (stderr) {
        console.error(`Error output from migration script: ${stderr}`);
        reject(stderr);
      } else {
        console.log(`Migration script output: ${stdout}`);
        resolve(stdout);
      }
    });
  });
}

// Function to load all migration scripts
function loadMigrationScripts(migrationDirectory) {
  const migrationScripts = [];
  const files = fs.readdirSync(migrationDirectory);
  files.forEach(file => {
    if (file.endsWith('.js')) {
      const fullPath = path.join(migrationDirectory, file);
      migrationScripts.push(fullPath);
    }
  });
  return migrationScripts;
}

// Function to run all migration scripts in order
function runAllMigrations(migrationDirectory) {
  const migrationScripts = loadMigrationScripts(migrationDirectory);

  migrationScripts.forEach(script => {
    console.log(`Running migration script: ${script}`);
    runMigration(script)
      .then(output => console.log(output))
      .catch(error => console.error(`Migration failed: ${error.message}`));
  });
}

// Example usage:
// Assuming migrations are stored in './migrations' directory
runAllMigrations('./migrations');