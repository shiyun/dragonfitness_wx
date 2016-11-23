var AJAX = function(){
    var get = function(url, data, success, error, options){
        ajax(url, "GET", data, success, error, options);
    };
    var post = function(url, data, success, error, options){
        ajax(url, "POST", data, success, error, options);
    };
    var ajax = function(url, type, data, success, error, options){
        var __url = url.indexOf("?") > -1 ? url : url + "?";
        //__url += "nonce=" + Date.parse(new Date()) + "&";
        if(options){
            for (var k in options){
                __url += k + "=" + options[k] + "&";
            }
        }
        var __error = error?error:function(e){
            if(error)error(e);
            else alert(JSON.stringify(e));
        };
        $.ajax({
            type: type,
            url: __url,
            data: data,
            success: success,
            error: __error,
            dataType: "json"
        });
    };
	var API_URL = 'API_URL';
    return {
        get:get,
        post:post,
        ajax:ajax,
        base:{
			API_URL: API_URL
        },
        api:{
            SENDSMS			: '/api/' + API_URL + '/common/verifyCode',
            LOGIN			: '/login',
            LOGOUT			: '/logout',
            USER_INFO		: '/api/' + API_URL + '/user/info',
            UPDATE_PHONE	: '/api/' + API_URL + '/user/updatePhone',
            UPDATE_USEINFO	: '/api/' + API_URL + '/user/updateUseInfo',
            COUPON_LIST		: '/api/' + API_URL + '/coupon/list',
            COUPON_EXCHANGE : '/api/' + API_URL + '/coupon/exchange',
            PAY_ORDER       : '/api/' + API_URL + '/pay/order',
            PAY_ORDER_INIT	: '/api/' + API_URL + '/pay/orderInit',
            STORE_INFO		: '/api/' + API_URL + '/store/info'
        }
    };
}