/* eslint-disable @typescript-eslint/no-this-alias */

import Plugin, { filterHooks } from './plugin';

export default function initMixin(Dva){
    Dva.prototype._init = function(options){

        const dva = this
        dva.options = options
        dva.modelNames = new Set(); // 存储已经添加model的namespace,防止重复添加
        dva._models = [];   // 存储添加了namsspace前缀的model
        dva._router = null;
        dva.initialReducers = {};

        const plugin = new Plugin();
        plugin.use(filterHooks(options));

        dva.plugin = plugin
        dva.use = plugin.use.bind(plugin);
    }
}