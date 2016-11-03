var baseInfo = function (req, res, next) {
    var _render = res.render;
    res.render = function (template,data) {
        if(!data)data={};
        if(typeof req.session != 'undefined' && typeof req.session.loginInfo != 'undefined' ){
            data.loginInfo = req.session.loginInfo;
        }
		if (req.session.isLogin){
			data.isLogin = req.session.isLogin;
		}
		data.appID = global.CONFIG.wxInfo.appID;
        return  _render.apply(res, [template,data]);
    };
    next();
}
module.exports = baseInfo;