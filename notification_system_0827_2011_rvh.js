// 代码生成时间: 2025-08-27 20:11:01
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Configure a mock database of users for demonstration purposes
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// Function to send a notification to a user
async function sendNotification(userId, message) {
  try {
    const user = users.find(user => user.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    // Simulate sending an email notification
    console.log(`Sending notification to ${user.email}: ${message}`);
    // In a real-world scenario, this would involve integrating with an email service
    // For demonstration, we'll just log the action to the console
  } catch (error) {
    console.error('Error sending notification:', error.message);
  }
}

// Endpoint to trigger a notification
app.post('/send-notification', async (req, res) => {
  const { userId, message } = req.body;
  if (!userId || !message) {
    return res.status(400).json({ error: 'Missing userId or message' });
  }
  try {
    await sendNotification(userId, message);
    res.status(200).json({ success: 'Notification sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Notification system listening on port ${PORT}`);
});

// Note: In a real application, you would want to add proper error handling,
// input validation, and possibly authentication and authorization checks.
// This example is simplified for demonstration purposes.
