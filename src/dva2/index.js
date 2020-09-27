import initMixin from './init';
import modelMixin from './model';
import startMixin from './start'

export default function Dva(options){
    this._init(options)
}

initMixin(Dva)
modelMixin(Dva)
startMixin(Dva)

Dva.prototype.router = function(router){
    this._router = router;
}


