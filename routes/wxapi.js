var express = require('express');
var router = express.Router();
var random = require('../util/random');
var jsonFormat = require('../util/jsonFormatUtil');
var _ = require('lodash');
var request = require('request');
var ApiUtil = require("../util/apiUtil");
var apiUtil = new ApiUtil();

router.get('/getCode', function(req, res, next){
	var stateUrl = decodeURIComponent(req.query.state);
	var code = req.query.code;
	
	if(!code){
		res.send(jsonFormat.fail('获取微信code值失败'));
		return ;
	}
	var OAUTH_URL = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + global.CONFIG.wxInfo.appID + '&secret=' + global.CONFIG.wxInfo.appSecret + '&code=' + code + '&grant_type=authorization_code';

	request.get(OAUTH_URL, function(err, resp, body){
		if(err){
			res.send(jsonFormat.fail('获取微信openid值失败'));
			return;
		}

		var data = JSON.parse(body);
			accessToken = data.access_token,
			openid = data.openid,
			scope = data.scope;

		if (!req.session.loginInfo)
		{
			req.session.loginInfo = {};
		}
		req.session.loginInfo.token = openid;

		req.url = '/API_URL/user/info';
		req.body.token = openid;
		req.query.auth = 'true';
		req.method = 'POST';

		if(scope !== 'snsapi_userinfo'){
			apiUtil.api(req, function(err1, resp1, body1){
				if(err1){
					res.send(jsonFormat.fail('获取用户信息失败'));
				}else{
					console.log('==================='+JSON.stringify(body1));
					var r;
					r = typeof body1 == 'string' ? JSON.parse(body1) : body1;
					if(r.status.code == '1000'){
						req.session.isLogin = 'login';
						req.session.loginInfo.token = r.result.token;
		                req.session.loginInfo.mobilePhone = r.result.mobilePhone;
		                req.session.loginInfo.headimgurl = r.result.headImgUrl;
		                req.session.loginInfo.nickname = r.result.nickname;
		                req.session.loginInfo.serviceExpirTime = r.result.serviceExpirTime;
		                req.session.loginInfo.weekEndHour = r.result.weekEndHour;
		                req.session.loginInfo.serviceEndDays = r.result.serviceEndDays;
		                req.session.loginInfo.weekUseHour = r.result.weekUseHour;
		                req.session.loginInfo.isMember = r.result.isMember;
						res.redirect(stateUrl);
					}else if(r.status.code == '1100'){
						if(stateUrl.indexOf('snsapi_userinfo')>0){
							stateUrl = stateUrl.split('?')[0];
						}
						res.redirect(stateUrl+'?scope=snsapi_userinfo');
					}else if(r.status.code == '1101'){
						var sUrl = stateUrl.split('?')[0];
						req.session.isLogin = '';
						res.redirect('/login?state='+sUrl);
					}else{
						res.send(body1);
					}
				}
			});
		}else{
			var getUserInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + accessToken + '&openid=' + openid + '&lang=zh_CN';

			request.get(getUserInfoUrl, function(err1, resp1, body1){
				if(err1){
					res.send(jsonFormat.fail('获取用户信息失败'));
					return;
				}
				console.log('---------------------------');
				console.log(body1);
				console.log('---------------------------');
				var data = JSON.parse(body1);
				req.body.nickname = data.nickname,
				req.body.sex = data.sex,
				req.body.city = data.city,
				req.body.province = data.province,
				req.body.country = data.country,
				req.body.headimgurl = data.headimgurl;
				req.body.unionid = data.unionid || 'abc';

				req.session.loginInfo.nickname = data.nickname;
				//req.session.loginInfo.sex = data.sex;
				//req.session.loginInfo.city = data.city;
				//req.session.loginInfo.province = data.province;
				//req.session.loginInfo.country = data.country;
				req.session.loginInfo.headimgurl = data.headimgurl;

				req.url = '/API_URL/user/updateUseInfo';

				apiUtil.api(req, function(err2, resp2, body2){
					if(err2){
						res.send(jsonFormat.fail('更新用户信息失败'));
					}else{
						var r;
						r = typeof body2 == 'string' ? JSON.parse(body2) : body2;

						if(r.status.code == '1000'){
							var sUrl = stateUrl.split('?')[0];
							req.session.isLogin = 'login';
							res.redirect(sUrl);
						}else{
							res.send(jsonFormat.fail('更新用户信息失败'));
						}
					}
				});
			});
		}
	});
});

router.get('/wxapi', function (req, res, next) {
    var signature = req.query.signature;
    var echostr = req.query.echostr;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = "dragonfitness";
    oriArray.sort();
    var original = oriArray.join('');
    console.log("Original str : " + original);
    console.log("Signature : " + signature );
    var scyptoString = sha1(original);
    if(signature == scyptoString){
        res.send(echostr);
    }else {
        res.end(jsonFormat.fail('出错啦'));
    }
});

function sha1(str){
    var crypto = require("crypto");
    var md5sum = crypto.createHash("sha1");
    md5sum.update(str);
    str = md5sum.digest("hex");
    return str;
}

module.exports = router;
