var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

var createRand = function(n){
	var char = '';
	for (var i=0; i<n; i++){
		char += chars[Math.ceil(Math.random()*35)]
	}
	return char;
};

var createNumRand = function(n){
	var str = '';
	for(var i=0; i<n; i++){
		str+=Math.floor(Math.random()*10);
	}
	return str;
}

module.exports = {
	createRand : createRand,
	createNumRand : createNumRand
};