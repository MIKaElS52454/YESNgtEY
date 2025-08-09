// 代码生成时间: 2025-08-09 11:35:01
// Import required dependencies
const { Knex } = require('knex');
const { createLogger } = require('@nuxtjs/logger');

// Create a logger instance for logging
const logger = createLogger();

// Define configuration for Knex
const knexConfig = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'your_database_name'
  },
  migrations: {
    tableName: 'migrations'
  }
};

// Create a new Knex instance
const knex = Knex(knexConfig);

// Function to run database migrations
async function runMigrations() {
  try {
    // Log a message indicating the start of the migration process
    logger.info('Starting database migration process...');

    // Run the migrations using Knex
    await knex.migrate.latest();

    // Log a success message
    logger.success('Database migration completed successfully.');
  } catch (error) {
    // Handle errors that may occur during migration
    logger.error('Failed to migrate database:', error);

    // Rethrow the error to handle it further up the call stack if necessary
    throw error;
  }
}

// Function to rollback database migrations
async function rollbackMigrations() {
  try {
    // Log a message indicating the start of the rollback process
    logger.info('Starting database migration rollback process...');

    // Rollback the migrations using Knex
    await knex.migrate.rollback();

    // Log a success message
    logger.success('Database migration rollback completed successfully.');
  } catch (error) {
    // Handle errors that may occur during rollback
    logger.error('Failed to rollback database migration:', error);

    // Rethrow the error to handle it further up the call stack if necessary
    throw error;
  }
}

// Export the migration functions for use in other parts of the application
module.exports = {
  runMigrations,
  rollbackMigrations
};