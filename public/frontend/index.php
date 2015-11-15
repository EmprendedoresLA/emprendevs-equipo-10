<!doctype html>
<html>

	<head>
		<title>StreamTV</title>

		<meta charset="utf-8"/>   
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<meta property="og:type" content="website" />
		<meta property="og:url" content="http://www.altamarsa.com/maslow/"/>
		<meta property="og:image" content="http://www.altamarsa.com/maslow/css/images/logoColor.png" />
		<meta property="og:title" content="Altamar S.A."/>
		<meta property="og:description" content="Atendendemos las necesidades de buques de ultramar y fluvial, para lo cual capacitamos permanentemente a nuestro personal e incorporamos recursos tecnológicos de avanzada."/>

		
		<link rel="stylesheet" type="text/css" href="css/reset.css"/>
		<link rel="stylesheet" type="text/css" href="css/animate.css"/>
		<link rel="stylesheet" type="text/css" href="css/base.css"/>
		<link rel="stylesheet" type="text/css" href="css/stream.css"/>
		<link rel="stylesheet" type="text/css" href="css/fixedMenu.css"/>
	</head>

	<body class="loading1">
		<section id="menu">
			<header>
				<h1 class="logo">
					SteamingTV
				</h1>
				<div id="menuButton">
					<div id="menu">
						<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
							<path class="menuLines" d="M19 17h-14c-1.103 0-2 0.897-2 2s0.897 2 2 2h14c1.103 0 2-0.897 2-2s-0.897-2-2-2z" fill="#444444"></path>
							<path class="menuLines" d="M19 10h-14c-1.103 0-2 0.897-2 2s0.897 2 2 2h14c1.103 0 2-0.897 2-2s-0.897-2-2-2z" fill="#444444"></path>
							<path class="menuLines" d="M19 3h-14c-1.103 0-2 0.897-2 2s0.897 2 2 2h14c1.103 0 2-0.897 2-2s-0.897-2-2-2z" fill="#444444"></path>
						</svg>
					</div>
					<div id="emptyLeft"></div>
				</div>
			</header>
			<nav>
				<ul>
					<li>
						<a href="index.php">Inico</a>
					</li>
					<li>
						<a href="index.php#perfil">Perfil</a>
					</li>
					<li>
						<a href="index.php#favoritos">Favoritos</a>
					</li>
					<li>
						<a href="index.php#historial">Historial</a>
					</li>
					<li>
						<a href="index.php#social">Social</a>
					</li>
					<li>
						<a href="index.php#alertas">Alertas</a>
					</li>
					<li>
						<a href="logout.php">Cerrar Sesion</a>
					</li>
				</ul>
			</nav>
		</section>
		<div id="content">
			<section id="masvisto" class="sliderWidget revealOnScroll" data-animation="zoomInDown" data-timeout="800">
				<h2 class="title">Lo mas visto</h2>
				<div class="sliderCont">
					<ul id="backImages">
						<span class="prev"></span>
					    <li class="previousEl"></li>
					    <li class="currentEl"></li>
					    <li class="nextEl"></li>
						<span class="next"></span>
					</ul>
					<div id="swipeMe">
						<p id="sliderPaginator">
				            <span class="whiteArrow"></span>
				            <span class="currentIndex">1</span>/<span class="sliderSize"></span>
				            <span class="whiteArrow right"></span>
				        </p>
					</div>
					<ul id="listItems">
					</ul>
				</div>
			</section>
			<section class="search revealOnScroll" data-animation="fadeInUp" data-timeout="800">
				<div id="videos">
				<label class="title" for="search">Quiero ver</label>
				<input type="search" name="search" id="search" value="" />
					<ul id="placeholder" class="list"></ul>
				</div>
			</section>
			<section id="recomended" class="sliderWidget revealOnScroll" data-animation="fadeInDown" data-timeout="800">
				<h2 class="title">Recomendacion</h2>
				<div class="sliderCont">
					<ul id="backImages">
						<span class="prev"></span>
					    <li class="previousEl"></li>
					    <li class="currentEl"></li>
					    <li class="nextEl"></li>
						<span class="next"></span>
					</ul>
					<div id="swipeMe">
						<p id="sliderPaginator">
				            <span class="whiteArrow"></span>
				            <span class="currentIndex">1</span>/<span class="sliderSize"></span>
				            <span class="whiteArrow right"></span>
				        </p>
					</div>
					<ul id="listItems">
					</ul>
				</div>
			</section>
			<footer></footer>
		</div>

		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/script.js"></script>
		<script type="text/javascript" src="js/fixedMenu.js"></script>
		<script type="text/javascript" src="js/home.js"></script>

	</body>

</html>