var map = new BMap.Map("show-map");
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

(function() {

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

			//北京坐标
			var startPoint = { x: 116.403119, y: 39.914714 };
			//重庆坐标
			//var startPoint = {x:106.549116,y:29.566725};
			var point = new BMap.Point(startPoint.x, startPoint.y);
			map.centerAndZoom(point, 13);
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
							"visibility": "on"
						}
					},
					{
						"featureType": "highway",
						"elementType": "geometry",
						"stylers": {
							"color": "#000000",
							"weight": 1
						}
					},
					{
						"featureType": "highway",
						"elementType": "geometry.fill",
						"stylers": {
							"color": "#005b96",

						}
					},
					{
						"featureType": "highway",
						"elementType": "labels",
						"stylers": {
							"visibility": "on"
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
							"visibility": "off"
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
							"visibility": "off"
						}
					}
				]
			});

			options = {

				color: ['gold', 'aqua', 'lime'],
				title: {
					text: 'OD展示模板',
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
				toolbox: {
					show: true,
					orient: 'vertical',
					x: 'right',
					y: 'center',
					feature: {
						mark: { show: true },
						dataView: { show: true, readOnly: false },
						restore: { show: true },
						saveAsImage: { show: true }
					}
				},
				dataRange: {
					min: 0,
					max: 120,
					calculable: true,
					x: 100,
					y: document.body.clientHeight - 250,
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
									shadowBlur: 10,
									width: 1
								}
							}
						},
						data: markLineData,
					},
					geoCoord: geoData,
					markPoint: {
						symbol: 'emptyCircle',
						symbolSize: 10,
						effect: {
							show: true,
							shadowBlur: 0
						},
						itemStyle: {
							normal: {
								label: { show: false }
							},
							emphasis: {
								label: { position: 'top' }
							}
						},
						//data : lineso[0].map(function(o){return o[0]})
						data: markPointData
					}
				}]
			};

			//和百度地图API结合在一起了哦
			var marker = new BMap.Marker(new BMap.Point(116.380571, 39.913358));
			map.addOverlay(marker);

			var myChart = BMapExt.initECharts(container);
			BMapExt.setOption(options);

			var ecConfig = require('echarts/config');
			myChart.on(ecConfig.EVENT.CLICK, eConsole);

			function eConsole(param) {
				//alert(param.name); 
				//alert(param.value);
				console.log(param);
			}

		});
})();