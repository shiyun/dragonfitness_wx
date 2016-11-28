var ajax = new AJAX();
var tel = $("#tel").val();//'13123456121';
var createNumRand = function(n){
	var str = '';
	for(var i=0; i<n; i++){
		str+=Math.floor(Math.random()*10);
	}
	return str;
};

//token = 'ohimWxMQdkMA-fiJrpkGPv4CIU2s';
token = 'o4EmiwVbpNs2uKkN1GowimhWcWHs';

//tel = '15355'+createNumRand(6);
QUnit.test("USER_INFO 接口测试", function(assert) {
    var done = assert.async();
	ajax.post(ajax.api.USER_INFO,
		{token: token},
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "USER_INFO 失败" );
			done();
		},{auth: true});	   
});
/*
QUnit.test("USER_INFO 接口测试", function(assert) {
    var done = assert.async();
	ajax.post(ajax.api.USER_INFO,
		{},
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "USER_INFO 失败" );
			done();
		});	   
});

QUnit.test("UPDATE_PHONE 接口测试", function(assert) {
    var done = assert.async();

	var tel = '15355'+createNumRand(6); 

	ajax.post(ajax.api.UPDATE_PHONE,
		{newPhone: tel, verifyCode: '333333'},
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "UPDATE_PHONE 失败" );
			done();
		});	   
});

QUnit.test("COUPON_LIST 接口测试", function(assert) {
    var done = assert.async();

	ajax.post(ajax.api.COUPON_LIST,
		{},
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "COUPON_LIST 失败" );
			done();
		});	   
});

QUnit.test("COUPON_EXCHANGE 接口测试", function(assert) {
    var done = assert.async();

	ajax.post(ajax.api.COUPON_EXCHANGE,
		{exchangeNo: '3234'},
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "COUPON_EXCHANGE 失败" );
			done();
		});	   
});

QUnit.test("PAY_ORDER 接口测试", function(assert) {
    var done = assert.async();

	ajax.post(ajax.api.PAY_ORDER,
		{months: '2', payType: 'wxpay_js', couponNo: '3234'}, //目前只有 wxpay_js
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "PAY_ORDER 失败" );
			done();
		});	   
});

QUnit.test("UPDATE_USEINFO 接口测试", function(assert) {
    var done = assert.async();
	ajax.post(ajax.api.UPDATE_USEINFO,
		{"token":"ohimWxMQdkMA-fiJrpkGPv4CIU2s","nickname":"施云","sex":1,"city":"浦东新区","province":"上海","country":"中国","headimgurl":"http://wx.qlogo.cn/mmopen/OguuW2VqIsJnPGQkSDvEbW9XqtUvUu1icHybKYnIFAIZZfaSnEDLuqbdiarU6WIibLVge1JyQRPG5Dtfiaj5KFLp9rHjSol7G9iax/0","unionid":"abc","channelId":"1001","apiVersion":"1.0","appVersion":"1.0","clientEnv":"WX","osType":"1"},
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "UPDATE_USEINFO 失败" );
			done();
		},{auth: true});	   
});


QUnit.test("SENDSMS 接口测试", function(assert) {
    var done = assert.async();
	ajax.post(ajax.api.SENDSMS, 
		{mobilePhone: '13524858581', action:'login'}, //login exchange
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "SENDSMS 失败" );
			done();
		}, {auth: true});	   
});

QUnit.test("LOGIN 接口测试", function(assert) {
    var done = assert.async();
	ajax.post(ajax.api.LOGIN,
		{mobilePhone: '13524858581', verifyCode:'963206', "token":"ohimWxMQdkMA-fiJrpkGPv4CIU2s"},
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "LOGIN 失败" );
			done();
		}, {auth: true});
});

QUnit.test("SENDSMS 接口测试", function(assert) {
    var done = assert.async();
	ajax.post(ajax.api.SENDSMS, 
		{mobilePhone: '15000799400', action:'exchange'}, //login exchange
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "SENDSMS 失败" );
			done();
		}, {auth: true});	   
});


QUnit.test("UPDATE_PHONE 接口测试", function(assert) {
    var done = assert.async();

	ajax.post(ajax.api.UPDATE_PHONE,
		{newPhone: '15000799400', verifyCode: '339739', "token":"ohimWxMQdkMA-fiJrpkGPv4CIU2s"},
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "UPDATE_PHONE 失败" );
			done();
		}, {auth: true});	   
});

QUnit.test("COUPON_LIST 接口测试", function(assert) {
    var done = assert.async();

	ajax.post(ajax.api.COUPON_LIST,
		{ "token":"ohimWxMQdkMA-fiJrpkGPv4CIU2s"},
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "COUPON_LIST 失败" );
			done();
		}, {auth: true});	   
});

QUnit.test("COUPON_EXCHANGE 接口测试", function(assert) {
    var done = assert.async();

	ajax.post(ajax.api.COUPON_EXCHANGE,
		{exchangeNo: '3234'},
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "COUPON_EXCHANGE 失败" );
			done();
		}, {auth: true});	   
});

QUnit.test("USER_INFO 接口测试", function(assert) {
    var done = assert.async();
	ajax.post(ajax.api.USER_INFO,
		{"token":"ohimWxMQdkMA-fiJrpkGPv4CIU2s"},
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "USER_INFO 失败" );
			done();
		}, {auth: true});	   
});

QUnit.test("COUPON_EXCHANGE 接口测试", function(assert) {
    var done = assert.async();

	ajax.post(ajax.api.COUPON_EXCHANGE,
		{exchangeNo: 'D02q43yHmb', token: token},
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "COUPON_EXCHANGE 失败" );
			done();
		}, {auth: true});	   
});


QUnit.test("COUPON_LIST 接口测试", function(assert) {
    var done = assert.async();

	ajax.post(ajax.api.COUPON_LIST,
		{ "token":token},
		function(response){
			renderCouponList(response.result.coupons);
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "COUPON_LIST 失败" );
			done();
		}, {auth: true});	   
});

function renderCouponList(data){
		if(_.isArray(data)){
			var _html = '';
			_.map(data, function(v, k){
				var cname = '', className = '';
				cname = v.scope == '1,2' ? '通用优惠券' : '入会减免券';
				className = v.scope == '1,2' ? 'q1' : 'q2';
				_html +='<li class="'+className+'">'+
						'	<span class="couponNum">ID:'+ v.code +'</span>'+
						'	<div class="couponInfo">'+
						'		<p class="f36 mb5"><span class="bigCouponNum">'+v.amount+'</span>元</p>'+
						'		<p class="f24 mb10">'+ cname +'</p>'+
						'	</div>'+
						'	<p class="expiryDate">有效期至'+ v.endTime +'</p>	'+
						'</li>';
			});
			
		}else{
			ui.promptLayer({
	            tsinfo: '优惠券信息错误',
	            btxt2: ''
	        });
		}
		$('body').append(_html);
	}

QUnit.test("PAY_ORDER_INIT 接口测试", function(assert) {
    var done = assert.async();

	ajax.post(ajax.api.PAY_ORDER_INIT,
		{ "token":token},
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "PAY_ORDER_INIT 失败" );
			done();
		}, {auth: true});	   
});

QUnit.test("STORE_INFO 接口测试", function(assert) {
    var done = assert.async();

	ajax.post(ajax.api.STORE_INFO,
		{storeId: 1}, //目前只有 wxpay_js
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "STORE_INFO 失败" );
			done();
		}, {docType: true});	   
});

QUnit.test("PAY_ORDER 接口测试", function(assert) {
    var done = assert.async();

	ajax.post(ajax.api.PAY_ORDER,
		{months: '1', payType: 'wxpay_js', couponNo: '', token: token, openId: token}, //目前只有 wxpay_js
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "PAY_ORDER 失败" );
			done();
		}, {auth: true});	   
});
*/

QUnit.test("UPDATEINFO 接口测试", function(assert) {
    var done = assert.async();
	ajax.post(ajax.api.UPDATEINFO,
		{token: token},
		function(response){
			assert.ok(true, JSON.stringify(response));
			done();			
		},
		function(err){
			assert.ok(false, "UPDATEINFO 失败" );
			done();
		},{auth: true});	   
});

