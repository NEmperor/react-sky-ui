const router = [
    {
        path: '/',
        key:'home',
        name:'主页',
        component: 'Home'
    },
    {
        path: '/counter',
        key:'counter',
        name:'计时器',
        component: 'Counter',
        models: true
    }
]

export default router