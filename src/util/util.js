var Util = function () {
    var isEmail = function (emailStr) {
        var emailPat=/^(.+)@(.+)\.(.+)$/;
        //var matchArray=emailStr.match(emailPat);
        var matchArray2=emailPat.test(emailStr);
        return matchArray2;
        /*
        if (matchArray==null) {
            return false;
        }
        return true;*/
    };

	//验证身份证
	var isCardNo = function(cardNum){
		var cardPat = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
		return cardPat.test(cardNum);
	};

	//验证多少位数
	var isLenNum = function(arg, num){
		var reg = eval("/^\\d{"+num+"}$/");
		return reg.test(arg);
	};

	var isBankCard = function(arg){
		var reg = eval("/^\\d{15,20}$/");
		return reg.test(arg);
	};

    var isPhone = function(phone){
        return phone.match(/^[1](\d{10})$/);
    };

    var isSMSCode = function (code) {
        return code.match(/^\d{6}$/);
    };

	var isEmptyData = function(checkData) {
		if (checkData === '' || checkData === null || checkData === undefined || checkData === 'undefined'){
			return true;
		}
		else {
			return false;
		}
	};

	var getQueryString = function(url) { 
		if(url) { 
			url=url.substr(url.indexOf("?")+1); //字符串截取，比我之前的split()方法效率高 
		} 
		var result = {}, //创建一个对象，用于存name，和value 
			queryString = url || location.search.substring(1), //location.search设置或返回从问号 (?) 开始的 URL（查询部分）。 
			re = /([^&=]+)=([^&]*)/g, //正则，具体不会用 
			m; 
		while (m = re.exec(queryString)) { //exec()正则表达式的匹配，具体不会用 
			result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]); //使用 decodeURIComponent() 对编码后的 URI 进行解码 
		} 
		return result; 
	} 

	var add = function(a, b) {
	    var c, d, e;
	    try {
	        c = a.toString().split(".")[1].length;
	    } catch (f) {
	        c = 0;
	    }
	    try {
	        d = b.toString().split(".")[1].length;
	    } catch (f) {
	        d = 0;
	    }
	    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
	};
	 
	var sub = function (a, b) {
	    var c, d, e;
	    try {
	        c = a.toString().split(".")[1].length;
	    } catch (f) {
	        c = 0;
	    }
	    try {
	        d = b.toString().split(".")[1].length;
	    } catch (f) {
	        d = 0;
	    }
	    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
	};
	 
	var mul = function (a, b) {
	    var c = 0,
	        d = a.toString(),
	        e = b.toString();
	    try {
	        c += d.split(".")[1].length;
	    } catch (f) {}
	    try {
	        c += e.split(".")[1].length;
	    } catch (f) {}
	    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
	};
	 
	var div = function (a, b) {
	    var c, d, e = 0,
	        f = 0;
	    try {
	        e = a.toString().split(".")[1].length;
	    } catch (g) {}
	    try {
	        f = b.toString().split(".")[1].length;
	    } catch (g) {}
	    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
	};

	var isWX = function(){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") return true;
		return false;
	};

	var goWXUrl = function(appid, type, url){ //type: snsapi_base or snsapi_userinfo
		url = url || location.href;
		url = encodeURIComponent(url);
		type = type || 'snsapi_userinfo';
		if(!isWX()) return;
		location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appid +'&redirect_uri=https://wechat.alpha.dragonfitness.cn/wx/getCode&response_type=code&scope='+ type +'&state='+url+'#wechat_redirect';
	};

	var authPass = function(){
		var appID = $('#appID').val();
		var isLogin = $('#isLogin').val();

		var params = getQueryString(),
			scope = params.scope;

		if(isLogin !== 'login'){
			if(!scope){
				goWXUrl(appID, 'snsapi_base');
			}else{
				goWXUrl(appID, scope);
			}
			return false;
		}else{
			return true;
		}
	};

    return {
        isEmail:isEmail,
        isPhone:isPhone,
        isSMSCode:isSMSCode,
		isCardNo: isCardNo,
		isLenNum: isLenNum,
		isEmptyData: isEmptyData,
		add: add,
		sub: sub,
		mul: mul,
		div: div,
		getQueryString: getQueryString,
		isBankCard:isBankCard,
		isWX: isWX,
		authPass: authPass
    };
};
