var crypto = require('crypto');
//加密公共密钥 32位
var keys = '9ce62c1836d128cfc875c9026db7564c';
//编码设置
var clearEncoding = 'utf8';
//加密方式
var algorithm = 'aes-256-ecb';
//向量
var iv = "";
//加密类型 base64/hex...
var cipherEncoding = 'hex';

var iv = new Buffer([0xA, 1, 0xB, 5, 0xC, 4, 0xF, 7, 0xD, 9, 0x17, 3, 2, 0xE, 8, 12]);

var aesEncrypt = function(data,secretKey){
	var key = new Buffer(secretKey,"utf-8");
	var cipher = crypto.createCipheriv('aes-128-cbc',key,iv);  //aes-128-ecb
	return cipher.update(data, 'utf8','base64') + cipher.final('base64');
}

var aesDecrypt = function(data, key) {
	var clearEncoding = 'utf8';
	var cipherEncoding = 'base64';
	var cipherChunks = [];
	var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
	decipher.setAutoPadding(true);

	cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
	cipherChunks.push(decipher.final(clearEncoding));
	return cipherChunks.join('');
}

var aesDecrypt2 = function(data, secretKey) {
	var key = new Buffer(secretKey,"utf-8");
	var cipher = crypto.createCipher('aes-128-cbc',key,iv);  //aes-128-ecb
	return cipher.update(data,'base64','utf8') + cipher.final('utf8');
}

var rsaEncrypt = function(data,privatePem){
    var key = privatePem.toString();
    var buf = new Buffer(data);
    var endata = crypto.privateEncrypt({key:key,padding:crypto.RSA_PKCS1_PADDING},buf);
    endata = new Buffer(endata).toString('base64');
    return endata;
}

module.exports = {
	aesEncrypt: aesEncrypt,
	aesDecrypt: aesDecrypt,
	aesDecrypt2: aesDecrypt2,
	rsaEncrypt: rsaEncrypt
}