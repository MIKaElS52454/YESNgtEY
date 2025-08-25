// 代码生成时间: 2025-08-25 18:02:05
const express = require('express');
const app = express();
const port = 3000;

// 模拟数据库中的消息数据
const messages = [
  { id: 1, content: 'Hello, this is your first message!' },
  { id: 2, content: 'Welcome to the notification system.' },
  { id: 3, content: 'You have received a new notification.' },
];

// 获取所有消息的API
app.get('/messages', (req, res) => {
  try {
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Error fetching messages');
  }
});

// 添加新消息的API
app.post('/messages', (req, res) => {
  if (!req.body.content) {
    res.status(400).send('Message content is required');
    return;
  }
  try {
    const newMessage = {
      id: messages.length + 1,
      content: req.body.content,
    };
    messages.push(newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error adding new message:', error);
    res.status(500).send('Error adding new message');
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
});

// 启动服务器
app.listen(port, () => {
  console.log(`Notification system listening at http://localhost:${port}`);
});

// 注释：
// 这个简单的服务器实现了基本的消息通知系统功能。
// GET /messages 端点返回所有消息。
// POST /messages 端点允许添加新消息。
// 错误处理中间件确保任何未捕获的错误都返回给用户。
