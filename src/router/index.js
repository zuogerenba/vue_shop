import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () =>
  import('../views/login/Login.vue')
const Home = () =>
  import('../views/home/Home.vue')
const Welcome = () =>
  import('../views/welcome/Welcome.vue')
const Users = () =>
  import('../views/user/Users.vue')
const Rights = () =>
  import('../views/power/Rights.vue')
const Roles = () =>
  import('../views/power/Roles.vue')
const Cate = () =>
  import('../views/goods/Cate.vue')
const Params = () =>
  import('../views/goods/Params.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Cate },
      { path: '/params', component: Params }

    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
