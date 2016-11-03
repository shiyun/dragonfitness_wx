var express = require('express');
var router = express.Router();
var ApiUtil = require("../util/apiUtil");
var apiUtil = new ApiUtil();
var jsonFormat = require('../util/jsonFormatUtil');

router.get('/', function(req, res, next) {
  res.render('index', { title: '龙健身' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: '龙健身' });
});

router.get('/stores/:storeId', function(req, res, next) {
  var storeId = req.params.storeId;
  if(!storeId){
    res.send(jsonFormat.fail('店铺地址错误'));
  }else{
    req.url = '/API_URL/store/info';
    req.query.storeId = storeId;
    req.method = 'GET';
    req.query.docType = 'true';
    apiUtil.api(req, function(err, resp, body){
      if(err){
        res.send(jsonFormat.fail('店铺地址错误'));
      }else{
        var r = JSON.parse(body);
        if(r.status.code == '1000'){
          res.render('stores', { title: '龙健身', addrInfo: r.result });
        }else{
          res.send(jsonFormat.fail('店铺地址错误'));
        }
      }
    });
  }
});

router.get('/stores2', function(req, res, next) {
  res.render('stores2', { title: '龙健身' });
});

router.get('/map', function(req, res, next) {
  res.render('map', { title: '龙健身' });
});

router.get('/order', function(req, res, next) {
  res.render('order', { title: '龙健身' });
});

router.get('/setting', function(req, res, next) {
  res.render('setting', { title: '龙健身' });
});

router.get('/personHome', function(req, res, next) {
  res.render('personHome', { title: '龙健身' });
});

router.get('/coupon', function(req, res, next) {
  res.render('coupon', { title: '龙健身' });
});

module.exports = router;
