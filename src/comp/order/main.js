var init = function () {
    if(!ajax) var ajax = new AJAX();
    if(!_util) var _util = new Util();
    if(!ui) var ui = new UI();

	var isPass = _util.authPass();

	if(!isPass) return;

	var token = $('#token').val(),
		isMember = 0,
		selectChoseMon = $('#selectChoseMon'),
		selectChoseMon2 = $('#selectChoseMon2'),
		basePrice = $('.basePrice'),
		discountNum = $('.discountNum'),
		monNum = $('.monNum'),
		moneyNum = $('.moneyNum'),
		nowPriceWrap = $('.nowPrice'),
		oPriceWrap = $('.oPrice'),
		nowPrice = 0,
		oPrice = 0,
		months = 1,
		couponNo = '',
		memberPriceWrap = $('.memberPrice'),
		memberPrice = 0;

	ajax.post(ajax.api.PAY_ORDER_INIT,
		{ "token":token},
		function(response){
			if(response.status.code == '1000'){
				memberPriceWrap.html(response.result.memberInfo.discountPrice);
				memberPrice = response.result.memberInfo.discountPrice;		
				discountNum.html(response.result.serviceInfo[0].discount);
				moneyNum.html(response.result.serviceInfo[0].discountPrice);
				renderSerivceSelectList(response.result.serviceInfo);
				renderCouponSelectList(response.result.coupons);
				countPrice();
			}else if(response.status.code == '1101'){
				location.href = '/login';
			}else if(response.status.code == '1100'){
				ajax.post(ajax.api.LOGOUT,{},function(data){window.location.reload();}, function(err){window.location.reload();});
			}else{
				ui.promptLayer({
	                tsinfo: '获取打折信息失败',
	                btxt2: ''
	            });
			}		
		},
		function(err){
			ui.promptLayer({
                tsinfo: '获取打折信息失败',
                btxt2: ''
            });
		}, {auth: true});	

	selectChoseMon.on('change', function(){
		var opt = $(this).find('option:selected'),
			discountVal = opt.data('discount'),
			val = opt.val();
		months = opt.text();
		discountNum.html(discountVal);
		moneyNum.html(val);
		countPrice();
	});

	selectChoseMon2.on('change', function(){
		var opt = $(this).find('option:selected');
		couponNo = opt.data('code');
		countPrice();
	});

	$('.submitOrder').on('click', function(){
		ajax.post(ajax.api.PAY_ORDER,
			{months: months, payType: 'wxpay_js', couponNo: couponNo, token: token, openId: token}, //目前只有 wxpay_js
			function(response){
				console.log(response);
				if(response.status.code == '1000'){
					callpay(JSON.parse(response.result.payUrl));
				}else{
					ui.promptLayer({
						tsinfo: '支付失败~',
						btxt2: ''
					});
				}
			},
			function(err){
				ui.promptLayer({
					tsinfo: '支付失败！',
					btxt2: ''
				});
			}, {auth: true});
	});

	function renderSerivceSelectList(data){
		if(_.isArray(data)){
			var _html = '';			
			_.map(data, function(v, k){
				if(k === 0){
					_html +='<option selected value="'+ v.discountPrice +'" data-discount="'+ v.discount +'" data-totalprice="'+ v.totalPrice +'">'+ v.months +'</option>';
				}else{
					_html +='<option value="'+ v.discountPrice +'" data-discount="'+ v.discount +'" data-totalprice="'+ v.totalPrice +'">'+ v.months +'</option>';					
				}
			});
			selectChoseMon.html(_html);
		}else{
			ui.promptLayer({
	            tsinfo: '获取打折信息错误',
	            btxt2: ''
	        });
		}
	}

	function renderCouponSelectList(data){
		if(_.isArray(data)){
			var _html = '';
			_.map(data, function(v, k){
				var cname = '', className = '';
				if(v.scope == '1,2'){
					className = 'q1';
					cname = '通用优惠券';
				}else if(v.scope == '1'){
					className = 'q2';
					cname = '入会减免券';
				}else{
					className = 'q3';
					cname = '会员减免券';
				}
				if(k === 0){
					_html +='<option selected value="'+ v.amount +'" data-code="'+ v.code +'" data-scope="'+ v.scope +'">'+ v.name +'</option>';
					couponNo = v.code;
				}else{
					_html +='<option value="'+ v.amount +'" data-code="'+ v.code +'" data-scope="'+ v.scope +'">'+ v.name +'</option>';
				}
			});
			selectChoseMon2.html(_html);
		}else{
			ui.promptLayer({
	            tsinfo: '优惠券信息错误',
	            btxt2: ''
	        });
		}
	}

	function countPrice(){
		var opt = selectChoseMon2.find('option:selected'),
			scope = opt.data('scope'),
			amount = opt.val(),
			prices = parseInt(moneyNum.html());

		switch(scope){
			case '1':
				if(amount > memberPrice){
					memberPrice = 0;
				}else{
					memberPrice = memberPrice - amount;
				}
				nowPrice = memberPrice + prices;
				break;
			case '2':
				if(amount > prices){
					prices = 0;
				}else{
					prices = prices - amount;
				}
				nowPrice = memberPrice + prices;
				break;
			case '1,2':
				if(amount > (prices + memberPrice)){
					nowPrice = 0;
				}else{
					nowPrice = (prices + memberPrice) - amount;
				}
				break;
		}
		nowPriceWrap.html(nowPrice);
		oPrice = parseInt(prices+memberPrice);
		oPriceWrap.html(oPrice);
		//console.log(nowPrice, oPrice);
	}

	function callpay(data){
		console.log(typeof data);
		console.log(data);
		wx.config({
			debug: false,
			appId: data.appId,
			timestamp: data.timeStamp,
			nonceStr: data.nonceStr,
			signature: data.paySign,
			jsApiList: [
				'chooseWXPay'
			]
		});
		wx.ready(function () {
			wx.chooseWXPay({
				timestamp: data.timeStamp,
				nonceStr: data.nonceStr,
				package: data.package,
				signType: data.signType,
				paySign: data.paySign,
				success: function (res) {
					ui.promptLayer({
						tsinfo: '支付成功',
						btxt2: ''
					});
				},
				fail: function () {
					ui.promptLayer({
						tsinfo: '支付失败。',
						btxt2: ''
					});
				}
			});
		});
	}	
};

$(function () {
    init && init()
});