var request = require('request');
var _ = require('lodash');
var md5 = require('./md5util');
var aesutil = require('./aesutil');

function ApiUtil(){}

ApiUtil.prototype.serverUrl = function(req){
	req.dataCont = {};
	var url = req.url.split("/");
	if(url.length < 3){
		res.send({header:{status:0},body:{msg:"接口请求路径有误"}});
		return;
	}
	var method = req.method;

	req.dataCont.server = url[1];
	req.dataCont.api = url[2];
	if(url.length > 3){
		if(url[3] == "p"){
			req.dataCont.method = "POST";
		}else if(url[3] == "g"){
			req.dataCont.method = "GET";
		}else{
			req.dataCont.method = "POST";
			url.splice(0,2);
			req.dataCont.api = url.join("/");
		}

	}else{
		req.dataCont.method = "POST";
	}
	if(method == "POST"){
		req.dataCont.data = {data:req.body};
		req.dataCont.method = "POST";
	}else{
		req.dataCont.data = {data:req.query};
		req.dataCont.method = "GET";
	}
	//console.log("api url:" + req.dataCont.api);
	//console.log("full url:" + global.CONFIG[req.dataCont.server] + req.dataCont.api);
}

ApiUtil.prototype.dataCont = function(req){
	//兼容微信进来的用户，如果有openid则添加
	if(req.session && req.session.openId){
		req.dataCont.data.data.openId = req.session.openId;
	}
	req.dataCont.data.data.apiVersion = global.CONFIG.apiVersion;
	req.dataCont.data.data.appVersion = global.CONFIG.appVersion;
	req.dataCont.data.data.clientEnv = global.CONFIG.clientEnv;
	req.dataCont.data.data.osType = global.CONFIG.osType;
	req.dataCont.data.data.channelId = global.CONFIG.channelId;
	//req.dataCont.data.data.appId = global.CONFIG.APPID;
}

ApiUtil.prototype.auth = function(req){
	var nonce = md5.md5Sign(req.headers['user-agent'] + req.dataCont.api + Date.parse(new Date()));
	if(req.query && req.query.auth == 'true'){
		var signString = '';
		var codeArray = new Array();		

		//req.dataCont.data.data["appId"] = global.CONFIG.APPID;
		if(req.session.token){
			req.dataCont.data.data["token"] = req.session.token;
		}

		_.forEach(req.dataCont.data.data, function(v,k){
			codeArray.push(k);
		});
		codeArray.sort();
		_.uniq(codeArray);	
		_.forEach(codeArray, function(k){
			var code = k;
			signString += (signString != '' ? '&' : '') + code + '=' + req.dataCont.data.data[code];
		});
		signString += "&appKey=" + global.CONFIG.appKey;
		if((!req.query.noSecureKey || req.query.noSecureKey != "true") && req.session.loginInfo && req.session.loginInfo.aesKey){
			if(signString) signString += "&";
			signString += "secureKey=" + req.session.loginInfo.aesKey;
		}
		console.log('signString:' + signString);
		var signStr =  md5.md5Sign(signString);
		req.dataCont.data = {
			data:JSON.stringify(req.dataCont.data.data), appId: global.CONFIG.APPID, nonce:nonce, sign: signStr
		};
	}else{
		req.dataCont.data = {
			data:JSON.stringify(req.dataCont.data.data), appId: global.CONFIG.APPID, nonce:nonce
		};

	}
}

ApiUtil.prototype.encrypt = function (req) {
	var nonce = md5.md5Sign(req.headers['user-agent'] + req.dataCont.api + Date.parse(new Date()));
	if(req.query && req.query.encrypt == 'true'){
		var _secret = global.CONFIG.SECRET;
		req.dataCont.data.data = aesutil.aesEncrypt(JSON.stringify(req.dataCont.data.data), _secret);
		req.dataCont.data = {data: req.dataCont.data.data, appId: global.CONFIG.APPID, nonce: nonce}
	}else{
		req.dataCont.data = {data:req.dataCont.data.data,appId: global.CONFIG.APPID,nonce:nonce};
	}
};

ApiUtil.prototype.docType = function(req){
	if(req.query && req.query.docType == 'true'){
		req.dataCont.data = {};
		if(req.method == 'POST'){
			_.forEach(req.body, function(v, k){
				req.dataCont.data[k] = v;
			});
		}else{
			_.forEach(req.query, function(v, k){
				req.dataCont.data[k] = v;
			});
		}

		req.dataCont.data.channelId = global.CONFIG.APPID;
		req.dataCont.data.token = (typeof req.session != 'undefined' && typeof req.session.loginInfo != 'undefined' && typeof req.session.loginInfo.accessToken != 'undefined') ? req.session.loginInfo.accessToken : '';
	}
}

ApiUtil.prototype.request = function(req, resHandler){
	var options = req.dataCont;
	var url = global.CONFIG[req.dataCont.server] + req.dataCont.api;
	if (options.method == 'POST'){
		console.log('[ POST TO ', url, '] : ', options.data);
		request.post(url, resHandler).form(options.data);
	}else{
		var p = [];
		for (var k in options.data){
			if (typeof options.data[k] == "object"){
				p.push(k + '=' + JSON.stringify(options.data[k]));
			}else{
				p.push(k + '=' + options.data[k]);
			}
		}
		url += '?';
		url += p.join('&');
		console.log('[ GET TO ] : ', url);
		request.get(url, resHandler);
	}
}

ApiUtil.prototype.api = function(req, resHandler){
	this.serverUrl(req);
	this.encrypt(req);
	this.dataCont(req);
	this.auth(req);
	this.docType(req);
	this.request(req,resHandler);
}

module.exports = ApiUtil;
