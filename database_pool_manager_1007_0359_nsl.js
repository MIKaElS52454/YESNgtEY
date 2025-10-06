// 代码生成时间: 2025-10-07 03:59:21
// Import necessary modules
const { Pool } = require('pg');

// Configuration for the database connection pool
const poolConfig = {
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
};

// Create a new pool instance
const pool = new Pool(poolConfig);

/**
 * Get a client from the pool and execute a query
 * @param {String} query - The SQL query to be executed
 * @param {Function} callback - A callback function to handle the result
 */
async function executeQuery(query, callback) {
  try {
    // Connect to the pool and execute the query
    const client = await pool.connect();
    try {
      const res = await client.query(query);
      // Call the callback with the result
      callback(null, res.rows);
    } catch (error) {
      // Handle errors during query execution
      callback(error, null);
    } finally {
      // Release the client back to the pool
      client.release();
    }
  } catch (error) {
    // Handle errors during pool connection
    callback(error, null);
  }
}

// Example usage of executeQuery function
executeQuery('SELECT * FROM users', (error, result) => {
  if (error) {
    console.error('Error executing query:', error);
  } else {
    console.log('Query result:', result);
  }
});

module.exports = { executeQuery };