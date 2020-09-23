import React from 'react';
import { createBrowserHistory } from 'history';
import routes from '@/router'
import dva from './dva';
import createLoading from './dva-loading';
import immer from './dva-immer';
import Main from './main'
import { Route, routerRedux, Switch } from './dva/router';
import dynamic from './dva/dynamic';
import './index.less'
import { renderRoutes } from '@/router/react-router-config'

const noop = () => []
const { ConnectedRouter, push } = routerRedux;

const app = dva({
    history: createBrowserHistory({
        "basename": "/",
        getUserConfirmation(message, callback) {
            console.log(message)
            callback(true)
        }
    }),
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
//use 就是使用插件或者说钩子
//app.use({ onAction: createLogger() });
app.use(createLoading());

app.use({
    //当状态发生变化之后会执行监听函数
    onStateChange(state) {
        //localStorage.setItem('state', JSON.stringify(state));
    }
});
app.use(immer());


app.router(({ history, app }) => {

    const renderAsyncRoute = (routes) => {
        return routes.map((route) => {
            const { models = noop, component } = route;
            const AsyncComponent = dynamic({
                app,
                models,
                component
            });
            return <Route key={route.key} exact path={route.path} component={AsyncComponent} />
        })
    }

    console.log(routes)

    return (
        <ConnectedRouter history={history}>
            {/* <Layout>
                <Sider>
                    <ul>
                        <ProxyLink
                            proxyable
                            prompt={(push) => {
                                if (true) { console.log("push"); push() }
                            }}
                            to='/immerTest'
                        >
                            proxy link
                        </ProxyLink>
                        <li><Link to="/users">users</Link></li>
                    </ul>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>
                        {renderAsyncRoute(routes)}
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout> */}
                    {renderRoutes(routes,{app})}
        </ConnectedRouter>
    )

});
app.start('#root');


window.app = window.__app = app;
/**
 *
 * Error: Could not find router reducer in state tree, it must be mounted under "router"
 * {
 *    router,
 *    counter,
 *    users
 * }
 * {
 *   preset:[],
 *   present:{router,counter,users}
 *   future:[]
 * }
 */