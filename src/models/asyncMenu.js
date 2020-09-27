
import { stringify } from 'querystring';
import asyncRoute from '@/router/asyncRoute'


export default {
  namespace: 'asyncMenu',
  state: {
    asyncRouter: [],
  },
  effects: {
    
  },
  reducers: {
    saveMenu(state){
        state.asyncRouter = [{
            path: '/apiroute',
            key: 'apiroute',
            name: '异步路由',
            component: asyncRoute.AsyncRouteOne
        }]
    }
  },
};
