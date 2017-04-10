var company=[];

$(function() {
	getCompanys();
	//setParam();
})

$("[name='indicator']").click(function() {
	$("#select-1").empty();
	company.splice(0,company.length); //清空数组
	getCompanys();
	//setParam();
})

$("[name='quality']").change(function() {
	$("#select-1").empty();
	company.splice(0,company.length); //清空数组
	getCompanys();
	//setParam();
})

function round2(number,fractionDigits){   
	with(Math){   
        return round(number*pow(10,fractionDigits))/pow(10,fractionDigits);   
    }  
}  

function setParam(){
	if(window.company.length>0){
		$("#repeat_rate").text(round2(company[0].repeatRate,4)*100+"%");
		$("#high_active").text(round2(company[0].highActiveRate,4)*100+"%");
		$("#gps_density").text(round2(company[0].gpsDensity,4)*100+"%");
	}
	else{
		console.log("Company为空");
	}
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

function getCompanys() {
	var indicators = getCheckedValues();
	var quality = getRadioValue();
	$.ajax({
		url : '../gps/companys?indicators=' + indicators,
		type : 'GET',
		dataType : 'json',
		success : function(res) {
			if (res.status === 1) {
				company = res.data;
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

var map = new BMap.Map("show-map");
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放