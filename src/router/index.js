import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
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
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
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
  },
  {
    path: '/',
    component: Layout,
    redirect: '/excel/export-excel',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'el-icon-s-home' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: '示例',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: '创建文章', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: '编辑文章', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: '文章列表', icon: 'list' }
  //     }
  //   ]
  // },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: '群众功能',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: '群众列表', affix: true }
      },
      {
        path: 'addlog',
        component: () => import('@/views/excel/add-log-page'),
        name: '新建居民信息',
        meta: { title: '新建居民信息' }
      },
      {
        path: 'editlog',
        component: () => import('@/views/excel/edit-log-page'),
        name: '修改居民信息',
        hidden: true,
        meta: { title: '修改居民信息' }
      },
      {
        path: 'viewlog',
        component: () => import('@/views/excel/view-log-page'),
        name: '查看居民信息',
        hidden: true,
        meta: { title: '查看居民信息' }
      }
      // {
      //   path: 'export-selected-excel',
      //   component: () => import('@/views/excel/select-excel'),
      //   name: 'SelectExcel',
      //   meta: { title: '变动记录' }
      // },
      // {
      //   path: 'upload-excel',
      //   component: () => import('@/views/excel/upload-excel'),
      //   name: 'UploadExcel',
      //   meta: { title: '批量导入' }
      // }
    ]
  },
  {
    path: '/apply',
    component: Layout,
    redirect: '/apply/wait-apply',
    name: 'apply',
    meta: {
      title: '审核管理',
      icon: 'el-icon-s-claim'
    },
    children: [
      {
        path: 'wait-apply',
        component: () => import('@/views/excel/wait-apply'),
        name: '待审核',
        props: { type: 'waitapply' },
        meta: { title: '待审核', roles: ['super-admin', 'admin'] }
      },
      {
        path: 'wait-ing',
        component: () => import('@/views/excel/wait-apply'),
        name: '审核中',
        props: { type: 'waiting' },
        meta: { title: '审核中', roles: ['group'] }
      },
      {
        path: 'apply-back',
        component: () => import('@/views/excel/wait-apply'),
        name: '被驳回',
        props: { type: 'back' },
        meta: { title: '被驳回', roles: ['group'] }
      },
      {
        path: 'viewapply',
        component: () => import('@/views/excel/view-apply-page'),
        name: '查看审核',
        hidden: true,
        meta: { title: '查看审核' }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/role',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '办公人员管理',
      icon: 'el-icon-s-custom'
    },
    children: [
      // {
      //   path: 'page',
      //   component: () => import('@/views/permission/page'),
      //   name: '页面鉴权',
      //   meta: {
      //     title: 'Page Permission',
      //     roles: ['admin'] // or you can only set roles in sub nav
      //   }
      // },

      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: '管理人员列表',
        meta: {
          title: '管理人员列表',
          roles: ['super-admin']
        }
      },
      {
        path: 'editpassword',
        component: () => import('@/views/permission/editpassword'),
        name: '修改密码',
        meta: {
          title: '修改密码'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
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
