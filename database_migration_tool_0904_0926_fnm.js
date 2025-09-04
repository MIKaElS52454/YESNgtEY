// 代码生成时间: 2025-09-04 09:26:30
 * Features:
 * - Error handling
 * - Easy to understand structure
 * - Maintainability and extendability
 */

// Import necessary modules
const fs = require('fs');
const path = require('path');
const Knex = require('knex');

// Configuration for Knex
const knexConfig = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
  }
};

// Initialize Knex instance
const knex = Knex(knexConfig);

// Function to run database migrations
async function runMigrations(migrationsPath) {
  try {
    // Read all migration files from the specified directory
    const migrations = fs.readdirSync(migrationsPath).filter(file => file.endsWith('.js'));

    // Apply each migration in sequence
    for (const migration of migrations) {
      const migrationFile = require(path.join(migrationsPath, migration));
      await knex.migrate.latest([migrationFile]);
      console.log(`Migration ${migration} applied successfully`);
    }
    console.log('All migrations have been applied successfully');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

// Function to rollback database migrations
async function rollbackMigrations(migrationsPath) {
  try {
    await knex.migrate.rollback();
    console.log('Migrations rolled back successfully');
  } catch (error) {
    console.error('Error during rollback:', error);
  }
}

// Main function to handle migrations
async function main() {
  const migrationsPath = path.join(__dirname, 'migrations');
  try {
    // Run migrations
    await runMigrations(migrationsPath);
  } catch (error) {
    console.error('Migration failed:', error);
    // Rollback migrations on error
    await rollbackMigrations(migrationsPath);
  }
}

// Call the main function to start the migration process
main();