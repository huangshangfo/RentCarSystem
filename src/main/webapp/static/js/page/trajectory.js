var globalCompany=[];

$(function() {
	getCompanys();
})

$("[name='indicator']").click(function() {
	$("#select-1").empty();
	$("#date-select").empty();
	$("#select-2").empty();
	globalCompany.splice(0,globalCompany.length); //清空数组
	getCompanys();
	//setParam();
})

$("[name='quality']").change(function() {
	$("#select-1").empty();
	$("#date-select").empty();
	$("#select-2").empty();
	getCompanys();
	//setParam();
})

$("#select-1").change(function(){
	setParam();
	$("#date-select").empty();
	$("#select-2").empty();
	var comName=$("#select-1 option:selected").text().toString();
	getDates(comName);
})

$("#date-select").change(function(){
	$("#select-2").empty();
	var comName=$("#select-1 option:selected").text().toString();
	var date=$('#date-select option:selected').text().toString();
	getVehicles(comName,date);
})

//参数指标的显示
function setParam(){
	var comName=$("#select-1 option:selected").text().toString();
	var param1,param2,param3;
	for(var i=0;i<globalCompany.length;i++){
		if(comName==globalCompany[i].companyName){
			param1=globalCompany[i].repeatRate;
			param2=globalCompany[i].highActiveRate;
			param3=globalCompany[i].gpsDensity;
			break;
		}
	}
	$(".progress-ra").attr("data-original-title",Math.round(param1*10000)/100+'%');
	$(".progress-ha").attr("data-original-title",Math.round(param2*10000)/100+'%');
	$(".progress-gd").attr("data-original-title",Math.round(param3*10000)/100+'%');
	$("#repeat_rate").attr("aria-valuetransitiongoal",Math.round(param1*10000)/100); //text(param1.toFixed(4)*100+"%");
	$("#high_active").attr("aria-valuetransitiongoal",Math.round(param2*10000)/100); //text(param2.toFixed(4)*100+"%");
	$("#gps_density").attr("aria-valuetransitiongoal",Math.round(param3*10000)/100); //text(param3.toFixed(4)*100+"%");
	$('.progress-bar').progressbar({
		display_text: 'fill'
	});
}

//获取复选框中选中的值
function getCheckedValues() {
	var chkbs = document.getElementsByName("indicator");
	var str = "";
	for (i = 0; i < chkbs.length; i++) {
		var onChkb = chkbs[i];
		if (onChkb.checked == true) {
			if (str == "") {
				str += onChkb.value;
			} else {
				str += "," + onChkb.value;
			}
		}

	}
	//console.log(str);
	return str;
}

//获取单选框的值
function getRadioValue(){
	var radio=document.getElementsByName("quality");
	for (i=0; i<radio.length; i++) {  
        if (radio[i].checked) {  
            return  radio[i].value;
        }  
    }
}

//获取公司
function getCompanys() {
	var indicators = getCheckedValues();
	var quality = getRadioValue();
	$.ajax({
		url : '../gps/companys?indicators=' + indicators,
		type : 'GET',
		dataType : 'json',
		success : function(res) {
			if (res.status === 1) {
				globalCompany=res.data;
				var company = res.data;
				var companyTop5;
				if(quality==1){  //优质公司
					for (var i = 0; i < 5; i++) {
						companyTop5 += "<option>" + company[i].companyName + "</option>";
					}
				}
				else{  //劣质公司
					for (var i = company.length - 1; i > company.length - 6; i--) {
						companyTop5 += "<option>" + company[i].companyName + "</option>";
					}
				}
				$("#select-1").append(companyTop5);
				setParam();
				var comName=$("#select-1 option:selected").text().toString();
				getDates(comName);
			}
			else{
				$("#select-1").empty();
				splice(0,company.length); //清空数组
			}
		},
		error : function(err) {
			console.log("error");
		}
	})
}

//获取某公司有GPS的日期
function getDates(company){
	$('#date-load').show();
	$.ajax({
		url : '../gps/date?company=' + company,
		type : 'GET',
		dataType : 'json',
		success : function(res) {
			if (res.status === 1) {
				var dates=res.data;
				$('#date-load').hide();
				var htmlStr="";
				for (var i = 0; i < dates.length; i++) {
					htmlStr += "<option>" + dates[i] + "</option>";
				}
				$("#date-select").append(htmlStr);
				var comName=$("#select-1 option:selected").text().toString();
				var date=$('#date-select option:selected').text().toString();
				getVehicles(comName,date);
			}
			else{
				$("#date-select").empty();
				
			}
		},
		error : function(err) {
			console.log("filed get vehicles");
		}
	})
}

//获取所有车牌号
function getVehicles(company,date){
	$.ajax({
		url : '../gps/vehicles?company=' + company+'&date='+date,
		type : 'GET',
		dataType : 'json',
		success : function(res) {
			if (res.status === 1) {
				var vehicles=res.data;
				var htmlStr="";
				for (var i = 0; i < vehicles.length; i++) {
					htmlStr += "<option>" + vehicles[i] + "</option>";
				}
				$("#select-2").append(htmlStr);
			}
			else{
				$("#select-2").empty();
				
			}
		},
		error : function(err) {
			console.log("filed get vehicles");
		}
	})
}

/*//日历设置
$('.form_datetime').datetimepicker({
	format: 'yyyy-mm-dd',
	autoclose: true,
	startView: 2,
	minView: 2,
	startDate: '2016-10-01',
	endDate: '2016-10-31',
	forceParse: false,
	language: 'zh-CN'
});*/

var map = new BMap.Map("show-map",{
	enableMapClick:false
});
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
map.addControl(new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));          //添加默认缩略地图控件
map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

function showMap(){
	var date=$('#date-select option:selected').text().toString();
	var plateNumber=$('#select-2 option:selected').text().toString();
	var vehicleGps=[];
	$.ajax({
		url : '../gps/gps?plateNumber=' + plateNumber+'&date='+date,
		type : 'GET',
		dataType : 'json',
		success : function(res) {
			if (res.status === 1) {
				vehicleGps=res.data;
				showGps(vehicleGps); //显示gps轨迹
			}
			else{
				console.log(res.message);
			}
		},
		error : function(err) {
			console.log("filed get vehicles");
		}
	})
}

function showGps(vehicleGps) {
	map.clearOverlays(); //清除原来的轨迹
	var points = [];
	var len = vehicleGps.length;
	for (var i = 0; i < len; i++) {
		points.push(new BMap.Point(vehicleGps[i].lng, vehicleGps[i].lat));
	}
	var options = {
		size : BMAP_POINT_SIZE_SMALL,
		shape : BMAP_POINT_SHAPE_CIRCLE,
		color : 'red'
	}
	var pointCollection = new BMap.PointCollection(points, options); // 初始化PointCollection
	/*pointCollection.addEventListener('click', function(e) {
		alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat); // 监听点击事件
	});*/
	map.addOverlay(pointCollection); // 添加Overlay
	map.setCenter(points[0]);
	map.setZoom(12);
}