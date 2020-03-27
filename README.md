# vue_shop

## 一.登录操作
请求api 
`axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'`
Vue.prototype.$http = axios

### 1.由戴航守卫控制访问权限

- 如果用户没有登录，但是直接通过URl访问特定的页面，则需要重新导航到登录页面

- ~~~javascript
  // 为路由对象，添加beforeEach 导航守卫
  router.beforeEach((to, from, next) => {
      // 访问登录页面， 直接放行
      if(to.path === '/login') return next()
      // 从 sessionStorage 中获取到 保存的token 值
      const tokenStr = window.sessionStorage.getItem('token')
      //没有token 强制跳转到登录页
      if(!tokenStr) return next('/login')
      next()
  })
  ~~~

### 2.退出

- 实现原理只需要销毁本地token，这样后序请求就没有token，则需要重新登录才会有token

- ~~~javascript
  //清空token
  window.sessionStorage.clear()
  // 跳转到登录界面
  this.$router.push('/login')
  ~~~

- 