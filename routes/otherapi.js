var express = require('express');
var router = express.Router();
var _ = require('lodash');
var ApiUtil = require("../util/apiUtil");
var apiUtil = new ApiUtil();
var random = require('../util/random');
var jsonFormat = require('../util/jsonFormatUtil');

router.post('/login', function(req, res, next){
	req.url = '/API_URL/user/login';
    req.method = 'POST';

    apiUtil.api(req, function(err, resp, body){
        if(err){
                res.send(jsonFormat.fail('获取用户信息失败'));
        }else{
            var r;
            r = typeof body == 'string' ? JSON.parse(body) : body;
            console.log(r);
            if(!req.session.loginInfo) {
                req.session.loginInfo = {};
            }
            if(r.status.code === '1000'){
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
            }
            res.send(body);
        }
    });
});

router.post('/update', function(req, res, next){
    req.url = '/API_URL/user/info';
    req.query.auth = 'true';
    
    console.log(req.url);
    req.method = 'POST';

    apiUtil.api(req, function(err1, resp1, body1){
        if(err1){
            res.send(jsonFormat.fail('获取用户信息失败'));
        }else{
            console.log('==================='+JSON.stringify(body1));
            var r;
            r = typeof body1 == 'string' ? JSON.parse(body1) : body1;
            console.log(r.result.token);
            if(r.status.code == '1000'){
                req.session.isLogin = 'login';
                if(!req.session.loginInfo) req.session.loginInfo = {};
                req.session.loginInfo.token = r.result.token;
                req.session.loginInfo.mobilePhone = r.result.mobilePhone;
                req.session.loginInfo.headimgurl = r.result.headImgUrl;
                req.session.loginInfo.nickname = r.result.nickname;
                req.session.loginInfo.serviceExpirTime = r.result.serviceExpirTime;
                req.session.loginInfo.weekEndHour = r.result.weekEndHour;
                req.session.loginInfo.serviceEndDays = r.result.serviceEndDays;
                req.session.loginInfo.weekUseHour = r.result.weekUseHour;
                req.session.loginInfo.isMember = r.result.isMember;
                res.send(body1);
            }else if(r.status.code == '1101'){
                req.session.isLogin = '';
                res.redirect('/login?state='+sUrl);
            }else{
                res.send(body1);
            }
        }
    });
});

module.exports = router;

