var express = require('express');
var router = express.Router();
var random = require('../util/random');
var jsonFormat = require('../util/jsonFormatUtil');
var _ = require('lodash');
var request = require('request');
var ApiUtil = require("../util/apiUtil");
var apiUtil = new ApiUtil();

router.get('/getCode', function(req, res, next){
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
		console.log('---------------------------');
		console.log(body);
		console.log('---------------------------');		

		var accessToken = body.access_token,
			openid = body.openid;
		
		req.url = '/API_URL/user/info';
		req.body.token = openid;
		req.query.auth = 'true';
		req.method = 'POST';

		apiUtil.api(req, function(err1, resp1, body1){
			if(err1){
				res.send(jsonFormat.fail('获取用户信息失败'));
			}else{
				var r = JSON.parse(body1);
				if(r.status.code == '1000'){
					res.send(jsonFormat.success(body1));
				}else{
					res.send(jsonFormat.fail('获取用户信息失败'));
				}
			}
		});

		/*
		var getUserInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + accessToken + '&openid=' + openid + '&lang=zh_CN';

		request.get(OAUTH_URL, function(err2, resp2, body2){
			if(err2){
				res.send(jsonFormat.fail('获取用户信息失败'));
				return;
			}
			console.log('---------------------------');
			console.log(body2);
			console.log('---------------------------');
			res.send(body2);
		});
		*/

	});
	//res.redirect('');
});
/*
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx15cb7d040fb7c103&redirect_uri=https://api.alpha.dragonfitness.cn/wechat/core&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx15cb7d040fb7c103&redirect_uri=https://api.alpha.dragonfitness.cn/wechat/core&response_type=code&scope=snsapi_base&state=1#wechat_redirect
返回的url里获取获取code
001dBfZS1vuyy91WWZ0T1bhfZS1dBfZq
https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx15cb7d040fb7c103&secret=8cd1ed2301d98e5774feb9bbca8a9f7f&code=001dBfZS1vuyy91WWZ0T1bhfZS1dBfZq&grant_type=authorization_code
{"access_token":"nzxaImQNQ07wNfyjRKGLSpkTtPf1J_2xUIsd2p_6V2Ta0UJXi8PB1JgOuRuHHghY-kuiREWM9VjqAqKGtrqYTcjwTFI0nqQxFczGbhUWHDA","expires_in":7200,"refresh_token":"15bbFPf8ZA7HRlWonRrlmWo0HxsONq2JoTzG3-Fpt8kOZTAHEYjUe1P76cnT2xItxeR115TxVFweNOFIUTFOrT3-ALIs0mTk1Z2JWfH9u30","openid":"oTymMvwfPB91tEGUNK81vDiB3cQE","scope":"snsapi_userinfo"}
https://api.weixin.qq.com/sns/userinfo?access_token=nzxaImQNQ07wNfyjRKGLSpkTtPf1J_2xUIsd2p_6V2Ta0UJXi8PB1JgOuRuHHghY-kuiREWM9VjqAqKGtrqYTcjwTFI0nqQxFczGbhUWHDA&openid=oTymMvwfPB91tEGUNK81vDiB3cQE
*/

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
