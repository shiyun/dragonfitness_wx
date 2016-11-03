var init = function () {
    if(!ajax) var ajax = new AJAX();
    if(!_util) var _util = new Util();
    if(!ui) var ui = new UI();

	/*var isPass = _util.authPass();

	if(!isPass) return;*/

	var params = _util.getQueryString(),
		addr = decodeURIComponent(params.addr);
console.log(addr);
	function setAddr(addr){	
		var map = new BMap.Map("allmap");
		var point = new BMap.Point(116.331398,39.897445);
		map.centerAndZoom(point,16);
		// 创建地址解析器实例
		var myGeo = new BMap.Geocoder();
		// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint(addr, function(point){
			if (point) {
				map.centerAndZoom(point, 16);
				map.addOverlay(new BMap.Marker(point));
			}else{
				alert("您选择地址没有解析到结果!");
			}
		}, "上海市");
		map.enableScrollWheelZoom(true); 
		
	}

	setAddr(addr);
};

$(function () {
    init && init()
});