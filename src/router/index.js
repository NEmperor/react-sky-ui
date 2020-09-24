import dynamic from '@/dva/dynamic'

const noop = () => [];

export const menu = [
    {
        path: '/home',
        key: 'home',
        exact: true,
        name: '首页',
        component: dynamic({
            models:noop,
            component: () => import("../pages/Home")
          }),
    },
    {
        path: '/counter',
        key: 'counter',
        name: '计时器',
        component: dynamic({
            models: () => [import(`../pages/Counter/model`)],
            component: () => import("../pages/Counter"),
          }),
        
    },
    {
        path: '/async',
        key: 'async',
        name: '按需加载不同组件',
        component: dynamic({
            models:noop,
            component: () => import("../pages/Async")
          }),
    },
    {
        path: '/admin',
        key: 'admin',
        name: '高级权限路由',
        
        component: dynamic({
            models:noop,
            component: () => import("../pages/Admin"),
          }),
        authority:["admin","user"]
    },
    {
        path: '/menu',
        key: 'menu',
        name: '多级菜单',
        component: dynamic({
            models:noop,
            component:()=>import("../pages/Placehold"),
          }),
        routes: [
            {
                path: '/menu/a',
                key: 'menu1',
                name: '菜单1',
                component: dynamic({
                    models:noop,
                    component: () => import("@/pages/Menu")
                  }),
            },
            {
                path: '/menu/b',
                key: 'menu2',
                name: '菜单2',
                component: dynamic({
                    models:noop,
                    component: () => import("@/pages/Menu")
                  }),
                
            }
        ]
    },
];

const router = [
    {
        path: '/user',
        component: dynamic({
            models:noop,
            component: () => import("../layouts/UserLayout"),
          }),
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: dynamic({
                models:noop,
                component: () => import('../pages/Login'),
              }),
            
          },
        ],
      },
    {
        
        component: dynamic({
            models:noop,
            component: () => import("../layouts/BasicLayout"),
          }),
        routes: [
            ...menu,
            {
                component: dynamic({
                    models:noop,
                    component: () => import("../pages/404"),
                  }),
            }
        ]
    },
];



export default router