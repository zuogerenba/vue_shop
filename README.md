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


## 二.菜单栏

### 1.通过接口获取菜单数据

- ~~~javascript
  //通过axios 请求拦截器添加token， 保证拥有获取数据的权限
  // axios 请求拦截
  axios.interceptors.request.use(config => {
      //为请求头添加对象， 添加Token验证的Authorization字段
      config.headers.Authorization = window.sessionStorage.getItem('token')
      return config
  })
  ~~~

- 

## 三.用户管理界面

### 1.添加用户表单

- 1.1验证邮箱

  - ~~~javascript
    var checkEmail = (rule, vaule, callback) => {
          const regEmail = /^(a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
          if (regEmail.test(vaule)) {
            // 合法的邮箱
            return callback()
          }
          callback(new Error('请输入合法的邮箱'))
        }
    ~~~

- 1.2验证手机号

  - ```javascript
        // 验证手机号的正则
        var checkMobil = (rule, vaule, callback) => {
          // 表达式
          const regMobil = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
          if (regMobil.test(vaule)) {
            return callback()
          }
          callback(new Error('请输入合法的手机号'))
        }
    ```

- 

