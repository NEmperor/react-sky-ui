export const menu = [
    {
        path: '/home',
        key: 'home',
        exact: true,
        name: '首页',
        component: () => import("../pages/Home"),
    },
    {
        path: '/counter/qq',
        key: 'counter',
        name: '计时器',
        component: () => import("../pages/Counter"),
        models: () => [import(`../pages/Counter/model`)]
    },
    {
        path: '/async',
        key: 'async',
        name: '按需加载不同组件',
        component: () => import("../pages/Async"),
    },
    {
        path: '/admin',
        key: 'admin',
        name: '高级权限路由',
        component: () => import("../pages/Admin"),
        authority:["admin","user"]
    },
    {
        path: '/menu',
        key: 'menu',
        name: '多级菜单',
        component:()=>import("../pages/Placehold"),
        routes: [
            {
                path: '/menu/a',
                key: 'menu1',
                name: '菜单1',
                component: () => import("@/pages/Menu"),
            },
            {
                path: '/menu/b',
                key: 'menu2',
                name: '菜单2',
                component: () => import("@/pages/Menu"),
            }
        ]
    },
];

const router = [
    {
        path: '/user',
        component: () => import("../layouts/UserLayout"),
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: () => import('../pages/Login'),
          },
        ],
      },
    {
        component: () => import("../layouts/BasicLayout"),
        routes: [
            ...menu,
            {
                component: () => import("../pages/404"),
            }
        ]
    },
];



export default router