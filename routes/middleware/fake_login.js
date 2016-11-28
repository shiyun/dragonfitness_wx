var aesUtil = require('../../util/aesutil');
var jsonFormat = require('../../util/jsonFormatUtil');
var ApiUtil = require("../../util/apiUtil");
var apiUtil = new ApiUtil();

var fakeLogin = function(req, res, template, data){
    console.log(req.query.secureKey);
    if(!req.session.loginInfo || (req.session.loginInfo && typeof req.session.loginInfo.token == 'undefined')){
        if(!req.query.secureKey){
            res.send(jsonFormat.fail('未接收到secureKey'));
            return;
        }else if(!req.query.aesKey){
            res.send(jsonFormat.fail('未接收到aesKey'));
            return;
        }else if(!req.query.token){
            res.send(jsonFormat.fail('未接收到token'));
            return;
        }else if(!req.query.accessToken){
            res.send(jsonFormat.fail('未接收到accessToken'));
            return;
        }
        var sKey = req.query.secureKey;
        var aesKey = req.query.aesKey;
        var token = req.query.token;
        var accessToken = req.query.accessToken;
        var s = new Buffer(sKey,'base64').toString();
        //var aesKey = '8PV5VM8EJ6LXYZKA';//require("../util/random").createRand(16);

        if(!req.session.loginInfo){
            req.session.loginInfo = {};
        }
        req.session.loginInfo['token'] = token;
        req.session.loginInfo['accessToken'] = accessToken;
        req.session.loginInfo["aesKey"] = aesUtil.aesDecrypt(s,aesKey);

        req.body.token = token;
        req.query.auth = 'true';
        req.url = "/API_URL/user/personalInfo";
        apiUtil.api(req, function(err,response, body){
            console.log('------------personinfo data: '+body);
            var r = JSON.parse(body);
            var result = r.result;
            req.session.loginInfo["clientId"] = result.clientId;
            req.session.loginInfo["fabaoId"] = result.fabaoId;
            req.session.loginInfo["phone"] = result.phone;
            req.session.loginInfo["email"] = result.email;
            req.session.loginInfo["realName"] = result.realName;
            req.session.loginInfo["cardId"] = result.cardId;

            if (r.status.code == '1000'){
                res.send(jsonFormat.fail('获取个人信息失败'));
            }else{
                res.render(template, data);
            }
        });
    }else{
        res.render(template, data);
    }
}

module.exports = fakeLogin;