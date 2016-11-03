var setSession = function(req, body){
	req.session.loginInfo = body.userInfo ? body.userInfo : {};
	req.session.loginInfo.accessToken = body.accessToken;
}

module.exports = setSession;