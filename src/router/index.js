import Router from 'vue-router'

import Callback from '@/utils/oauth2/Callback'
import { storage } from '@/utils/oauth2'

import Login from '@/components/pages/Login'
import Admin from '@/components/pages/Admin/Admin'
import Applications from '@/components/pages/Admin/Applications'
import Users from '@/components/pages/Admin/Users'

let router = new Router({
  routes: [
    // Logged
    {
      path: '/admin/*',
      component: Admin,
      beforeEach: (to, from, next) => {
        const session = storage.getSession()
        if (!session) {
          next('/login')
        }

        next()
      },
      children: [{
        path: '/applications',
        component: Applications
      }, {
        path: '/users',
        component: Users
      }]
    },
    // Redirected
    {
      path: '/',
      redirect: '/admin/users'
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
