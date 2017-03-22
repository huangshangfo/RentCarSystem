/**
 * 
 */
var mapcon = document.getElementById("main");
var map = new BMap.Map(mapcon,{enableMapClick: false});
//116.354323,39.987566
var startPoint = {x:116.404323,y:39.907566};
var point = new BMap.Point(startPoint.x, startPoint.y);
map.centerAndZoom(point, 12);
map.enableScrollWheelZoom(true);

map.setMapStyle({
    styleJson: [
          {
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
                    "color": "#002049"
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
                    "color": "#004981"
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
                    "color": "#002049"
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
                    "visibility": "off"
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
function Overlay() {}

Overlay.prototype = new BMap.Overlay();

Overlay.prototype.initialize = function (map) {
    var size = map.getSize();
    var div = self._echartsContainer = document.createElement('div');
    div.style.position = 'absolute';
    div.style.height = size.height + 'px';
    div.style.width = size.width + 'px';
    div.style.top = 0;
    div.style.left = 0;
    div.id="p5container";
    map.getPanes().labelPane.appendChild(div);
    return div;
};

/**
 * @override
 */
Overlay.prototype.draw = function () {};

var myOverlay = new Overlay();

map.addOverlay(myOverlay);
var geoCoord2Pixel = function (geoCoord) {
    var point = new BMap.Point(geoCoord[0], geoCoord[1]);
    var pos = map.pointToOverlayPixel(point);
    return [pos.x, pos.y];
};

/**
 * @param {Array.<number>} pixel
 * @return {Array.<number>}
 * @public
 */
var pixel2GeoCoord = function (pixel) {
    var point = map.overlayPixelToPoint({
        x: pixel[0],
        y: pixel[1]
    });
    return [point.lng, point.lat];
};

function getOffset(){
	var tar=mapcon.firstChild;
	return [tar.style.left,tar.style.top];
}

var size = map.getSize();
var circleSize=0;
var mp5 = new p5(function(){}, "p5container");
var sli;
var timeSlice = 30 * 60; // 时间间隔：s
var timeNum = 24 * 60 * 60/timeSlice;
var t = 20;
mp5.setup=function (){
 
	mp5.createCanvas(size.width, size.height);
    mp5.background(0,0);
    mp5.frameRate(1);
	sli = $("#slider").slider({
		min:0,
		max:timeNum,
		step:1
	});
	
	$("#slider").mouseenter(function(){
		mp5.noLoop();
	}).mouseleave(function(){
		mp5.loop();
	}).on("slidestart", function( event, ui ) {
		mp5.noLoop();
	}).on( "slidestop", function( event, ui ) {
		t=ui.value;
		mp5.loop();
	} );
	for(var i=0;i<=6;i++){
		var timespan = document.createElement("div");
		timespan.innerHTML=""+i*4+":00";
		timespan.className="timespan";
		timespan.style.left=""+(0+i)*16+"%";
		var slicon = document.getElementById("slider");
		slider.appendChild(timespan);
	}
}

mp5.draw=function (){
	mp5.createCanvas(size.width, size.height);
	mp5.background(0,0);
	
//	for(var i=0; i<=255; i++){
//		mp5.noFill();
//		mp5.stroke(255,i);
//		mp5.line(mp5.width-420,mp5.height-200-i,mp5.width-400,mp5.height-200-i);
//	}
//	mp5.textSize(20);
//	mp5.text("0",mp5.width-390,mp5.height-200);
//	mp5.text("250",mp5.width-390,mp5.height-327);
//	mp5.text("500",mp5.width-390,mp5.height-455);

	
	
	var off = getOffset();
	mp5.translate(parseInt(off[0]),parseInt(off[1]));
	
	//mp5.fill(255,100);
	mp5.stroke(255,50);
	
	transzone.forEach(function(p){
		if(isHot(p.id))
			mp5.fill(255,0,0,pass_flow[t][p.id]*255/5000+20);
		else
			mp5.fill(255,pass_flow[t][p.id]*255/5000+20);
		var testPoints = p.vertex;
		if(testPoints.length<=200000){
			var geoPoints = testPoints.map(geoCoord2Pixel);
			mp5.beginShape();
			geoPoints.forEach(function(p){
				mp5.vertex(p[0],p[1]);
			});
			mp5.endShape();	
		}
	});
	
	draw_bar(top_index, top_desc, pass_flow );
	
	sli.slider({value:t});
	t++;
	if(t >= timeNum)
		t = 0;
}

function isHot(id)
{
	for(var i = 0; i < top_index[t].length && i < 8; i++)
	{
		if( top_index[t][i] == id )
			return true;
	}
	return false;
}

function getOffset(){
	var tar=mapcon.firstChild;
	return [tar.style.left,tar.style.top];
}

function draw_bar(top_index, top_desc, pass_flow )
{
	var up_left = [200, 200];
	var bar_width = 10;
	var bar_height = 600;
	mp5.fill(255);
	mp5.rect(up_left[0], up_left[1], bar_width, bar_height);

	var font_size = 20;
	for(var i = 0; i < top_index[t].length && i < 8; i++)
	{
		var passFlow = pass_flow[t][top_index[t][i]];
		if(passFlow < 10)
			break;
		var y_offset = i*(font_size+50)+20;
		drawPassFlow(top_desc[t][i], passFlow, font_size, [up_left[0], up_left[1]+y_offset], bar_width);
	}
}

// bar_width : 左侧那条长竖线的宽度
// up_right ： 显示的地名的右上角，即[左侧那条长竖线的左侧,y_offset]
function drawPassFlow(str, pass_flow, font_size, up_right, bar_width)
{
	mp5.fill(0,0,0);
	mp5.stroke(0,0,0);
	mp5.textSize(font_size);
	mp5.text(str, up_right[0]-(str.length+1)*font_size, up_right[1]+font_size); // 右对齐，最右边的字符距离长竖线一个font_size
	_pass_flow = pass_flow/50; // 每pass_flow个人相当于一条竖线（柱形图有很多竖线组合而成）
	for(var i=0; i<_pass_flow; i++){
		var stro = i*255/_pass_flow;
		mp5.stroke(255,255-stro);
		mp5.line(up_right[0]+bar_width+i,up_right[1],up_right[0]+bar_width+i,up_right[1]+font_size);
	}
	mp5.fill(255,50,0);
	mp5.stroke(255,0,0,100);
	mp5.text(pass_flow, up_right[0]+bar_width+1*font_size, up_right[1]+font_size-2); // 右对齐，最右边的字符距离长竖线一个font_size
}

