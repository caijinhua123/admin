import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },{
    path: '/',
    component: Layout,
    children: [{
      path: '/',
      name: '控制台',
      component: () => import('@/views/home/index'),
      meta: { title: '控制台', icon: 'dashboard' }
    }]
  },{
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }, {
    path: '/banner',
    component: Layout,
    children: [
      {
        path: '',
        name: '首页标语',
        component: () => import('@/views/banner/index'),
        meta: { title: '首页标语', icon: 'el-icon-picture' },
      }
    ]
  },
  {
    path: '/Blog',
    component: Layout,
    redirect: '/Blog/blog',
    name: '文章管理',
    meta: { title: '文章管理', icon: 'el-icon-s-order' },
    children: [
      {
        path: 'addblog',
        name: '添加文章',
        component: () => import('@/views/addblog/index'),
        meta: { title: '添加文章', icon: 'el-icon-s-order' }
      },
      {
        path: 'blog',
        name: '文章分类',
        component: () => import('@/views/Blog/index'),
        meta: { title: '文章分类', icon: 'el-icon-s-order' }
      },
      {
        path: 'BlogList',
        name: '文章列表',
        component: () => import('@/views/BlogList/index'),
        meta: { title: '文章列表', icon: 'el-icon-s-order' }
      },
      {
        path: 'putBlog/:id',
        name: '修改文章',
        hidden:true,
        component: () => import('@/views/putblog/index'),
        meta: { title: '修改文章', icon: 'el-icon-s-order' }
      }
    ]
  }, {
    path: '/Project',
    component: Layout,
    redirect: '/Project/projectList',
    name: '项目管理',
    meta: { title: '项目管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'projectList',
        name: '项目列表',
        component: () => import('@/views/projectList/index'),
        meta: { title: '项目列表', icon: 'tree' }
      },
      {
        path: 'addproject',
        name: '添加项目',
        component: () => import('@/views/addproject/index'),
        meta: { title: '添加项目', icon: 'table' }
      }
    ]
  }, {
    path: '/message',
    component: Layout,
    children: [
      {
        path: '',
        name: '留言板',
        component: () => import('@/views/message/index'),
        meta: { title: '留言板', icon: 'el-icon-message' },
      }
    ]
  }, {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: '',
        name: '评论管理',
        component: () => import('@/views/comment/index'),
        meta: { title: '评论管理', icon: 'el-icon-s-comment' },
      }
    ]
  }, {
    path: '/about',
    component: Layout,
    children: [
      {
        path: '',
        name: '关于我',
        component: () => import('@/views/about/index'),
        meta: { title: '关于我', icon: 'el-icon-s-custom' },
      }
    ]
  }, {
    path: '/set',
    component: Layout,
    children: [
      {
        path: '',
        name: '设置',
        component: () => import('@/views/set/index'),
        meta: { title: '设置', icon: 'el-icon-setting' },
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
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
