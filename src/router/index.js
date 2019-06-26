import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/anchor',
    alwaysShow: false, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'anchor',
        component: () => import('@/views/anchor'),
        name: 'anchor',
        meta: {
          title: 'Page Permission',
          roles: ['editor'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/edit',
    meta: {
      title: 'Page Permission',
      roles: ['hoster'] // or you can only set roles in sub nav
    },
    children: [
      {
        path: 'edit',
        component: () => import('@/views/edit'),
        name: 'edit',
        meta: { title: 'Icons', icon: 'icon', roles: ['hoster'] }
      }
    ]
  },
  {
    path: '/studio',
    component: Layout,
    redirect: '/studio/index',
    meta: {
      title: 'sion',
      roles: ['editor'] // or you can only set roles in sub nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/studio'),
        name: 'studio',
        meta: { title: 'Icons', icon: 'icon', roles: ['editor'] }
      }
    ]
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    // component: () => import('@/views/login/auth-redirect'),
    hidden: true,
    meta: {
      title: 'Page Permission',
      roles: ['admin'] // or you can only set roles in sub nav
    }
    // children: [
    //   {
    //     path: 'auth-redirect',
    //     component: () => import('@/views/login/auth-redirect'),
    //     name: 'Icons',
    //     meta: { title: 'Icons', icon: 'icon', noCache: true, roles: ['admin'] }
    //   }
    // ]
  },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true },
  { path: '*', redirect: '/auth-redirect', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
