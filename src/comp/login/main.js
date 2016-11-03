var init = function () {
    if(!ajax) var ajax = new AJAX();
    if(!_util) var _util = new Util();
    if(!ui) var ui = new UI();
	var btnSendCode = $('.btn-sendSms'),
		phone = $('#inpPhone'),
		smsCode = $('#inpSmsCode'),
		btnSub = $('.btn-login'),
		token = $('#token').val(),
		sendTimer = null,
		t = 60;

	var params = _util.getQueryString(),
		stateUrl = params.state || '/';
	//_util.authPass();
	
	phone.on('blur', checkPhone);

	smsCode.on('blur', checkSmsCode);
	
	btnSendCode.on('click', function(){
		if (checkPhone()){	
			ajax.post(ajax.api.SENDSMS, //发送短信
				{mobilePhone: phone.val(), action:'login'},
				function(response){
					console.log(response);
                    //btnSendCode.prop('disabled', true);
                    if (response.status.code != '1000'){
                        ui.promptLayer({
                            tsinfo: response.status.desp,
                            btxt2: ''
                        });
                        return ;
                    }else{
						btnSendCode.prop('disabled', true);
                        sendTimer = setInterval(function(){
                            t--;
                            if (t == 0){
                                btnSendCode.prop('disabled', false).html('重新发送');
                                t = 60;
                                clearInterval(sendTimer);
                            }else{
                                btnSendCode.html(t+'s');
                            }

                        }, 1000);
                    }
				},
				function(err){
                    ui.promptLayer({
                        tsinfo: '发送短信失败',
                        btxt2: ''
                    });
				}, {auth: true});
		}
	});

	btnSub.on('click', function(){
		if (checkPhone() && checkSmsCode()){
			ajax.post(ajax.api.LOGIN, //登录
				{mobilePhone: phone.val(), verifyCode:smsCode.val(), token: token || "ohimWxMQdkMA-fiJrpkGPv4CIU2s"},
				function(response){
					console.log('login:'+JSON.stringify(response));
                    console.log(response);
                    if (response.status.code == '1000'){
                        location.href = stateUrl;
                    }else{
                        ui.promptLayer({
                            tsinfo: response.status.desp,
                            btxt2: '',
                            successCB:function(){
                                //window.location.reload();
                            }
                        });
                    }
				},
				function(err){
                    ui.promptLayer({
                        tsinfo: '登录失败',
                        btxt2: '',
						successCB: function(){
							//window.location.reload();
						}						
                    });
				}, {auth: true});
		}
	});
	
	function checkPhone(){
		var val = $.trim(phone.val());
		if (!_util.isPhone(val)){
			if ($('body').find('.overLayer').length) return false;
			ui.promptLayer({
				tsinfo: '手机号码格式错误',
				btxt2: ''
			});
			//setErrorInfo(true, '手机号码格式错误');
			return false;
		}
		return true;
		/*else{
			setErrorInfo(false);
			return true;
		}
		*/
	}

	function checkSmsCode(){
		var val = $.trim(smsCode.val());
		if (!_util.isSMSCode(val)){
			if ($('body').find('.overLayer').length) return false;
			ui.promptLayer({
				tsinfo: '验证码格式错误',
				btxt2: ''
			});
			//setErrorInfo(true, '验证码格式错误');
			return false;
		}
		return true;
		/*else{
			setErrorInfo(false);
			return true;
		}
		*/
	}

	function setErrorInfo(isShow, txt){
		txt = txt || '';
		if (isShow){
			errInfo.html(txt).removeClass('hidden');
		}else{
			errInfo.html(txt).addClass('hidden');
		}
	}
	function checkAgree(){
		var check = $("#login_agree");
		if (check.is(":checked")){
			return true;
		}else{
			setErrorInfo(true, '请确认注册协议');
			return false;
		}
	}

};

$(function () {
    init && init()
});