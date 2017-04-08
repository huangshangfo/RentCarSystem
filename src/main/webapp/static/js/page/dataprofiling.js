/*************显示基础数据**************/
$(function() {
	//用于显示数据变化
	var seridx = {
		'车辆数': 0,
		'合同数': 1,
		'备案数': 2
	};
	var changeVal = [];
	var veChangeVal = [0];
	var conChangeVal = [0];
	var recChangeVal = [0];
	for(var i = 1; i < vehicle_num.length; i++) {
		veChangeVal.push(vehicle_num[i] - vehicle_num[i - 1]);
		conChangeVal.push(contract_num[i] - contract_num[i - 1]);
		recChangeVal.push(record_num[i] - record_num[i - 1]);
	}
	changeVal.push(veChangeVal);
	changeVal.push(conChangeVal);
	changeVal.push(recChangeVal);

	// Set up the chart
	var chart = new Highcharts.Chart({
		chart: {
			renderTo: 'base-container',
			type: 'column',
			backgroundColor: 'transparent',
			options3d: {
				enabled: true,
				alpha: 10,
				beta: 10,
				depth: 60,
				viewDistance: 25
			}
		},
		title: {
			useHTML: true,
			text: '<b>基础数据</b>'
		},
		subtitle: {
			text: '各月份上传数据情况',
			style:{'color':'#ACACAC'}
		},
		legend:{
			layout:'horizontal',
			align:'right',
			verticalAlign:'top',
			x:-20,
			y:25,
			symbolPadding:2,
			itemDistance:10
		},
		xAxis: {
			categories: ['2016.08', '2016.09', '2016.10', '2016.11']
		},
		yAxis: {
			allowDecimals: false,
			min: 0,
			title: {
				text: '数量'
			}
		},
		tooltip: {
			headerFormat: '<b>{point.key}</b><br>',
			pointFormat: '<span style="color:{series.color}">\u25CF</span>{series.name}: {point.y}'
		},
		plotOptions: {
			column: {
				depth: 40,
				//显示上升下降图标
				dataLabels: {
					enabled: true,
					useHTML: true,
					formatter: function(e) {
						var index = this.point.x;
						var seriesIdx = seridx[this.series.name];
						var col = this.series.color;
						//console.log(changeVal[seriesIdx][index]);
						if(changeVal[seriesIdx][index] > 0)
							return('<span style="color:green"><span class="glyphicon glyphicon-arrow-up"></span></span>');
						else if(changeVal[seriesIdx][index] < 0)
							return('<span style="color:red"><span class="glyphicon glyphicon-arrow-down"></span></span>');
					}
				}
			}
		},
		series: [{
			name: '车辆数',
			data: vehicle_num,
		}, {
			name: '合同数',
			data: contract_num,
		}, {
			name: '备案数',
			data: record_num,
		}]
	});

	function showValues() {
		$('#alpha-value').html(chart.options.chart.options3d.alpha);
		$('#beta-value').html(chart.options.chart.options3d.beta);
		$('#depth-value').html(chart.options.chart.options3d.depth);
	}
	// Activate the sliders
	$('#sliders input').on('input change', function() {
		chart.options.chart.options3d[this.id] = this.value;
		showValues();
		chart.redraw(false);
	});
	showValues();
});

/*GPS数据*/
//日期选择
$('.form_datetime').datetimepicker({
	format: 'yyyy-mm',
	autoclose: true,
	startView: 3,
	minView: 3,
	startDate: '2016-08',
	endDate: '2016-11',
	forceParse: false,
	language: 'zh-CN'
});

/*************显示南丁尔图**************/
var mainEl = document.getElementById('gps-pie');
var chart = echarts.init(mainEl);

function copy(originData) {
	var copy = [];
	for(i = 0; i < 3; i++) {
		val = originData[i].value;
		na = originData[i].name;
		copy.push({ value: val, name: na });
	}
	return copy;
}
var data = copy(data8);
var legendData = [];
echarts.util.each(data, function(item, index) {
	item.itemStyle = {
		normal: { color: colorList[index] }
	};
	legendData.push(item.name);
});
optionGPS = {
	title: {
		text: '上传GPS车辆数',
		subtext: '各租赁类型上传GPS的车辆数',
		x: 'center'
	},
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	legend: {
		orient: 'vertical',
		left: '10%',
		top: '20%',
		data: legendData,
		formatter: function(name) {
			return name.replace(/\n/g, ' + ');
		}
	},
	toolbox: {
		show: true,
		feature: {
			mark: { show: true },
			restore: { show: true },
			magicType: {
				show: true,
				type: ['pie', 'funnel']
			},
			saveAsImage: { show: true }
		}
	},
	calculable: true,
	series: [{
			name: '车辆数',
			type: 'pie',
			center: ['65%', '50%'],
			radius: [20, 110],
			selectedMode: 'single',
			selectedOffset: 30,
			roseType: 'radius',
			label: {
				normal: {
					show: true,
					position: 'inner'
				},
				emphasis: {
					show: true
				}
			},
			lableLine: {
				normal: {
					show: false
				},
				emphasis: {
					show: true
				}
			},
			data: data
		}

	]
};
chart.setOption(optionGPS);
//自定义还原事件
chart.on("restore", function(params) {
	data = getData();
	echarts.util.each(data, function(item, index) {
		item.itemStyle = {
			normal: { color: colorList[index] }
		};
		legendData.push(item.name);
	});
	chart.setOption({
		legend: { data: legendData },
		series: [{ data: data }]
	});
})
//根据月份获取数据
function getData() {
	var nowData;
	var month = parseInt($('#text-month').val().split("-")[1]);
	switch(month) {
		case 8:
			nowData = copy(data8);
			break;
		case 9:
			nowData = copy(data9);
			break;
		case 10:
			nowData = copy(data10);
			break;
		case 11:
			nowData = copy(data11);
			break;
		default:
			nowData = copy(data8);
			break;
	}
	return nowData;
}

//选取月份
$('#text-month').change(function() {
	data = getData();
	echarts.util.each(data, function(item, index) {
		item.itemStyle = {
			normal: { color: colorList[index] }
		};
		legendData.push(item.name);
	});
	chart.setOption({
		legend: { data: legendData },
		series: [{ data: data }]
	});
})

//拖曳重计算
var dragging;
var draggingDataIndex;
var dx;
var dy;
var zr = chart.getZr();

chart.on('mousedown', function(params) {
	draggingDataIndex = getHoveredDataIndex(params);
	if(draggingDataIndex != null) {

		var srcSector = params.event.target;
		dragging = new echarts.graphic.Sector({
			shape: echarts.util.extend({}, srcSector.shape),
			style: {
				fill: srcSector.style.fill,
				opacity: 0.5
			},
			silent: true,
			z: 10000
		});

		dx = params.event.offsetX - srcSector.shape.cx;
		dy = params.event.offsetY - srcSector.shape.cy;

		zr.add(dragging);
	}
});

chart.on('mouseup', function(params) {
	if(dragging) {
		var targetDataIndex = getHoveredDataIndex(params);
		if(targetDataIndex != null &&
			targetDataIndex !== draggingDataIndex
		) {
			data[targetDataIndex].value += data[draggingDataIndex].value;
			data[targetDataIndex].name += '\n' + data[draggingDataIndex].name;
			legendData[targetDataIndex] = data[targetDataIndex].name;
			data.splice(draggingDataIndex, 1);
			legendData.splice(draggingDataIndex, 1);
			chart.setOption({
				legend: { data: legendData },
				series: { data: data }
			});
		}
	}
});

mainEl.addEventListener('mousemove', function(e) {
	var box = mainEl.getBoundingClientRect();
	var zrX = e.clientX - box.left;
	var zrY = e.clientY - box.top;

	if(dragging) {
		dragging.setShape({
			cx: zrX - dx,
			cy: zrY - dy
		});
	}
});

document.addEventListener('mouseup', function(e) {
	if(dragging) {
		zr.remove(dragging);
		dragging = null;
	}
});

function getHoveredDataIndex(params) {
	return params.componentType === 'series' &&
		params.componentSubType === 'pie' &&
		params.dataIndex;
}


/*************GPS数据随时间变化曲线**************/
var dom = document.getElementById('timeline-data');
var myChart = echarts.init(dom);

optionChange = null;
var base = +new Date(2016, 7, 1);
var oneDay = 24 * 3600 * 1000;
var date = [];

//json文件中的数据
var all_date = [];
var all_fenshiData = [];
var all_duanzuData = [];
var all_changzuData = [];

gpsNum.forEach(function(s) {
	all_date.push(s.date);
	all_fenshiData.push(s.fenshi);
	all_duanzuData.push(s.duanzu);
	all_changzuData.push(s.changzu);
});
var maxLen = all_date.length;

var count = 0;
var fenshiData = [all_fenshiData[count]]; //分时租赁
var duanzuData = [all_duanzuData[count]]; //短租
var changzuData = [all_changzuData[count]]; //长租
var now = all_date[count];

//数组添加数据
function addData(shift) {
	date.push(now);
	if(count < maxLen)
		count++;

	fenshiData.push(all_fenshiData[count]);
	duanzuData.push(all_duanzuData[count]);
	changzuData.push(all_changzuData[count]);
	if(shift) {
		date.shift();
		fenshiData.shift();
		duanzuData.shift();
		changzuData.shift();
	}
	now = all_date[count];
}

//日期跨度
for(var i = 1; i < 15; i++) {
	addData();
}

var pause = 0;
var titles = ['暂停', '开始'];
var images = ['image://img/pause.ico', 'image://img/start.ico'];
var timer;
optionChange = {
	title: {
		text: 'GPS数据随时间变化曲线',
		subtext: '各租赁类型车每天上传的GPS总量',
		x: 'center'
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['分时租赁', '短租', '长租'],
		left: '10%',
		top: '5%'
	},
	toolbox: {
		show: true,
		feature: {
			magicType: { show: true, type: ['stack', 'tiled'] },
			myPause: {
				show: true,
				title: titles[0],
				icon: images[0],
				onclick: function() {
					pause = (pause == 0) ? 1 : 0;
					myChart.setOption({
						toolbox: {
							feature: {
								myPause: {
									title: titles[pause],
									icon: images[pause]
								}
							}
						}
					});
					if(pause == 1)
						clearInterval(timer); //清除定时器
					else
						timer = setInterval(loadData, 1000);
				}
			},
			restore: { show: true },
			saveAsImage: { show: true }
		},
		right: '10%'
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: date
	},
	yAxis: {
		boundaryGap: [0, '50%'],
		scale: true,
		type: 'value'
	},
	series: [{
			name: '分时租赁',
			type: 'line',
			symbol: 'none',
			smooth: false,
			stack: null,
			data: fenshiData
		},
		{
			name: '短租',
			type: 'line',
			symbol: 'none',
			smooth: false,
			stack: null,
			data: duanzuData
		},
		{
			name: '长租',
			type: 'line',
			symbol: 'none',
			smooth: false,
			stack: null,
			data: changzuData
		},
	]
};
//加载数据
function loadData() {
	if(count < maxLen)
		addData(true);
	else {
		//清空数据
		count = 0;
		date.splice(0, date.length);
		fenshiData.splice(0, fenshiData.length);
		duanzuData.splice(0, duanzuData.length);
		changzuData.splice(0, changzuData.length);

		for(var i = 1; i < 15; i++) {
			addData();
		}
	}

	myChart.setOption({
		xAxis: {
			data: date
		},
		series: [{
				name: '分时租赁',
				data: fenshiData
			},
			{
				name: '短租',
				data: duanzuData
			},
			{
				name: '长租',
				data: changzuData
			},
		]
	});
}

timer = setInterval(loadData, 1000); //定时加载

if(optionChange && typeof optionChange === "object") {
	myChart.setOption(optionChange, true);
}
//自定义还原事件
myChart.on('restore', function(params) {
	//清空数据
	count = 0;
	date.splice(0, date.length);
	fenshiData.splice(0, fenshiData.length);
	duanzuData.splice(0, duanzuData.length);
	changzuData.splice(0, changzuData.length);

	for(var i = 1; i < 15; i++) {
		addData();
	}
});

window.onresize = function(){
	chart.resize();
	myChart.resize();
}