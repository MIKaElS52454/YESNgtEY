// 代码生成时间: 2025-08-14 20:16:36
const mysql = require('mysql2/promise');

class DatabasePoolManager {
  // Constructor to initialize the pool
  constructor({ host, user, password, database }) {
    this.pool = mysql.createPool({
      host,
      user,
      password,
      database,
      connectionLimit: 10, // Adjust the connection limit as needed
      waitForConnections: true,
      queueTimeout: 60000 // 60 seconds timeout before throwing an error
    });
  }

  // Method to acquire a connection from the pool
  async getConnection() {
    try {
      const connection = await this.pool.getConnection();
      // Implement any additional logic before returning the connection
      return connection;
    } catch (error) {
      console.error('Failed to acquire database connection:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  // Method to release a connection back to the pool
  releaseConnection(connection) {
    connection.release(); // Release the connection back to the pool
  }

  // Method to handle database queries
  async query(sql, params = []) {
    const connection = await this.getConnection();
    try {
      const [rows] = await connection.execute(sql, params);
      this.releaseConnection(connection);
      return rows;
    } catch (error) {
      this.releaseConnection(connection);
      throw error; // Rethrow the error after releasing the connection
    }
  }

  // Method to end the pool and close all connections
  endPool() {
    return this.pool.end();
  }
}

// Example usage:
/*
const dbManager = new DatabasePoolManager({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'my_database'
});

(async () => {
  try {
    const rows = await dbManager.query('SELECT * FROM my_table');
    console.log(rows);
  } catch (error) {
    console.error('Query failed:', error);
  } finally {
    await dbManager.endPool();
  }
})();
*/
