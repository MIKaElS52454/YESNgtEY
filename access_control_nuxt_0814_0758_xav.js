// 代码生成时间: 2025-08-14 07:58:08
const { createI18n } = require('vue-i18n')
const router = require('./router') // 引入router配置文件
const store = require('./store') // 引入store配置文件
const middleware = require('./middleware') // 引入middleware配置文件

// 创建i18n实例
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: require('./locales/en.json'),
    'zh-CN': require('./locales/zh-CN.json'),
  },
})

// 定义一个中间件函数，用于访问权限控制
function accessControlMiddleware(to, from, next) {
  // 检查用户的权限
  const userPermissions = store.state.user.permissions;
  // 获取当前路由的所需权限
  const requiredPermission = router.getRouteMeta(to.name).requiredPermission;
  
  if (!requiredPermission) {
    // 如果没有设置所需权限，则直接放行
    return next();
  }
  
  if (userPermissions.includes(requiredPermission)) {
    // 如果用户拥有所需权限，则允许访问
    return next();
  } else {
    // 如果用户没有所需权限，则重定向到无权限页面
    return next('/no-permission');
  }
}

// 使用中间件
middleware.addServerMiddleware(
  async (req, res, next) => {
    try {
      // 执行权限控制中间件
      await accessControlMiddleware(req, res, next);
    } catch (error) {
      // 错误处理
      console.error('Access control middleware error:', error);
      res.status(500).send('Internal Server Error');
    }
  }
);

module.exports = {
  i18n,
  store,
  router,
};