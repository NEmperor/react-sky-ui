const hooks = [
    "onEffect",//用来增强effect
    "extraReducers",// 添加额外的reducers
    "onAction",
    "onStateChange",
    "onReducer",
    "extraEnhancers",
    "_handleActions",
    "onError"
]

function getExtraReducers(hook) {//数组 [{key1:reducer1,key2:reducer2},{key3:reducer3,key4:reducer4}]
    return Object.assign({},...hook);
}

function getOnReducer(hook) {
    return function (reducer) {
        for (const reduceEnhancer of hook) {
            reducer = reduceEnhancer(reducer);
        }
        return reducer;
    }
}

/**
 * 把那些不是hooks的属性去掉
 * @param {} options 
 */
export function filterHooks(options) {
    return Object.keys(options).reduce((memo, key) => {
        if (hooks.indexOf(key) > -1) {
            memo[key] = options[key]
        }
        return memo;
    }, {});
}

export default class Plugin {
    constructor() {
        //this.hooks ={onEffect:[],extractReducers:[]}
        this.hooks = hooks.reduce((memo, key) => {
            memo[key] = [];
            return memo;
        }, {});
    }
    
    use(plugin) {
        const { hooks } = this;
        for (const key in plugin) {//plugin={ onAction: createLogger() }
            if (key === 'extraEnhancers') {
                hooks[key] = plugin[key];
            } else if (key === '_handleActions') {
                this._handleActions = plugin[key];
            } else {
                hooks[key].push(plugin[key]);
            }
        }
    }
    get(key) { 
        const { hooks } = this;
        if (key === 'extraReducers') {
            return getExtraReducers(hooks[key]);
        } else if (key === "onReducer") {
            return getOnReducer(hooks[key]);
        } else {
            return hooks[key];
        }
    }
}


