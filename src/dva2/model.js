/* eslint-disable @typescript-eslint/no-this-alias */
export const NAMESPACE_SEP = '/';

function prefix(obj, namespace) {
    return Object.keys(obj).reduce((memo, key) => {
        const newKey = `${namespace}${NAMESPACE_SEP}${key}`;
        memo[newKey] = obj[key];
        return memo;
    }, {});
}

// 添加namespace
function prefixNamespace(model) {
    if (model.reducers) {
        model.reducers = prefix(model.reducers, model.namespace);
    }
    if (model.effects) {
        model.effects = prefix(model.effects, model.namespace);
    }
    return model;
}

export default function modelMixin(Dva) {
    Dva.prototype.model = function (model) {
        const dva = this;
        const { namespace } = model;
        if(dva.modelNames.has(namespace)) {return } 
        dva.modelNames.add(namespace)
        const prefixedModel = prefixNamespace(model);//先添加命名空间的前缀
        (dva._models || (dva._models = [])).push(prefixedModel);//把model放在数组里去
        return prefixedModel;
    }
}