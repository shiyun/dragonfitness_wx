var jsonFormat = require('./jsonFormatUtil');

var isLogin = function(req, res){
	if(!req.session.loginInfo || (req.session.loginInfo && typeof req.session.loginInfo.accessToken == 'undefined')){
		res.send(jsonFormat.fail('请登录'));
		return false;
	}
	return true;
}

module.exports = isLogin;