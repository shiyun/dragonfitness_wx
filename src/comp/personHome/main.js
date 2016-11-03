var init = function () {
    if(!ajax) var ajax = new AJAX();
    if(!_util) var _util = new Util();
    if(!ui) var ui = new UI();

	var isPass = _util.authPass();

	if(!isPass) return;
};

$(function () {
    init && init()
});