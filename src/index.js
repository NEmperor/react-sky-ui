import React from 'react';
import { createBrowserHistory } from 'history';
import ProxyLink from '@/components/ProxyLink'
import routes from '@/router'
import dva, { connect } from './dva';
import createLoading from './dva-loading';
import { Router, Route, Link, routerRedux } from './dva/router';
import dynamic from './dva/dynamic';
import { delay } from './utils';


const { ConnectedRouter, push } = routerRedux;

const app = dva({
    // history: createBrowserHistory(),
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

// app.model({
//     namespace: 'counter',
//     state: { number: 0 },
//     reducers: {
//         add(state) {// "counter/add"
//             return { number: state.number + 1 };
//             /*  return produce(state, draftState => {
//                  draftState.number += 1;
//              }); */
           
//             console.log(state)
//         },
//         minus(state) {// "counter/add"
//             return { number: state.number - 1 };
//         }
//     },
//     effects: {
//         *asyncAdd(action, { put }) {
//             yield delay(3000);
//             // throw new Error('我是Counter asyncAdd的错误');
//             yield put({ type: 'add' });
//         }
//     },
//     subscriptions: {
//         changeTitle({ history, dispatch }, done) {
//             history.listen(({ pathname }) => {
//                 document.title = pathname;
//             });
//             //done('我是subscriptions changeTitle changeTitle错误');
//         }
//     }
// });

const Home = (props) => (
    <div>
        <p>Home</p>
        <button onClick={() => props.dispatch(push('/counter'))}>跳到/counter</button>
    </div>
)
const ConnectedHome = connect(
    (state) => state
)(Home);
// const ImmerTest = dynamic({
//     app,
//     models: () => [import(/* webpackChunkName: "ImmerTest" */'./pages/ImmerTest/model.js')],
//     component: () => import(/* webpackChunkName: "ImmerTest" */'./pages/ImmerTest')
// });

// const UsersPage = dynamic({
//     app,
//     models: () => [import(/* webpackChunkName: "users" */'./models/users')],
//     component: () => import(/* webpackChunkName: "users" */'./pages/User')
// });

app.router(({ history, app }) => {

    const renderAsyncRoute = (routes) => {
        return routes.map((route)=> {
            const models = route.models ? () => [import(`./pages/${route.component}/model`)]: ()=>[]
            const component = dynamic({
                app,
                models,
                component: () => import(`./pages/${route.component}`)
            });
            // const component = LazyLoad(()=>import(`./pages/${route.component}`)) ;
            return <Route key={route.key} exact path={route.path} component={component} />
        } )
    }

    return (
            <ConnectedRouter history={history}>
                <>
                    <ul>
                        <li><Link to="/">home</Link></li>
                        <li><Link to="/counter">counter</Link></li>
                        <li><Link to="/immerTest">immerTest</Link></li>
                        <ProxyLink
                            proxyable
                            prompt={(push)=>{
                                if(true){console.log("push");push()}
                            }} 
                            to='/immerTest'
                         >
                             proxy link
                        </ProxyLink>
                        <li><Link to="/users">users</Link></li>
                    </ul>
                    {/* <Route path="/" exact component={ConnectedHome} />
                    <Route path="/counter" component={ConnectedCounter} />
                    <Route path="/immerTest" component={ImmerTest} />
                    <Route path="/users" component={UsersPage} /> */}
                    {renderAsyncRoute(routes)}
                </>
            </ConnectedRouter>
    )

});
app.start('#root');


window.app = app;
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