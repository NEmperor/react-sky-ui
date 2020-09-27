/* eslint-disable @typescript-eslint/no-this-alias */

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import * as sagaEffects from 'redux-saga/effects';

function getReducer(model, handleActions) {
    const { reducers = {}, state: defaultState } = model;
    // 这里是利用了闭包
    const reducer = function (state = defaultState, action) {
        const reducer = reducers[action.type];//action.type= "counter/add"
        if (reducer) {
            return reducer(state, action);
        }
        return state;
    }

    if (handleActions) {
        return handleActions(reducers, defaultState);
    }
    return reducer;
}

export default function startMixin(Dva){

    Dva.prototype.start = function(container){
        const dva = this;
        const { plugin, initialReducers, options } = dva;

        function createReducer() {
            const reducerEnhancer = plugin.get('onReducer');
            const extraReducers = plugin.get('extraReducers');
            return reducerEnhancer(combineReducers({
                ...initialReducers,
                ...extraReducers
            }));
        }

        function prefixType(type, model) {
            if (type.indexOf('/') === -1) {
                return `${model.namespace}${NAMESPACE_SEP}${type}`;
            } else {
                if (type.startsWith(model.namespace)) {
                    console.error(`Warning: [sagaEffects.put] ${type} should not be prefixed with namespace ${model.namespace}`);
                }
            }
            return type;
        }

        function getWatcher(key, effect, model, onEffect, onError) {
            function put(action) {
                return sagaEffects.put({ ...action, type: prefixType(action.type, model) });
            }
            return function* () {
                if (onEffect) {//onEffect=[onEffect(effect, { put }, model, actionType)]
                    for (const fn of onEffect) {
                        effect = fn(effect, { ...sagaEffects, put }, model, key);
                    }
                }
                //key=counter/asyncAdd   counter/
                yield sagaEffects.takeEvery(key, function* (...args) {
                    try {
                        yield effect(...args, { ...sagaEffects, put });
                    } catch (error) {
                        onError.forEach(fn => fn(error));
                    }
        
                });
            }
        }
    
    
        function getSaga(effects, model) {
            return function* () {
                //key=asyncAdd key=asyncMinus 
                for (const key in effects) {
                    const watcher = getWatcher(key, effects[key], model, plugin.get('onEffect'), plugin.get('onError'));
                    //为什么要调用fork 是因为fork不可单独开一个进程去执行，而不是阻塞当前saga的执行
                    const task = yield sagaEffects.fork(watcher);
                    yield sagaEffects.fork(function* () {
                        yield sagaEffects.take(`${model.namespace}/@@CANCEL_EFFECTS`);
                        yield sagaEffects.cancel(task);
                    });
                }
            }
        }
    
        function getSagas(dva) {
            const sagas = [];
            for (const model of dva._models) {
                //把effects对象变成一个saga
                sagas.push(getSaga(model.effects, model, plugin.get('onEffect')));
            }
            return sagas;
        }
    
        function runSubscription(subscriptions = {}) {
            for (const key in subscriptions) {
                const subscription = subscriptions[key];
                subscription({ dispatch: dva._store.dispatch }, error => {
                    const onError = plugin.get('onError');
                    onError.forEach(fn => fn(error));
                });
            }
        }

        for (const model of dva._models) {
            dva.initialReducers[model.namespace] = getReducer(model, plugin._handleActions);
        }

        const rootReducer = createReducer();

        const sagas = getSagas(dva);

        const sagaMiddleware = createSagaMiddleware();
        const extraMiddlewares = plugin.get('onAction');
        const extraEnhancers = plugin.get('extraEnhancers');

        //applyMiddleware返回值是一个enhancer,增加createStore
        const enhancers = [...extraEnhancers, applyMiddleware(sagaMiddleware, ...extraMiddlewares)];
        const store = createStore(rootReducer, options.initialState, compose(...enhancers));
        dva._store = store;


        const onStateChange = plugin.get('onStateChange');
        store.subscribe(() => {
            onStateChange.forEach(listener => listener(store.getState()))
        });

        for (const model of dva._models) {
            runSubscription(model.subscriptions);
        }

        sagas.forEach(sagaMiddleware.run);
        ReactDOM.render(
            <Provider store={dva._store}>
                {dva._router({ dva })}
            </Provider>
            , document.querySelector(container));
        
        const model = Dva.prototype.model.bind(dva);    
        Dva.prototype.model = function (m) {
            m = model(m);  // 当namespace已经存在时，返回值是undefiend
            if(!m) return ; 
            initialReducers[m.namespace] = getReducer(m, plugin._handleActions);

            store.replaceReducer(createReducer());//用新的reducer替换掉老的reducer,派发默认动作，会让reducer执行，执行过完后会给 users赋上默认值
            if (m.effects) {
                sagaMiddleware.run(getSaga(m.effects, m));
            }
            if (m.subscriptions) {
                runSubscription(m.subscriptions);
            }
        }

    }
}