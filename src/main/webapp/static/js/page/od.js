(function() {
	var lineso = odmaxo.map(function(o) {
		return o.map(function(p) {
			return [{
				name: zones[p.o - 1].name
			}, {
				name: zones[p.d - 1].name,
				value: p.flow
			}];
		});
	});

	var linesd = odmaxd.map(function(o) {
		return o.map(function(p) {
			return [{
				name: zones[p.o - 1].name
			}, {
				name: zones[p.d - 1].name,
				value: p.flow
			}];
		});
	});

	var liness = odmaxs.map(function(o) {
		return o.map(function(p) {
			return [{
				name: zones[p.o - 1].name
			}, {
				name: zones[p.d - 1].name,
				value: p.flow
			}];
		});
	});

	var geodata = {};
	zones.forEach(function(o) {
		_name = o.name;
		_centerX = o.centerX;
		_centerY = o.centerY;
		geodata[_name] = [_centerX, _centerY];
	});

	var datearr = [];
	for(var i = 0; i < 24; i++) {
		if(i < 10) {
			datearr.push("2015-04-20 0" + i + ":00:00");
			datearr.push("2015-04-20 0" + i + ":30:00");
		} else {
			datearr.push("2015-04-20 " + i + ":00:00");
			datearr.push("2015-04-20 " + i + ":30:00");
		}

	}
	var pointsomap0 = lineso[0].reduce(function(p, c) {
		p[c[0].name] = (p[c[0].name]) ? (p[c[0].name] + c[1].value) : (c[1].value);
		return p;
	}, {});

	var pointso0 = [];
	for(var name in pointsomap0) {
		pointso0.push({
			name: name,
			value: pointsomap0[name]
		});
	}

	var pointsdmap0 = linesd[0].reduce(function(p, c) {
		p[c[1].name] = (p[c[1].name]) ? (p[c[1].name] + c[1].value) : (c[1].value);
		return p;
	}, {});

	var pointsd0 = [];
	for(var name in pointsdmap0) {
		pointsd0.push({
			name: name,
			value: pointsdmap0[name]
		});
	}

	var sps = odmaxsps.map(function(o) {
		return o.map(function(o) {
			return {
				name: zones[o.p - 1].name,
				value: o.v
			};
		});
	});
	// .map(function(o){
	//     return {name:o.name,value:o.value};
	// });
	// 路径配置
	require.config({
		paths: {
			echarts: 'http://echarts.baidu.com/build/dist'
		},
		packages: [{
			name: 'BMap',
			location: 'assets/js',
			main: 'main'
		}]
	});

	// 使用
	require(
		[
			'echarts',
			'BMap',
			'echarts/chart/map' // 
		],

		function(echarts, BMapExtension) {
			// 基于准备好的dom，初始化echarts图表
			// 初始化地图
			var mapcon = document.getElementById("show-od");
			var BMapExt = new BMapExtension(mapcon, BMap, echarts, {
				enableMapClick: false
			});
			var map = BMapExt.getMap();
			var container = BMapExt.getEchartsContainer();

			var startPoint = {
				x: 116.404323,
				y: 39.907566
			};
			var point = new BMap.Point(startPoint.x, startPoint.y);
			map.centerAndZoom(point, 11);
			map.enableScrollWheelZoom(true);
			// 地图自定义样式
			map.setMapStyle({
				styleJson: [{
						"featureType": "water",
						"elementType": "all",
						"stylers": {
							"color": "#044161"
						}
					},
					{
						"featureType": "land",
						"elementType": "all",
						"stylers": {
							"color": "#000000"
						}
					},
					{
						"featureType": "boundary",
						"elementType": "geometry",
						"stylers": {
							"color": "#064f85"
						}
					},
					{
						"featureType": "railway",
						"elementType": "all",
						"stylers": {
							"visibility": "off"
						}
					},
					{
						"featureType": "highway",
						"elementType": "geometry",
						"stylers": {
							"color": "#000000"
						}
					},
					{
						"featureType": "highway",
						"elementType": "geometry.fill",
						"stylers": {
							"color": "#005b96",
							"lightness": 1
						}
					},
					{
						"featureType": "highway",
						"elementType": "labels",
						"stylers": {
							"visibility": "off"
						}
					},
					{
						"featureType": "arterial",
						"elementType": "geometry",
						"stylers": {
							"color": "#000000"
						}
					},
					{
						"featureType": "arterial",
						"elementType": "geometry.fill",
						"stylers": {
							"color": "#00508b"
						}
					},
					{
						"featureType": "poi",
						"elementType": "all",
						"stylers": {
							"visibility": "on"
						}
					},
					{
						"featureType": "green",
						"elementType": "all",
						"stylers": {
							"color": "#056197",
							"visibility": "off"
						}
					},
					{
						"featureType": "subway",
						"elementType": "all",
						"stylers": {
							"visibility": "on"
						}
					},
					{
						"featureType": "manmade",
						"elementType": "all",
						"stylers": {
							"visibility": "off"
						}
					},
					{
						"featureType": "local",
						"elementType": "all",
						"stylers": {
							"visibility": "off"
						}
					},
					{
						"featureType": "arterial",
						"elementType": "labels",
						"stylers": {
							"visibility": "off"
						}
					},
					{
						"featureType": "boundary",
						"elementType": "geometry.fill",
						"stylers": {
							"color": "#029fd4"
						}
					},
					{
						"featureType": "building",
						"elementType": "all",
						"stylers": {
							"color": "#1a5787"
						}
					},
					{
						"featureType": "label",
						"elementType": "all",
						"stylers": {
							"visibility": "on"
						}
					}
				]
			});
			option = {
				timeline: {
					data: datearr,
					label: {
						formatter: function(s) {
							return s.slice(11, 16);
						},
						textStyle: {
							color: 'pink'
						}
					},
					controlStyle: {
						normal: {
							color: 'pink'
						}
					},
					autoPlay: true,
					playInterval: 5000
				},

				options: [{

					color: ['gold', 'aqua', 'lime'],
					title: {
						text: '北京市租赁车OD情况',
						x: 'center',
						textStyle: {
							"color": "#fff",
							"fontSize": 50,
							"fontFamily": "黑体"
						},
						subtextStyle: {
							"fontSize": 30,
							"fontFamily": "楷体"
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: '{b}'
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data: ['按o排序', '按d排序', '按总量排序'],
						selectedMode: 'single',
						selected: {
							'按d排序': false,
							'按总量排序': false
						},
						textStyle: {
							color: '#fff',
							"fontSize": 20
						}
					},
					toolbox: {
						show: true,
						orient: 'vertical',
						x: 'left',
						y: 'center',
						feature: {
							mark: {
								show: true
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					dataRange: {
						min: 0,
						max: 300,
						show: false,
						calculable: true,
						x: 50,
						y: document.body.clientHeight - 350,
						color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
						textStyle: {
							color: '#fff'
						}
					},
					series: [{
						name: '按o排序',
						type: 'map',
						mapType: 'none',
						itemStyle: {
							normal: {
								borderColor: 'rgba(100,149,237,1)',
								borderWidth: 0.5,
								areaStyle: {
									color: '#1b1b1b'
								}
							}
						},
						data: [],
						markLine: {
							smooth: true,
							symbol: ['circle', 'circle'],
							symbolSize: 1,
							effect: {
								show: true,
								scaleSize: 1,
								period: 30,
								color: '#fff',
								shadowBlur: 10
							},
							itemStyle: {
								normal: {
									borderWidth: 1,
									lineStyle: {
										type: 'solid',
										shadowBlur: 5
									}
								}
							},
							data: lineso[0],
						},
						geoCoord: geodata,
						markPoint: {
							symbol: 'emptyCircle',
							symbolSize: function(v) {
								return Math.min(5 + v / 400, 20)
							},
							effect: {
								show: true,
								shadowBlur: 0
							},
							itemStyle: {
								normal: {
									label: {
										show: false
									}
								},
								emphasis: {
									label: {
										position: 'top'
									}
								}
							},
							//data : lineso[0].map(function(o){return o[0]})
							data: pointso0
						}
					}, {
						name: '按d排序',
						type: 'map',
						mapType: 'none',
						itemStyle: {
							normal: {
								borderColor: 'rgba(100,149,237,1)',
								borderWidth: 0.5,
								areaStyle: {
									color: '#1b1b1b'
								}
							}
						},
						data: [],
						markLine: {
							smooth: true,
							symbol: ['circle', 'circle'],
							symbolSize: 1,
							effect: {
								show: true,
								scaleSize: 1,
								period: 30,
								color: '#fff',
								shadowBlur: 10
							},
							itemStyle: {
								normal: {
									borderWidth: 1,
									lineStyle: {
										type: 'solid',
										shadowBlur: 5
									}
								}
							},
							data: linesd[0],
						},
						geoCoord: geodata,
						markPoint: {
							symbol: 'emptyCircle',
							symbolSize: function(v) {
								return Math.min(5 + v / 200, 30)
							},
							effect: {
								show: true,
								shadowBlur: 0
							},
							itemStyle: {
								normal: {
									label: {
										show: false
									}
								},
								emphasis: {
									label: {
										position: 'top'
									}
								}
							},
							data: pointsd0
						}
					}, {
						name: '按总量排序',
						type: 'map',
						mapType: 'none',
						itemStyle: {
							normal: {
								borderColor: 'rgba(100,149,237,1)',
								borderWidth: 0.5,
								areaStyle: {
									color: '#1b1b1b'
								}
							}
						},
						data: [],
						markLine: {
							smooth: true,
							symbol: ['circle', 'circle'],
							symbolSize: 1,
							effect: {
								show: true,
								scaleSize: 1,
								period: 30,
								color: '#fff',
								shadowBlur: 10
							},
							itemStyle: {
								normal: {
									borderWidth: 1,
									lineStyle: {
										type: 'solid',
										shadowBlur: 5
									}
								}
							},
							data: liness[0],
						},
						geoCoord: geodata,
						markPoint: {
							symbol: 'emptyCircle',
							symbolSize: function(v) {
								return Math.min(5 + v / 200, 30)
							},
							effect: {
								show: true,
								shadowBlur: 0
							},
							itemStyle: {
								normal: {
									label: {
										show: false
									}
								},
								emphasis: {
									label: {
										position: 'top'
									}
								}
							},
							data: sps[0]
						}
					}]
				}]

			};

			generateTable(pointso0,pointsd0,sps,0);

			for(var i = 1; i < 48; i++) {
				var pointsomapi = lineso[i].reduce(function(p, c) {
					p[c[0].name] = (p[c[0].name]) ? (p[c[0].name] + c[1].value) : (c[1].value);
					return p;
				}, {});

				var pointsoi = [];
				for(var name in pointsomapi) {
					pointsoi.push({
						name: name,
						value: pointsomapi[name]
					});
				}

				var pointsdmapi = linesd[i].reduce(function(p, c) {
					p[c[1].name] = (p[c[1].name]) ? (p[c[1].name] + c[1].value) : (c[1].value);
					return p;
				}, {});

				var pointsdi = [];
				for(var name in pointsdmapi) {
					pointsdi.push({
						name: name,
						value: pointsdmapi[name]
					});
				}
				option.options.push({
					series: [{
						markLine: {
							data: lineso[i]
						},
						markPoint: {
							data: pointsoi
						}
					}, {
						markLine: {
							data: linesd[i]
						},
						markPoint: {
							data: pointsdi
						}
					}, {
						markLine: {
							data: liness[i]
						},
						markPoint: {
							data: sps[i]
						}
					}]
				});
			}

			var myChart = BMapExt.initECharts(container);
			BMapExt.setOption(option);
			var ecConfig = require('echarts/config');
			myChart.on(ecConfig.EVENT.TIMELINE_CHANGED, function(o) {
				//alert(o.currentIndex);
				var i = o.currentIndex;
				var pointsomapi = lineso[i].reduce(function(p, c) {
					p[c[0].name] = (p[c[0].name]) ? (p[c[0].name] + c[1].value) : (c[1].value);
					return p;
				}, {});

				var pointsoi = [];
				for(var name in pointsomapi) {
					pointsoi.push({
						name: name,
						value: pointsomapi[name]
					});
				}

				var pointsdmapi = linesd[i].reduce(function(p, c) {
					p[c[1].name] = (p[c[1].name]) ? (p[c[1].name] + c[1].value) : (c[1].value);
					return p;
				}, {});

				var pointsdi = [];
				for(var name in pointsdmapi) {
					pointsdi.push({
						name: name,
						value: pointsdmapi[name]
					});
				}
				removeTable();
				generateTable(pointsoi,pointsdi,sps,i);
			});

		});
})();

var str1='<tr><th align="left" width="150px">';
var str2='</th><th align="right" width="20px">';
var str3='</th></tr>';

function generateTable(pointso,pointsd,sps,idx) {
	var s1='';
	var s2='';
	var s3='';
    for(var i=0;i<5;i++){
    	s1+=str1+pointso[i].name+str2+pointso[i].value+str3;
    	s2+=str1+pointsd[i].name+str2+pointsd[i].value+str3
    	s3+=str1+sps[idx][i].name+str2+sps[idx][i].value+str3;
    }
    $("#tableO").append(s1);
    $("#tableD").append(s2);
    $("#tableT").append(s3);
}

function removeTable(){
	$("#tableO").empty();
	$("#tableD").empty();
	$("#tableT").empty();
}
