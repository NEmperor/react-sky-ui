import { delay } from '@/utils';
export default {
    namespace: 'immerTest',
    state: {
        num: 0,
        user:{
            name: "Jack",
            age: 18
        }
    },
    reducers: {
        add(state) {
              return {
                 ...state,
                 num: state.num + 1
             } 
        },

        modifyName(state) {
            return {
               ...state,
               user: {
                   name: " Tom",
                   age: 18
               }
           } 
        },

        modifyAge(state) {
            console.log(state)
            return {
               ...state,
               user:{
                   age: state.user.age + 1,
                   name: state.user.name
               }
           } 
        }
    },
    effects: {
        *asyncAdd(action, { put, call }) {
            yield call(delay, 1000);
            yield put({ type: 'add'});
        }
    },
    subscriptions: {
        something() {
            console.log('我是immerTest something');
        }
    }
}