/**
 * 自定义事件基类<br/>
 * @class EventEmitter
 */
var EventEmitter = function(){
    this.events = [];
};
/**
 * 添加监听事件
 * @method addEventListener
 * @param {String} type 事件名
 * @param {Function} callback 执行函数
 * @return void
 */
EventEmitter.prototype.addEventListener = function(type, callback){
    this.events.push({type:type, callback:callback});
};
/**
 * 派发事件
 * @method dispatchEvent
 * @param {String} type 事件名
 * @param {Object} data 事件数据
 * @return void
 */
EventEmitter.prototype.dispatchEvent = function (type, data) {
    for(var i=0; i<this.events.length; i++){
        if(this.events[i].type == type){
            this.events[i].callback.apply(this,[data]);
        }
    }
};