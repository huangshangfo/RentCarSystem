<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en-us">

	<head>
		<meta charset="utf-8">
		<!--<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">-->

		<title> EasyCar </title>

		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

		<!-- Basic Styles -->
		<link rel="stylesheet" type="text/css" media="screen" href="../static/css/bootstrap.css">
		<link rel="stylesheet" type="text/css" media="screen" href="../static/css/font-awesome.min.css">

		<!-- SmartAdmin Styles : Caution! DO NOT change the order -->
		<link rel="stylesheet" type="text/css" media="screen" href="../static/css/smartadmin-production-plugins.min.css">
		<link rel="stylesheet" type="text/css" media="screen" href="../static/css/smartadmin-production.min.css">
		<link rel="stylesheet" type="text/css" media="screen" href="../static/css/smartadmin-skins.min.css">

		<!-- SmartAdmin RTL Support  -->
		<link rel="stylesheet" type="text/css" media="screen" href="../static/css/smartadmin-rtl.min.css">

		<!-- We recommend you use "your_style.css" to override SmartAdmin
		     specific styles this will also ensure you retrain your customization with each SmartAdmin update.
		<link rel="stylesheet" type="text/css" media="screen" href="../static/css/your_style.css"> -->

		<!-- Demo purpose only: goes with demo.js, you can delete this css when designing your own WebApp -->
		<link rel="stylesheet" type="text/css" media="screen" href="../static/css/demo.min.css">

		<!-- My style css -->
		<link rel="stylesheet" type="text/css" media="screen" href="../static/css/my_style.css">

		<!-- FAVICONS -->
		<link rel="shortcut icon" href="../static/img/favicon/favicon.ico" type="image/x-icon">
		<link rel="icon" href="../static/img/favicon/favicon.ico" type="image/x-icon">

		<!-- GOOGLE FONT -->
		<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700">

		<!-- Specifying a Webpage Icon for Web Clip 
			 Ref: https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html -->
		<link rel="apple-touch-icon" href="../static/img/splash/sptouch-icon-iphone.png">
		<link rel="apple-touch-icon" sizes="76x76" href="../static/img/splash/touch-icon-ipad.png">
		<link rel="apple-touch-icon" sizes="120x120" href="../static/img/splash/touch-icon-iphone-retina.png">
		<link rel="apple-touch-icon" sizes="152x152" href="../static/img/splash/touch-icon-ipad-retina.png">

		<!-- iOS web-app metas : hides Safari UI Components and Changes Status Bar Appearance -->
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">

		<!-- Startup image for web apps -->
		<link rel="apple-touch-startup-image" href="../static/img/splash/ipad-landscape.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)">
		<link rel="apple-touch-startup-image" href="../static/img/splash/ipad-portrait.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)">
		<link rel="apple-touch-startup-image" href="../static/img/splash/iphone.png" media="screen and (max-device-width: 320px)">

	</head>

	<body class="">

		<!-- HEADER -->
		<header id="header">
			<div id="logo-group">
				<span id="logo"> <img src="../static/img/logo.png" alt="SmartAdmin"></span>
			</div>
			<!-- NAVIGATION -->
			<div class="navbar navbar-default pull-left">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
               			<span class="icon-bar"></span>
                   		<span class="icon-bar"></span>
           				<span class="icon-bar"></span>
                	</button>
				</div>
				<div class="navbar-collapse collapse navbar-right scroll-me">
					<ul class="nav navbar-nav ">
						<li>
							<a href="dataprofiling.jsp">数据概况</a>
						</li>
						<li>
							<a href="features.jsp">统计特征</a>
						</li>
						<li class="active">
							<a href="trajectory.jsp">轨迹展示</a>
						</li>
						<li>
							<a href="anomaly-detection.jsp">异常车辆检测</a>
						</li>
					</ul>
				</div>
			</div>
			<!-- NAVIGATION -->
			<!-- pulled right: nav area -->
			<div class="pull-right">

				<!-- #MOBILE -->
				<!-- Top menu profile link : this shows only when top menu is active -->
				<ul id="mobile-profile-img" class="header-dropdown-list hidden-xs padding-5">
					<li class="">
						<a href="#" class="dropdown-toggle no-margin userdropdown" data-toggle="dropdown">
							<img src="/static/leftmenu/img/avatars/sunny.png" alt="John Doe" class="online" />
						</a>
						<ul class="dropdown-menu pull-right">
							<li>
								<a href="javascript:void(0);" class="padding-10 padding-top-0 padding-bottom-0"><i class="fa fa-cog"></i> Setting</a>
							</li>
							<li class="divider"></li>
							<li>
								<a href="profile.html" class="padding-10 padding-top-0 padding-bottom-0"> <i class="fa fa-user"></i> <u>P</u>rofile</a>
							</li>
							<li class="divider"></li>
							<li>
								<a href="javascript:void(0);" class="padding-10 padding-top-0 padding-bottom-0" data-action="toggleShortcut"><i class="fa fa-arrow-down"></i> <u>S</u>hortcut</a>
							</li>
							<li class="divider"></li>
							<li>
								<a href="javascript:void(0);" class="padding-10 padding-top-0 padding-bottom-0" data-action="launchFullscreen"><i class="fa fa-arrows-alt"></i>全屏</a>
							</li>
							<li class="divider"></li>
							<li>
								<a href="/login" class="padding-10 padding-top-5 padding-bottom-5" data-action="userLogout"><i class="fa fa-sign-out fa-lg"></i> <strong>注销登录</strong></a>
							</li>
						</ul>
					</li>
				</ul>

				<!-- logout button -->
				<div id="logout" class="btn-header transparent pull-right">
					<span> <a href="/logout" title="注销登录" data-action="userLogout" data-logout-msg="是否注销登录？"><i class="fa fa-sign-out"></i></a> </span>
				</div>
				<!-- end logout button -->

				<!-- search mobile button (this is hidden till mobile view port) -->
				<div id="search-mobile" class="btn-header transparent pull-right">
					<span> <a href="javascript:void(0)" title="Search"><i class="fa fa-search"></i></a> </span>
				</div>
				<!-- end search mobile button -->

				<!-- fullscreen button -->
				<div id="fullscreen" class="btn-header transparent pull-right">
					<span> <a href="javascript:void(0);" data-action="launchFullscreen" title="全屏"><i class="fa fa-arrows-alt"></i></a> </span>
				</div>
				<!-- end fullscreen button -->
			</div>
			<!-- end pulled right: nav area -->

		</header>
		<!-- END HEADER -->
		
		<!-- MAIN PANEL -->
		<div id="mainbar" role="mainbar">

			<!-- MAIN CONTENT -->
			<div id="content">

				<!-- widget grid -->
				<section id="widget-grid" class="">

					<!-- row -->
					<div class="row">
						<article class="col-sm-12">
							<!-- new widget -->
							<div class="jarviswidget jarviswidget-color-blueDark" id="wid-id-5" data-widget-editbutton="false">
								<header>
									<span class="widget-icon"> 
										<i class="fa fa-map-marker txt-color-white"></i> 
									</span>
									<h2> GPS轨迹 </h2>
									<div class="widget-toolbar"></div>
								</header>
								<div>
									<div class="widget-body widget-hide-overflow no-padding">
										<div id="trail">
											<div id="show-map">

											</div>
											<div id="choose-data">
												<div class="form-group">
													<label>请选择日期:</label>
													<div class="input-group">
														<input type="text" name="mydate" placeholder="Select a date" class="form-control datepicker" data-dateformat="dd/mm/yy">
														<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													</div>

													<label>请选择车辆:</label>
													<div>
														<select class="form-control" id="select-1">
															<option>车辆1</option>
															<option>车辆2</option>
															<option>车辆3</option>
															<option>车辆4</option>
															<option>车辆5</option>
														</select>
													</div>
												</div>

											</div>
										</div>

									</div>
								</div>
						</article>
						</div>
						<!-- end row -->

						<!-- row -->
						<div class="row">
							<article class="col-sm-12">
								<!-- new widget -->
								<div class="jarviswidget jarviswidget-color-blueDark" id="wid-id-6" data-widget-editbutton="false">
									<header>
										<span class="widget-icon"> 
										<i class="fa fa-location-arrow txt-color-white"></i> 
									</span>
										<h2> OD分析 </h2>
										<div class="widget-toolbar"></div>
									</header>
									<div>
										<div class="widget-body widget-hide-overflow no-padding">
											<div id="show-od">
											</div>
										</div>
									</div>
								</div>
							</article>
						</div>
						<!-- end row -->

				</section>
				<!-- end widget grid -->

				</div>
				<!-- END MAIN CONTENT -->

			</div>
			<!-- END MAIN PANEL -->

			<!-- PAGE FOOTER -->
			<div class="page-footer ">
				<div class="row ">
					<div class="col-xs-12 col-sm-6 ">
						<span class="txt-color-white ">EasyCar 1.0<span class="hidden-xs "> - 租赁车数据可视化分析系统</span> © 2016-2017</span>
					</div>
				</div>
			</div>
			<!-- END PAGE FOOTER -->

			<!--================================================== -->

			<script src="../static/assets/js/echarts.js"></script>

			<!-- map -->
			<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=1XjLLEhZhQNUzd93EjU5nOGQ"></script>

			<!-- import trajectory.js-->
			<script src="../static/js/trajectory.js"></script>

			<script type="text/javascript" src="../static/data/od_demo.json"></script>

			<!-- PACE LOADER - turn this on if you want ajax loading to show (caution: uses lots of memory on iDevices)-->
			<script data-pace-options='{ "restartOnRequestAfter ": true }' src="../static/js/plugin/pace/pace.min.js "></script>

			<!-- Link to Google CDN's jQuery + jQueryUI; fall back to local -->
			<script src="../static/js/libs/jquery-2.1.1.min.js "></script>

			<script src="../static/js/libs/jquery-ui-1.10.3.min.js "></script>

			<!-- IMPORTANT: APP CONFIG -->
			<script src="../static/js/app.config.js "></script>

			<!-- JS TOUCH : include this plugin for mobile drag / drop touch events-->
			<script src="../static/js/plugin/jquery-touch/jquery.ui.touch-punch.min.js "></script>

			<!-- BOOTSTRAP JS -->
			<script src="../static/js/bootstrap/bootstrap.min.js "></script>

			<!-- CUSTOM NOTIFICATION -->
			<script src="../static/js/notification/SmartNotification.min.js "></script>

			<!-- JARVIS WIDGETS -->
			<script src="../static/js/smartwidgets/jarvis.widget.min.js "></script>

			<!-- EASY PIE CHARTS -->
			<script src="../static/js/plugin/easy-pie-chart/jquery.easy-pie-chart.min.js "></script>

			<!-- SPARKLINES -->
			<script src="../static/js/plugin/sparkline/jquery.sparkline.min.js "></script>

			<!-- JQUERY VALIDATE -->
			<script src="../static/js/plugin/jquery-validate/jquery.validate.min.js "></script>

			<!-- JQUERY MASKED INPUT -->
			<script src="../static/js/plugin/masked-input/jquery.maskedinput.min.js "></script>

			<!-- JQUERY SELECT2 INPUT -->
			<script src="../static/js/plugin/select2/select2.min.js "></script>

			<!-- JQUERY UI + Bootstrap Slider -->
			<script src="../static/js/plugin/bootstrap-slider/bootstrap-slider.min.js "></script>

			<!-- browser msie issue fix -->
			<script src="../static/js/plugin/msie-fix/jquery.mb.browser.min.js "></script>

			<!-- FastClick: For mobile devices -->
			<script src="../static/js/plugin/fastclick/fastclick.min.js "></script>

			<!--[if IE 8]>

		<h1>Your browser is out of date, please update your browser by going to www.microsoft.com/download</h1>

		<![endif]-->

			<!-- Demo purpose only -->
			<script src="../static/js/demo.min.js "></script>

			<!-- MAIN APP JS FILE -->
			<script src="../static/js/app.min.js "></script>

			<!-- ENHANCEMENT PLUGINS : NOT A REQUIREMENT -->
			<!-- Voice command : plugin -->
			<script src="../static/js/speech/voicecommand.min.js "></script>

			<!-- SmartChat UI : plugin -->
			<script src="../static/js/smart-chat-ui/smart.chat.ui.min.js "></script>
			<script src="../static/js/smart-chat-ui/smart.chat.manager.min.js "></script>

			<!-- PAGE RELATED PLUGIN(S) -->

			<!-- Vector Maps Plugin: Vectormap engine, Vectormap language -->
			<script src="../static/js/plugin/vectormap/jquery-jvectormap-1.2.2.min.js "></script>
			<script src="../static/js/plugin/vectormap/jquery-jvectormap-world-mill-en.js "></script>

			<script>
				$(document).ready(function() {

					// DO NOT REMOVE : GLOBAL FUNCTIONS!
					pageSetUp();
				});
			</script>

			<!-- Your GOOGLE ANALYTICS CODE Below -->
			<script type="text/javascript">
				var _gaq = _gaq || [];
				_gaq.push(['_setAccount', 'UA-XXXXXXXX-X']);
				_gaq.push(['_trackPageview']);

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