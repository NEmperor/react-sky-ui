import React from 'react'
import { Redirect } from 'react-router-dom'
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
            component: () => import(/* webpackChunkName: "Home" */"../pages/Home")
          }),
    },
    {
        path: '/counter',
        key: 'counter',
        name: '计时器',
        component: dynamic({
            models: () => [import(/* webpackChunkName: "Counter_model" */`../pages/Counter/model`)],
            component: () => import(/* webpackChunkName: "Counter" */"../pages/Counter"),
          }),
        
    },
    {
        path: '/async',
        key: 'async',
        name: '按需加载不同组件',
        component: dynamic({
            models:noop,
            component: () => import(/* webpackChunkName: "Async" */"../pages/Async")
          }),
    },
    {
        path: '/admin',
        key: 'admin',
        name: '高级权限路由',
        
        component: dynamic({
            models:noop,
            component: () => import(/* webpackChunkName: "Admin" */"../pages/Admin"),
          }),
        authority:["admin","user"]
    },
    {
        path: '/menu',
        key: 'menu',
        name: '多级菜单',
        routes: [
            {
                path: '/menu/a',
                key: 'menu1',
                name: 'A菜单',
                routes: [
                  {
                      path: '/menu/a/1',
                      key: 'menu1',
                      name: 'A菜单1',
                      component: dynamic({
                          models:noop,
                          component: () => import(/* webpackChunkName: "Menu" */"@/pages/Menu")
                        }),
                  },
              ]
            },
            {
                path: '/menu/b',
                key: 'menu2',
                name: 'B菜单',
                component: dynamic({
                    models:noop,
                    component: () => import(/* webpackChunkName: "Menu" */"@/pages/Menu")
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
            component: () => import(/* webpackChunkName: "UserLayout" */"../layouts/UserLayout"),
          }),
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: dynamic({
                models:noop,
                component: () => import(/* webpackChunkName: "Login" */'../pages/Login'),
              }),
            
          },
        ],
    },
    {
        path: '/',
        component: dynamic({
            models:noop,
            component: () => import(/* webpackChunkName: "BasicLayout" */"../layouts/BasicLayout"),
          }),
        routes: [
          {
            path: '/',
            "exact": true,
            component: () => <Redirect to="/home" />,
          },
            ...menu,
            {
                component: dynamic({
                    models:noop,
                    component: () => import(/* webpackChunkName: "404" */"../pages/404"),
                  }),
            }
        ]
    },
];


export default router