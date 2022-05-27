import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {//路由守卫
  // start progress bar
  NProgress.start()
//进度条
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const Token = window.localStorage.getItem("token")

  if (Token) {
    //进入此判断说明为登录用户
    if (to.path === '/login') {
  //    
      next({ path: '/' })
      NProgress.done()
    } else {
       if (Object.keys(store.state.user.user).length ) {
         //有值则进入
        next()
      } else {
          // 进入此判断说明没有用户信息，有token，需要验证
          store.dispatch('user/getInfo').then((res) => { 
            //通过验证
            next()
           }).catch(async (error)=>{
             //未通过，如果目标路径不存在则直接跳转到login，否则登录后跳转目标
            if(!to.path){
              next('/login')
            }
            // 先去除token
            await store.dispatch('user/resetToken')
            Message.error(error || 'Has Error')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          })
      }
      
    }
  } else {
  //   /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {//路由白名单
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
