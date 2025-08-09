// 代码生成时间: 2025-08-10 04:31:09
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // PostgreSQL connection pool

// Initialize express app
const app = express();
app.use(bodyParser.json());

// PostgreSQL connection pool settings
const pool = new Pool({
  user: 'username',
  host: 'localhost',
  database: 'database',
  password: 'password',
  port: 5432,
});

// Function to prevent SQL Injection using parameterized queries
async function fetchUsers(query, params) {
  try {
    const res = await pool.query(query, params);
    return res.rows;
  } catch (err) {
    console.error('Database query error:', err);
    throw new Error('Database error');
  }
}

// Endpoint to get users
app.get('/users', async (req, res) => {
  const { name } = req.query;
  // Use parameterized queries to prevent SQL injection
  const query = 'SELECT * FROM users WHERE name = $1';
  if (name) {
    try {
      const users = await fetchUsers(query, [name]);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(400).json({ message: 'Name parameter is required' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
 * This file demonstrates how to prevent SQL injection using parameterized queries in a Nuxt.js application.
 * It sets up an Express server, handles a GET request to fetch users by name,
 * and uses a PostgreSQL connection pool to execute parameterized queries safely.
 *
 * Key Points:
 * - Use parameterized queries to avoid SQL injection.
 * - Handle errors gracefully and send appropriate HTTP status codes.
 * - Keep the code modular and maintainable.
 * - Use environment variables for configuration (e.g., database credentials).
 * - Ensure the server is configurable to run on different environments.
 */