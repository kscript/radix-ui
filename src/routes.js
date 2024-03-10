const pagesContext = require.context('./pages', true, /index\.js$/);

// 获取所有页面的keys
const pageKeys = pagesContext.keys();

// 创建一个路由映射对象
const routes = {};

// 遍历所有页面keys，构建路由映射
pageKeys.forEach((key) => {
  // 提取组件名称和路径
  const componentName = key
    .replace('./', '')
    .replace(/\/index\.js$/, '')
    .split('/')
    .join('/');

  // 获取组件
  const Component = pagesContext(key).default;

  // 在路由映射对象中设置路由
  routes[`/${componentName}`] = Component;
});
if(routes['/index']) {
  routes['/'] = routes['/index'];
  routes['/index.html'] = routes['/index'];
  routes['/option.html'] = routes['/index'];
}
export default routes