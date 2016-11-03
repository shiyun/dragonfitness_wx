var fs = require('fs');
var _ = require('lodash');
var rnd = require('./random');
var norender = function(path, callback){
	fs.exists(path, function(exists){
		if(exists){
			fs.readFile(path, 'utf-8', function(err, data){
				//console.log(data);
				callback(data);

			});
		}else{
			console.log('no file');
		}
	});
};

var isEqual = function(v1, v2, options){
	if(v1 == v2){
		return options.fn(this);
	}
	return options.inverse(this);
};

var replaceImg = function(data){
	if(!data){
		return '';
	}else{
		var arr = data.split('|'), _html = '';
		_.forEach(arr, function(v){
			console.log(v);
			_html += '<img src="'+ v +'" width="100%" />';
		});
		return _html;
	}
};

module.exports = {
	isEqual: isEqual,
	replaceImg:replaceImg,
	norender: norender
}