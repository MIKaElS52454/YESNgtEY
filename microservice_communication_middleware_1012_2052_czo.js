// 代码生成时间: 2025-10-12 20:52:01
const axios = require('axios');

// 微服务通信中间件
class MicroserviceMiddleware {
  // 构造函数，接收微服务API基础路径
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
  }

  // 发送请求到微服务
  async sendRequest(service, method, endpoint, data) {
    try {
      const url = `${this.apiBaseUrl}/${service}/${endpoint}`;
      const response = await axios({
        method,
        url,
        data,
        headers: {'Content-Type': 'application/json'}
      });
      return response.data;
    } catch (error) {
      // 错误处理
      console.error('Error communicating with microservice:', error.message);
      throw error;
    }
  }

  // GET请求
  async get(service, endpoint) {
    return this.sendRequest(service, 'get', endpoint);
  }

  // POST请求
  async post(service, endpoint, data) {
    return this.sendRequest(service, 'post', endpoint, data);
  }

  // PUT请求
  async put(service, endpoint, data) {
    return this.sendRequest(service, 'put', endpoint, data);
  }

  // DELETE请求
  async delete(service, endpoint) {
    return this.sendRequest(service, 'delete', endpoint);
  }
}

// 示例使用
// 假设有一个名为'users'的微服务
const usersService = new MicroserviceMiddleware('https://api.example.com/');

// 发送GET请求获取用户列表
usersService.get('users', 'list').then(data => {
  console.log(data);
}).catch(error => {
  console.error(error);
});