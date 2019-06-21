import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, setRoles, getRoles } from '@/utils/auth' // get token from cookie
import { decrypt } from '@/utils/crypto'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        if (getRoles()) {
          if (to.path === '/auth-redirect' || to.path === '/404') {
            next({ path: '/' })
            NProgress.done()
          } else {
            next()
          }
        } else {
          next()
        }
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          if (to.params.roles) {
            await setRoles(JSON.stringify(to.params.roles))
            await store.dispatch('user/addRoles', to.params.roles)
            const accessRoutes = await store.dispatch('permission/generateRoutes', to.params.roles)
            router.addRoutes(accessRoutes)
          } else {
            let abc = null
            if (getRoles()) {
              abc = JSON.parse(decrypt(getRoles()))
            }
            const roles = await store.dispatch('user/getInfo')
            const accessRoutes = await store.dispatch('permission/generateRoutes', abc || roles)
            router.addRoutes(accessRoutes)
          }
          // generate accessible routes map based on roles
          if (store.getters.roles.includes('admin')) {
            let tokenRoles = null
            if (getRoles()) {
              tokenRoles = JSON.parse(decrypt(getRoles()))
            }
            if (tokenRoles) {
              next({ ...to, replace: true })
            } else {
              next({ path: '/auth-redirect' })
            }
          } else {
            next({ path: '/' })
          }
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
