import { delay } from '@/utils';

export default {
    namespace: 'counter',
    state: { number: 0 },
    reducers: {
        add(state) {// "counter/add"
            state.number+=1
        },
        minus(state) {// "counter/add"
            return { number: state.number - 1 };
        }
    },
    effects: {
        *asyncAdd(action, { put }) {
            yield delay(3000);
            // throw new Error('我是Counter asyncAdd的错误');
            yield put({ type: 'add' });
        }
    },
    subscriptions: {
        changeTitle() {
            // history.listen(({ pathname }) => {
            //     document.title = pathname;
            // });
            
        }
    }
}