var success = function(result){
	return {status: {code: 1, desp: ''}, result: result}
};

var fail = function(desp, result, code){
	var _code = code ? code : 0;
	return {status: {code: _code, desp: desp}, result: result}
};

module.exports = {
	success: success,
	fail: fail
};