var UI = function(){
    if(!ajax) var ajax = new AJAX();
    if(!_util) var _util = new Util();

	//公用弹出层信息
	var promptLayer = function(obj){
		var config = {
            // title: '提示',
			tsinfo: '',
			btxt1: '确定',
			btxt2: '取消',
			successCB: function(){},
			cancelCB: function(){}
		};
		config = $.extend(config, obj);

		var _html = '<div class="overLayer"><div class="overLayerWrap">'+
					'	<div class="promptTxt">' + config.tsinfo + '</div>'+
					'	<p class="tc">';

        if (config.btxt2 !== ''){
            _html += '<span class="btns btnCancel">' + config.btxt2 + '</span>';
        }
		if (config.btxt1 !== ''){
		   _html += '<span class="btns btnSure">' + config.btxt1 + '</span>';
		}
					
		_html +=	'	</p>'+
					'</div></div>';//+
		//			'<div class="shade"></div>';

		$('body').append(_html);
		
		/*
        if (config.btxt1 !== '' && config.btxt2 == ''){
            $('.btnSure').addClass('singleBtn');			
        }
		if (config.btxt2 !== '' && config.btxt1 == ''){
		   	$('.btnCancel').addClass('singleBtn');		   	
		}
		*/
		$('.overLayer').off('click', '.btnSure');
		$('.overLayer').off('click', '.btnCancel');
		$('.overLayer').on('click', '.btnSure', function(){
			if (typeof config.successCB == 'function'){
				config.successCB();
				$('.overLayer,.shade').remove();
			}
		});

		$('.overLayer').on('click', '.btnCancel', function(){			
			if (typeof config.cancelCB == 'function'){
				config.cancelCB();
				$('.overLayer,.shade').remove();
			}
		});
	};

	//滚动到某个节点
	var scrollToForm = function(el,isScroll){
		isScroll = isScroll || true;
		if(isScroll){
			$('html,body').animate({scrollTop: $(el).offset().top},400);		
		}
	};	

	var logout = function(){
		ajax.post(ajax.api.LOGIN_OUT,
		{},
		function(response){
			console.log(response);		
			if(response.status.code == "1"){
				window.location = "/";
			}else{
				alert('退出失败');
			}
		},
		function(err){
			alert('退出失败');
		});
	};
	

	return {
		logout: logout,
		promptLayer: promptLayer,
		scrollToForm: scrollToForm
	};
};
