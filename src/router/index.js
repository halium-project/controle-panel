import Router from 'vue-router'

import Callback from '@/utils/oauth2/Callback'

import Applications from '@/components/pages/Applications'
import Login from '@/components/pages/Login'
import Users from '@/components/pages/Users'

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/users'
    },
    {
      path: '/applications',
      name: 'Applications',
      component: Applications
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/access_token=*',
      name: 'Callback',
      component: Callback
    }
  ]
})

export default router
