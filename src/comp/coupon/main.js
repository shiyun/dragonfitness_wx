var init = function () {
    if(!ajax) var ajax = new AJAX();
    if(!_util) var _util = new Util();
    if(!ui) var ui = new UI();

	var isPass = _util.authPass();

	if(!isPass) return;

	var inpCoupon = $('.inp-coupon'),
		btnCoupon = $('.btn-coupon'),
		token = $('#token').val();

	renderList();	

	btnCoupon.on('click', function(){
		var couNum = $.trim(inpCoupon.val());
		if(couNum == ''){
			ui.promptLayer({
                tsinfo: '请输入您的优惠码',
                btxt2: '',
                successCB: function(){
                	setIinpNull(inpCoupon);
                }
            });
		}else{
			ajax.post(ajax.api.COUPON_EXCHANGE,
				{exchangeNo: couNum, token: token},
				function(response){
					console.log(response);
                    //btnSendCode.prop('disabled', true);
                    if(response.status.code == '1000'){
	                    ui.promptLayer({
	                        tsinfo: '兑换成功',
	                        btxt2: '',
			                successCB: function(){
			                	setIinpNull(inpCoupon);
			                	renderList();
			                }
	                    });	
	                }else{
	                	ui.promptLayer({
	                        tsinfo: response.status.desp,
	                        btxt2: '',
			                successCB: function(){
			                	setIinpNull(inpCoupon);
			                }
	                    });
	                }
				},
				function(err){
					ui.promptLayer({
                        tsinfo: '兑换失败',
                        btxt2: '',
		                successCB: function(){
		                	setIinpNull(inpCoupon);
		                }
                    });
				}, {auth: true});
		}
	});

	function setIinpNull(inp){
		inp.val('').focus();
	}

	function renderList(){
		ajax.post(ajax.api.COUPON_LIST,
		{ "token":token},
		function(response){
			if(response.status.code == '1000'){
				renderCouponList(response.result.coupons);
			}else{
				ui.promptLayer({
	                tsinfo: '获取优惠券信息失败',
	                btxt2: ''
	            });
			}
		},
		function(err){
			ui.promptLayer({
                tsinfo: '获取优惠券信息失败',
                btxt2: ''
            });
		}, {auth: true});
	}

	function renderCouponList(data){
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

				_html +='<li class="'+className+'">'+
						'	<span class="couponNum">ID:'+ v.code +'</span>'+
						'	<div class="couponInfo">'+
						'		<p class="f36 mb5"><span class="bigCouponNum">'+v.amount+'</span>元</p>'+
						'		<p class="f24 mb10">'+ cname +'</p>'+
						'	</div>'+
						'	<p class="expiryDate">有效期至'+ v.endTime +'</p>	'+
						'</li>';
			});
			$('.list-coupon').html(_html);
		}else{
			ui.promptLayer({
	            tsinfo: '优惠券信息错误',
	            btxt2: ''
	        });
		}		
	}

};

$(function () {
    init && init()
});