/**
 * 列表基类<br/>
 * 数据加载完毕，派发事件 DataLoaded
 * @class Pager
 * @param {Object} options  其他参数，可以传入页码和每页的大小，例如：{pageNow:1, pageSize:10}
 */
var Pager = function(options) {
    EventEmitter.apply(this) ;
    this.pageNow = 1;
    this.pageSize = 10;
    this.options = {
        pageNow:1,
        pageSize:10
    };
    if(options){
        if(options.pageNow) {
            this.options.pageNow = options.pageNow;
            this.pageNow = options.pageNow;
        }
        if(options.pageSize) {
            this.options.pageSize = options.pageSize;
            this.pageSize = options.pageSize;
        }
    }
};
function F(){}
F.prototype = EventEmitter.prototype ;
Pager.prototype = new F();
/**
 * 列表初始化，具体类具体实现
 * @method init
 * @return void
 */
Pager.prototype.init = function () {
    this.getData = function(){};
    this.getData();
};
/**
 * 下一页
 * @method nextPage
 * @return void
 */
Pager.prototype.nextPage = function(){
    if(this.pageNow < this.pageCount){
        this.pageNow++;
        this.getData();
    }
};
/**
 * 上一页
 * @method prevPage
 * @return void
 */
Pager.prototype.prevPage = function(){
    if(this.pageNow > 1) {
        this.pageNow--;
        this.getData();
    }
};
/**
 * 跳转到某页
 * @method gotoPage
 * @param {Number} pageIndex 页码
 * @return void
 */
Pager.prototype.gotoPage = function(pageIndex){
    if(pageIndex <= this.pageCount){
        this.pageNow = pageIndex;
        this.getData();
    }
};
/**
 * 是否还有下一页
 * @method hasNext
 * @return bool
 */
Pager.prototype.hasNext = function(){
    return this.pageNow < this.pageCount;
};
/**
 * 是否还有上一页
 * @method hasPrev
 * @return bool
 */
Pager.prototype.hasPrev = function () {
    return this.pageNow > 1;
};

Pager.prototype.refresh = function () {
    this.getData();
};