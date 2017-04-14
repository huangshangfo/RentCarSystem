<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en-us">

<head>
<meta charset="utf-8">
<!--<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">-->

<title>EasyCar</title>

<link rel="stylesheet" href="../static/css/materialize.min.css">
<link rel="stylesheet" href="../static/css/material-icons.css">

<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<!-- Basic Styles -->
<link rel="stylesheet" type="text/css" media="screen"
	href="../static/css/bootstrap.css">
<link rel="stylesheet" type="text/css" media="screen"
	href="../static/css/font-awesome.min.css">
<link href="../static/css/bootstrap-datetimepicker.min.css"
	rel="stylesheet" media="screen">

<!-- SmartAdmin Styles : Caution! DO NOT change the order -->
<link rel="stylesheet" type="text/css" media="screen"
	href="../static/css/smartadmin-production-plugins.min.css">
<link rel="stylesheet" type="text/css" media="screen"
	href="../static/css/smartadmin-production.min.css">
<link rel="stylesheet" type="text/css" media="screen"
	href="../static/css/smartadmin-skins.min.css">

<!-- SmartAdmin RTL Support  -->
<link rel="stylesheet" type="text/css" media="screen"
	href="../static/css/smartadmin-rtl.min.css">



<!-- My style css -->
<link rel="stylesheet" type="text/css" media="screen"
	href="../static/css/my_style.css">
<link rel="stylesheet" type="text/css" media="screen"
	href="../static/css/page/trajectory.css">

<!-- FAVICONS -->
<link rel="shortcut icon" href="../static/img/favicon/favicon.ico"
	type="image/x-icon">
<link rel="icon" href="../static/img/favicon/favicon.ico"
	type="image/x-icon">

<!-- GOOGLE FONT -->
<link rel="stylesheet"
	href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700">

<!-- Specifying a Webpage Icon for Web Clip 
			 Ref: https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html -->
<link rel="apple-touch-icon"
	href="../static/img/splash/sptouch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="76x76"
	href="../static/img/splash/touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="120x120"
	href="../static/img/splash/touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="152x152"
	href="../static/img/splash/touch-icon-ipad-retina.png">

<!-- iOS web-app metas : hides Safari UI Components and Changes Status Bar Appearance -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">

<!-- Startup image for web apps -->
<link rel="apple-touch-startup-image"
	href="../static/img/splash/ipad-landscape.png"
	media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)">
<link rel="apple-touch-startup-image"
	href="../static/img/splash/ipad-portrait.png"
	media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)">
<link rel="apple-touch-startup-image"
	href="../static/img/splash/iphone.png"
	media="screen and (max-device-width: 320px)">

</head>

<body class="">
	<!-- HEADER -->
	<header id="header">
		<div id="logo-group">
			<span id="logo"> <img src="../static/img/logo.png"
				alt="SmartAdmin"></span>
		</div>
		<!-- NAVIGATION -->
		<div class="navbar navbar-default pull-left">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target=".navbar-collapse">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
			</div>
			<div class="navbar-collapse collapse navbar-right scroll-me">
				<ul class="nav navbar-nav ">
					<li><a href="dataprofiling.jsp">数据概况</a></li>
					<li><a href="features.jsp">运行特征</a></li>
					<li class="active"><a href="trajectory.jsp">质量分析</a></li>
					<li><a href="od.jsp">OD分析</a></li>
				</ul>
			</div>
		</div>
		<!-- NAVIGATION -->
		<!-- pulled right: nav area -->
		<div class="pull-right">

			<!-- #MOBILE -->
			<!-- Top menu profile link : this shows only when top menu is active -->
			<ul id="mobile-profile-img"
				class="header-dropdown-list hidden-xs padding-5">
				<li class=""><a href="#"
					class="dropdown-toggle no-margin userdropdown"
					data-toggle="dropdown"> <img
						src="../static/img/avatars/sunny.png" alt="John Doe"
						class="online" />
				</a>
					<ul class="dropdown-menu pull-right">
						<li><a href="javascript:void(0);"
							class="padding-10 padding-top-0 padding-bottom-0"><i
								class="fa fa-cog"></i> Setting</a></li>
						<li class="divider"></li>
						<li><a href="profile.html"
							class="padding-10 padding-top-0 padding-bottom-0"> <i
								class="fa fa-user"></i> <u>P</u>rofile
						</a></li>
						<li class="divider"></li>
						<li><a href="javascript:void(0);"
							class="padding-10 padding-top-0 padding-bottom-0"
							data-action="toggleShortcut"><i class="fa fa-arrow-down"></i>
								<u>S</u>hortcut</a></li>
						<li class="divider"></li>
						<li><a href="javascript:void(0);"
							class="padding-10 padding-top-0 padding-bottom-0"
							data-action="launchFullscreen"><i class="fa fa-arrows-alt"></i>全屏</a>
						</li>
						<li class="divider"></li>
						<li><a href="/login"
							class="padding-10 padding-top-5 padding-bottom-5"
							data-action="userLogout"><i class="fa fa-sign-out fa-lg"></i>
								<strong>注销登录</strong></a></li>
					</ul></li>
			</ul>

			<!-- logout button -->
			<div id="logout" class="btn-header transparent pull-right">
				<span> <a href="/logout" title="注销登录"
					data-action="userLogout" data-logout-msg="是否注销登录？"><i
						class="fa fa-sign-out"></i></a>
				</span>
			</div>
			<!-- end logout button -->

			<!-- search mobile button (this is hidden till mobile view port) -->
			<div id="search-mobile" class="btn-header transparent pull-right">
				<span> <a href="javascript:void(0)" title="Search"><i
						class="fa fa-search"></i></a>
				</span>
			</div>
			<!-- end search mobile button -->

			<!-- fullscreen button -->
			<div id="fullscreen" class="btn-header transparent pull-right">
				<span> <a href="javascript:void(0);"
					data-action="launchFullscreen" title="全屏"><i
						class="fa fa-arrows-alt"></i></a>
				</span>
			</div>
			<!-- end fullscreen button -->
		</div>
		<!-- end pulled right: nav area -->

	</header>
	<!-- END HEADER -->

	<!-- MAIN PANEL -->
	<div id="main" role="main">

		<!-- MAIN CONTENT -->
		<div id="content">
			<div id="main-content">
				<div id="show-map"></div>
				<div id="choose-data">
					<div id="data-quality">
						<h3>GPS数据质量</h3>
						<fieldset>
							<form class="smart-form">
								<label class="label" style="color:lightcoral">评价指标</label> <label
									class="toggle state-error"> <input type="checkbox"
									name="indicator" value="repeatRate" checked="checked">
									<i data-swchon-text="ON" data-swchoff-text="OFF"></i>重复率
								</label> <label class="toggle state-error"> <input
									type="checkbox" name="indicator" value="highActiveRate">
									<i data-swchon-text="ON" data-swchoff-text="OFF"></i>高频活跃车辆比
								</label> <label class="toggle state-error"> <input
									type="checkbox" name="indicator" value="gpsDensity"> <i
									data-swchon-text="ON" data-swchoff-text="OFF"></i>GPS密度
								</label>
							</form>
						</fieldset>
						<br />
						<div class="form-group" id="myForm1">
							<label>公司数据质量（Top5）</label>
							<form class="smart-form">
								<div class="inline-group">
									<label class="radio"> <input type="radio"
										name="quality" value=1 checked="checked"> <i></i>优质
									</label> <label class="radio"> <input type="radio"
										name="quality" value=2> <i></i>劣质
									</label>
								</div>
							</form>
							<select class="form-control" id="select-1">
							</select>
						</div>
					</div>
					<div id="base-info">
						<br />
						<h3>查看GPS</h3>
						<div class="form-group" id="myForm2">
							<div>
								<select class="form-control" id="date-select">
								</select>
							</div>
							<br />

							<div>
								<select class="form-control" id="select-2">
									<!-- <option value='' disabled selected style='display:none;'>选择车辆</option> -->
								</select>
							</div>
							<br />
							<div class="preloader-wrapper small active pull-left" id="date-load">
								<div class="spinner-layer spinner-blue-only">
									<div class="circle-clipper left">
										<div class="circle"></div>
									</div>
									<div class="gap-patch">
										<div class="circle"></div>
									</div>
									<div class="circle-clipper right">
										<div class="circle"></div>
									</div>
								</div>
							</div>
							<button class="btn btn-primary pull-right" onclick="showMap()">查看</button>
						</div>
					</div>
				</div>
				<div id="param">
					<table class="col-sm-8 col-sm-offset-2">
						<thead>
							<tr>
								<th id="my_th">重复数据上传数占比</th>
								<th id="my_th">高频活跃车辆数占比</th>
								<th id="my_th">数据密度</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div class="bar-holder">
										<div class="progress progress-ra" rel="tooltip"
											data-placement="top">
											<div class="progress-bar bg-color-teal" id="repeat_rate"
												data-placement="top"></div>
										</div>
									</div>
								</td>
								<td>
									<div class="bar-holder">
										<div class="progress progress-ha" rel="tooltip"
											data-placement="top">
											<div class="progress-bar bg-color-teal" id="high_active"
												data-placement="top"></div>
										</div>
									</div>
								</td>
								<td>
									<div class="bar-holder">
										<div class="progress progress-gd" rel="tooltip"
											data-placement="top">
											<div class="progress-bar bg-color-teal" id="gps_density"
												aria-valuetransitiongoal=""></div>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<!-- END MAIN CONTENT -->

	</div>
	<!-- END MAIN PANEL -->

	<!-- PAGE FOOTER -->
	<div class="page-footer ">
		<div class="row ">
			<div class="col-xs-12 col-sm-6 ">
				<span class="txt-color-white ">EasyCar 1.0<span
					class="hidden-xs "> - 租赁车数据可视化分析系统</span> © 2016-2017
				</span>
			</div>
		</div>
	</div>
	<!-- END PAGE FOOTER -->

	<!--================================================== -->

	<!-- PACE LOADER - turn this on if you want ajax loading to show (caution: uses lots of memory on iDevices)-->
	<script data-pace-options='{ "restartOnRequestAfter ": true }'
		src="../static/js/plugin/pace/pace.min.js "></script>

	<!-- Link to Google CDN's jQuery + jQueryUI; fall back to local -->
	<script src="../static/js/libs/jquery-2.1.1.min.js "></script>

	<script src="../static/js/libs/jquery-ui-1.10.3.min.js "></script>

	<!-- IMPORTANT: APP CONFIG -->
	<script src="../static/js/app.config.js "></script>

	<!-- JS TOUCH : include this plugin for mobile drag / drop touch events-->
	<script
		src="../static/js/plugin/jquery-touch/jquery.ui.touch-punch.min.js "></script>
		
	<script src="../static/js/materialize.min.js" charset="utf-8"></script>

	<!-- BOOTSTRAP JS -->
	<script src="../static/js/bootstrap/bootstrap.min.js "></script>

	<!-- JQUERY VALIDATE -->
	<script
		src="../static/js/plugin/jquery-validate/jquery.validate.min.js "></script>

	<!-- browser msie issue fix -->
	<script src="../static/js/plugin/msie-fix/jquery.mb.browser.min.js "></script>

	<!-- FastClick: For mobile devices -->
	<script src="../static/js/plugin/fastclick/fastclick.min.js "></script>

	<!-- MAIN APP JS FILE -->
	<script src="../static/js/app.min.js "></script>

	<!-- PAGE RELATED PLUGIN(S) -->
	<script
		src="../static/js/plugin/bootstrap-progressbar/bootstrap-progressbar.min.js"></script>

	<!-- map -->
	<script type="text/javascript"
		src="http://api.map.baidu.com/api?v=2.0&ak=1XjLLEhZhQNUzd93EjU5nOGQ"></script>

	<script src="../static/js/echarts.min.js "></script>

	<script
		src="../static/js/bootstrap-datetimepicker/bootstrap-datetimepicker.js"></script>
	<script
		src="../static/js/bootstrap-datetimepicker/bootstrap-datetimepicker.fr.js"></script>

	<!-- import my js -->
	<script src="../static/js/page/trajectory.js"></script>

	<script>
		$(document).ready(function() {
	
			// DO NOT REMOVE : GLOBAL FUNCTIONS!
			pageSetUp();
		});
	</script>

	<!-- Your GOOGLE ANALYTICS CODE Below -->
	<script type="text/javascript">
		var _gaq = _gaq || [];
		_gaq.push([ '_setAccount', 'UA-XXXXXXXX-X' ]);
		_gaq.push([ '_trackPageview' ]);
	
		(function() {
			var ga = document.createElement('script');
			ga.type = 'text/javascript';
			ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(ga, s);
		})();
	</script>

</body>

</html>