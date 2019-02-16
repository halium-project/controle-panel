import Router from 'vue-router'

import Callback from '@/utils/oauth2/Callback'

import LoggedLayout from '@/components/pages/LoggedLayout'
import Applications from '@/components/pages/Applications'
import Login from '@/components/pages/Login'
import Users from '@/components/pages/Users'

let router = new Router({
  routes: [
    // Logged
    {
      path: '/applications',
      name: 'Applications',
      component: LoggedLayout,
      children: [{
        path: '/',
        component: Applications
      }]
    },
    {
      path: '/users',
      name: 'Users',
      component: LoggedLayout,
      children: [{
        path: '/',
        component: Users
      }]
    },
    // Redirected
    {
      path: '/',
      redirect: '/users'
    },
    // Not logged
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/access_token=*',
      name: 'Callback',
      component: Callback
    }
  ]
})

export default router
