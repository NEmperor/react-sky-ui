import React from 'react';
import routes from '@/router'
import dva from './dva';
import createLoading from './dva-loading';
import immer from './dva-immer';
import { Router } from 'react-router'
import history from '@/router/history'
import './index.less'
import { renderRoutes } from '@/router/react-router-config'
import login from '@/models/login'


const app = dva({
    //initialState: localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : undefined,
    //它是用来封装和增强reducer
    //跟别的钩子不一样
    extraEnhancers: [
        createStore => (...args) => {
            const store = createStore(...args);

            return store;
        }
    ],
    onError(e) {
        alert(e);
    }
});

app.model(login)
//app.use({ onAction: createLogger() });
app.use(createLoading());

app.use({
    //当状态发生变化之后会执行监听函数
    onStateChange(state) {
        //localStorage.setItem('state', JSON.stringify(state));
    }
});
app.use(immer());

app.router(({ app }) => {
    return (
        <Router history={history}>
            {renderRoutes(routes)}
        </Router>
    )

});
app.start('#root');

window.app = window.__app = app;
