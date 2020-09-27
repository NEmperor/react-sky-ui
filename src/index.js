import React from 'react';
import Dva from './dva2'
import createLoading from './dva-loading';
import immer from './dva-immer';
import App from './App'
import './index.less'
import login from '@/models/login'
import asyncMenu from '@/models/asyncMenu'
const app = new Dva({
    onError(e) {
        alert(e);
    }
})

// const app = dva({
//     //initialState: localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : undefined,
//     //跟别的钩子不一样
//     onError(e) {
//         alert(e);
//     }
// });

app.model(login)
app.model(asyncMenu)
app.use(createLoading());

app.use({
    //当状态发生变化之后会执行监听函数
    onStateChange(state) {
        //localStorage.setItem('state', JSON.stringify(state));
    }
});
app.use(immer());

app.router(({ app }) => {
    return (<App />)
});

app.start('#root');

window.app = window.__app = app;
