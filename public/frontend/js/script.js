	var detectDevice = function(){
		this.$windowEl = $('window');
		this.$body = $('body');
		this.init();
	};

	detectDevice.prototype = {
		init: function () {
			this.isMobile();
			this.detectDevice();
		},
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    isMobile: function() {
	        return (detectDevice.prototype.Android() || detectDevice.prototype.BlackBerry() || detectDevice.prototype.iOS() || detectDevice.prototype.Opera() || detectDevice.prototype.Windows());
		},
        detectDevice: function () {
            var self = this;
			(detectDevice.prototype.isMobile()) ? self.$body.addClass('mobile') : '';
	    }
	};

	var animateOnScroll = function () {
		this.$revealOnScroll = $('.revealOnScroll');
		this.$sections = $('section');
		this.$menu = $('#menu');
		this.$menuBtn = this.$menu.find('nav ul li');
		this.$menuBtnLink = $('a.animatedBtn');
		this.$services = $('#services');

		this.activeMenu;
        this.scroll = false;
        this.orientation;
        this.state;
        this.preload = 1;

		this.init();
	};

	animateOnScroll.prototype = {
		init: function () {
			var self = this;
            self.checkOrientation();
            self.bindEvents();
//			(window.location.hash == '#fullHome' || window.location.hash == '' ) ? self.$menu.fadeOut(1000) : self.$menu.fadeIn(1000);

		},
		bindEvents: function () {
			var self = this;

            self.scollEl(self.$revealOnScroll);
            $(document).on('scroll', function (){
                self.scollEl(self.$revealOnScroll);
                self.visibleContent();
            });
			$(window).resize(function() {
                self.checkOrientation();
                self.scollEl(self.$revealOnScroll);
	        });
			self.$menuBtnLink.on('click', function(e){
				e.preventDefault();
				var $activeItem = $(this);
	            self.animateMenuClick($activeItem);
			});
			$(window).on('hashchange', function() {
				(window.location.hash == '#fullHome' || window.location.hash == '' ) ? self.$menu.fadeOut(1000) : self.$menu.fadeIn(1000);
			});
		},
		checkOrientation: function () {
            var self = this;
			return (window.innerHeight > window.innerWidth) ? self.orientation = 'portrait' : self.orientation = 'landscape';
		},
		activeBtn: function ($activeItem) {
			var self = this;
			self.$menuBtn.removeClass('active');
			$activeItem.addClass('active');
		},
		visibleContent: function () {
			var self = this;
				self.$menuBtnLink.each(function (i) {
					if($(this).attr('href').match('#')) {
                        self.activeMenu = $(this).attr('href').substring($(this).attr('href').indexOf('#'));
                        if(self.activeMenu) {
							if($(self.activeMenu).offset().top <= ( $(window).scrollTop() + (self.$menu.height() * 2) )) {
		                        self.activeBtn($(this).parent());
							}
                        }
					}
				});
		},
		animateMenuClick: function ($activeItem) {
			var self = this;
			    var target = $( $activeItem.attr('href').substring( $activeItem.attr('href').indexOf('#')) );
			    if( target.length ) {
			        $('html, body').animate({
			            scrollTop: target.offset().top - self.$menu.height()
			        }, 1000, function(){
			        	window.location.hash = $activeItem.attr('href').substring( $activeItem.attr('href').indexOf('#'));
			        });
			    }
		},
		scollEl: function ($listElements) {
			var self = this,
				$notAnimated = $listElements.not('.animated');

			if($notAnimated.length > 0) {
				$notAnimated.each(function (i) {
					if(!$(this).hasClass('animated') && $(this).offset().top <= ( $(window).scrollTop() + (window.innerHeight / 2) )) {
                        self.animateOnScroll($(this));
					}
				});
			}
		},
		animateOnScroll: function ($currentElem, $loaded) {
            $currentElem.addClass('animated ' + $currentElem.data('animation'));
//            ($currentElem.attr('data-resetAnimation') == 'true') ? $currentElem.removeClass('animated') : ;
		}
	};

(function ($) {
	"use strict";

    var nua = navigator.userAgent;
    var is_android = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));

/**************************************************
***					Height
**************************************************/

    var documentHeight = function(){
		this.$window = $(window);
		this.$body = $('body');
		this.$loader = $('#loader');
		this.$menu = $('#menu');
		this.$container = $('section, footer');
		this.$home = $('section#fullHome');
		this.$footer = $('footer');

		this.init();
	};

	documentHeight.prototype = {
			init: function(){
				this.setHeight();
				this.bindEvents();
//				this.removeLoader();
			},
			bindEvents: function(){
				var self = this;
				self.resize();
			},
			setHeight: function(){
                var self = this;
            	self.$container.height(self.$window.height() - self.$menu.height());
            	self.$home.height(self.$window.height());
			},
			resize: function(){
                var self = this;
                self.$window.on('resize', function(){
                	self.setHeight();
                });
			},
			removeLoader: function(){
				var self = this;
                setTimeout(function(){
					self.$body.removeClass('loading');
					self.$loader.fadeOut(1000, function(){
						self.$loader.remove();
					});
                },3000);
			}
	}

    var nua = navigator.userAgent;
    var is_android = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));

    var swipeText = function(widgetEl){
        this.$container = $(widgetEl);
        this.$cont = this.$container.find('.sliderCont');
        this.$list = this.$cont.find('ul#backImages');
        this.$items = this.$list.find('li');
        this.$currentEl = this.$list.find('li.currentEl');
        this.$previousEl = this.$list.find('li.previousEl');
        this.$nextEl = this.$list.find('li.nextEl');
        /* Swipeable Element */
        this.$swipeableEl = this.$cont.find('#swipeMe');
        /* Pagination */
        this.$paginator = this.$cont.find('#sliderPaginator');
        this.$currentIndex = this.$paginator.find('.currentIndex');
        this.$sliderSize = this.$paginator.find('.sliderSize');
        /* Slider Content */
        this.$sliderDescription = this.$container.find('.sliderDescription');
        /* List Elements */
        this.$dataItems = this.$cont.find('#listItems');
        this.$listItems = this.$dataItems.find('li');
        this.$lastItem = this.$listItems.last().index();
        this.$indexImage = 0;

        this.mouseStart;
        this.mouseEnd;
        this.xMove = 0;
        this.endTransition = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
        this.matchTransform = /matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/;


        this.$currentItem = 1;
        this.$preventTouch = false;
        this.$itemHeight;
        this.$newHeight = this.$items.outerHeight();
        this.$totalWidth = 0;
        this.$startPos = 0;

        this.windowHeight;
        this.leftRight;
        this.replaceImg;
        this.itemHeight = 0;

        this.init();
    };


    swipeText.prototype = {
        init: function(){
            var total = 0,
                self = this;
            self.numerateItems();
            self.lazyLoad(self.$listItems);
            self.itemHeightMax();
            self.resize();
            self.detectOrientation();
            self.bindEvents();
        },
        numerateItems: function () {
            var self = this;
//            self.$listItems.eq(this.$lastItem).prependTo(this.$listItems.parent());
            self.$listItems.first().addClass('active');
            self.$sliderSize.text(self.$lastItem + 1);
            self.$listItems.attr('data-size', (self.$lastItem));
            $.each(this.$listItems, function(i){
                $(this).attr('data-index', ( parseInt(i) ));
            });
        },
        itemHeightMax: function () {
            var self = this;
            $.each(this.$items, function(i){
                ($(this).outerHeight() > self.itemHeight) ? self.itemHeight = $(this).outerHeight() : '';
            });
        },
        detectOrientation: function () {
            var self = this;
            this.$setOrientation = function() {
                if (window.orientation === undefined) { return; }   // Desktop
                (Math.abs(window.orientation) == 90) ? $(document).triggerHandler('horizontalOr') : $(document).triggerHandler('verticalOr');
            };
            var orientationEvent = "onorientationchange" in window ? "orientationchange" : "resize";
            window.addEventListener(orientationEvent, this.$setOrientation, false);
            $(window).resize(function() {
                self.resize();
            });
        },
        resize: function () {
            var self = this;
            self.windowHeight = window.innerHeight;
            self.$cont.css({
                'height' : self.itemHeight
            });
            self.loadImages();
        },
        loadImages: function () {
            var self = this;
            this.$currentEl.css({
                "background-image": 'url(' + this.$listItems.eq(self.$indexImage).attr('data-url') + ')',
                "background-position": this.$listItems.eq(self.$indexImage).attr('data-position')
            }).attr('data-index', self.$indexImage).text(this.$listItems.eq(self.$indexImage).attr('data-title'));
            if (self.$sliderDescription) {
                self.$sliderDescription.fadeOut("slow", function() {
                    $(this).children().remove();
                    self.$sliderDescription.fadeIn().append(self.$listItems.eq(self.$indexImage).data('content'));
                });
            }
            self.$currentIndex.text(self.$indexImage + 1);
            self.$items.css({"transform": "translate3d( 0, 0, 0)"});

            this.$items.width(self.windowWidth).css({ right: self.windowWidth, "transform": "translate3d( 0, 0, 0)" });
            this.$previousEl.css({
                "background-image": 'url(' + this.$listItems.eq(self.$indexImage - 1).attr('data-url') + ')',
                "background-position": this.$listItems.eq(self.$indexImage - 1).attr('data-position')
            }).text(this.$listItems.eq(self.$indexImage - 1).attr('data-title'));
            if (self.$lastItem == self.$indexImage) {
                this.$nextEl.css({
                    "background-image": 'url(' + this.$listItems.eq(0).attr('data-url') + ')',
                    "background-position": this.$listItems.eq(0).attr('data-position')
                }).text(this.$listItems.eq(0).attr('data-title'));
            } else {
                this.$nextEl.css({
                    "background-image": 'url(' + this.$listItems.eq(self.$indexImage + 1).attr('data-url') + ')',
                    "background-position": this.$listItems.eq(self.$indexImage + 1).attr('data-position')
                }).text(this.$listItems.eq(self.$indexImage + 1).attr('data-title'));
            }
        },
        bindEvents: function () {
            var self = this,
                itemsN = 0,
                firstLoad = true;
            
            $(document).on('horizontalOr verticalOr', function(){
                self.resize();
            });

            self.$swipeableEl.find('.prev').on('click touchstart', function(e){
                e.preventDefault();
                e.stopPropagation();
                self.activateSwipe('-', 'next');
            });
            self.$swipeableEl.find('.next').on('click touchend', function(e){
                e.preventDefault();
                e.stopPropagation();
                self.activateSwipe('+', 'prev ');
            });

            self.$listItems.on('click', function (){
                if(!$(this).hasClass('active')){
                    var newIndex = parseInt($(this).attr('data-index')) + 1,
                        active = parseInt(self.$dataItems.find('.active').attr('data-index')) + 1,
                        count = Math.abs(newIndex - active),
                        direction,
                        math;
                    (active > newIndex) ? self.leftRight = 'prev' : self.leftRight = 'next';
                    (self.leftRight == 'prev') ? self.replaceImg = '+' : self.replaceImg = '-' ;
                    (function foundItem (i) {
                      setTimeout(function () {
                        self.activateSwipe(self.replaceImg, self.leftRight);
                        if (--i) {
                          foundItem(i);
                        }
                      }, 400);
                    })(count);
                }
            });

            /**************************************************
            **              Start Touch Events
            **************************************************/

            var getPointerEvent = function(e) {
                return e.originalEvent.targetTouches ? e.originalEvent.changedTouches[0] : e;
            };

            this.$swipeableEl.on('touchstart mousedown',function(e){
                (!self.$items.hasClass('animate')) ? self.$preventTouch = true : self.$preventTouch = false;
                if(self.$preventTouch){
                    var touch = getPointerEvent(e);
                    self.$swipeableEl.css({ 'cursor': '-webkit-grabbing' })

                    e.preventDefault();
                    self.mouseStart = touch.pageX;
                    self.mouseStartY = touch.pageY;
                }
            });
            this.$swipeableEl.on('touchmove mousemove ',function(e){
                if(self.$preventTouch){
                    var touch = getPointerEvent(e);

                    e.preventDefault();
                    var dist = Math.abs(touch.pageX - self.mouseStart);
                    var distY = Math.abs(touch.pageY - self.mouseStartY);
                    (distY > dist) ? $(window).scrollTop($(window).scrollTop() + (self.mouseStartY - touch.pageY)) : self.$items.css({"transform": "translate3d(" + ( self.xMove + touch.pageX - self.mouseStart ) + "px, 0, 0)"});
                }
            });
            this.$swipeableEl.on('touchend mouseup',function(e){
                if(self.$preventTouch){
                    var touch = getPointerEvent(e);

                    var dist = Math.abs(touch.pageX - self.mouseStart);
                    var distY = Math.abs(touch.pageY - self.mouseStartY);
                    e.preventDefault();
                    e.stopPropagation();
                    self.mouseEnd = touch.pageX;             // Define Global Var for X Position on TouchEnd Event

                    self.xMove = self.mouseEnd - self.mouseStart;  // Get Start/End Mouse events to calculate swipe.

                    // If the touch movement is equal than 0 pixels make go to the element url
                    if ((touch.pageX - self.mouseStart) == 0) {
                        self.resetSwipe('animate');
                    }
                    if( self.xMove > 50) { self.activateSwipe('+', 'prev'); }
                    else if ( self.xMove < -50 ) { self.activateSwipe('-', 'next'); }
                    else { self.resetSwipe('animate'); }
                    (distY > dist || (touch.pageX - self.mouseStart) == 0) ? self.$items.removeClass('animate') : '';
                    self.xMove = 0;
                    self.$preventTouch = false;
                    self.$swipeableEl.css({ 'cursor': '-webkit-grab' })
                }
            });
            /**************************************************
            **              End Touch Events
            **************************************************/
        },
        activateSwipe: function (leftRight, replaceImg) {
            var self = this;
            self.imgDir = replaceImg;
            this.$currentEl.addClass("animate").css({"transform": "translate3d("+ ( leftRight + self.$items.width()) +"px, 0, 0)"}).on(self.endTransition, function(e){
                self.setIndex();
                self.$items.removeClass('animate');
                $(this).off(self.endTransition);
            });
            this.$previousEl.addClass("animate").css({"transform": "translate3d("+ ( leftRight + self.$items.width()) +"px, 0, 0)"});
            this.$nextEl.addClass("animate").css({"transform": "translate3d("+ ( leftRight + self.$items.width()) +"px, 0, 0)"});
        },
        resetSwipe: function (animate) {
            var self = this;
            self.$items.addClass(animate).css({"transform": "translate3d( 0, 0, 0)"}).on(self.endTransition, function(e){
                (self.$currentEl.hasClass('animate')) ? self.$items.removeClass('animate') : '';
                $(this).off(self.endTransition);
            });
        },
        setIndex: function () {
            var self = this;
            var currentItem = self.$currentEl.attr('data-index');
            if (self.imgDir == 'prev' ) {
                (currentItem == 0) ? self.setImage(parseInt('0'), '-') : self.setImage(self.$indexImage, '-');
            } else {
                (currentItem >= self.$lastItem) ? self.setImage(parseInt(self.$lastItem), '+') : self.setImage(self.$indexImage, '+');
            }
        },
        setImage: function (firstEl, direction) {
            var self = this;

            self.$listItems.removeClass('active');
            if (self.imgDir == 'prev' ) {
                (firstEl == 0) ? self.$indexImage = self.$lastItem : self.$indexImage = (parseInt(self.$indexImage) - 1);
                self.$listItems.eq(self.$indexImage).addClass('active');
            } else {
                (firstEl == self.$lastItem) ? self.$indexImage = 0 : self.$indexImage = (parseInt(self.$indexImage) + 1);
                self.$listItems.eq(self.$indexImage).addClass('active');
            }

            if(is_android){
                setTimeout(function(){
                    self.loadImages();
                },200);
            } else {
                self.loadImages();
            }
        },
        play: function (widgetEl, leftRight, replaceImg, delay) {
/*
** Forward : leftRight: '-' / replaceImg: 'next'
** Backward : leftRight: '+' / replaceImg: 'prev'
*/
            var self = this;

            this.$container = $(widgetEl);
            this.$cont = this.$container.find('.sliderCont');
            this.$list = this.$cont.find('ul#backImages');
            this.$items = this.$list.find('li');
            this.$currentEl = this.$list.find('li.currentEl');
            this.$previousEl = this.$list.find('li.previousEl');
            this.$nextEl = this.$list.find('li.nextEl');
            /* Swipeable Element */
            this.$swipeableEl = this.$cont.find('#swipeMe');
            /* Pagination */
            this.$paginator = this.$cont.find('#sliderPaginator');
            this.$currentIndex = this.$paginator.find('.currentIndex');
            this.$sliderSize = this.$paginator.find('.sliderSize');
            /* List Elements */
            this.$dataItems = this.$cont.find('#listItems');
            this.$listItems = this.$dataItems.find('li');
            this.$lastItem = this.$listItems.last().index();
            this.$indexImage = 0;

            this.mouseStart;
            this.mouseEnd;
            this.xMove = 0;
            this.endTransition = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
            this.matchTransform = /matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/;


            this.$currentItem = 1;
            this.$preventTouch = false;
            this.$itemHeight;
            this.$newHeight = this.$items.outerHeight();
            this.$totalWidth = 0;
            this.$startPos = 0;
            this.$play;
            this.$swipeableEl.on('touchstart',function(e){
                clearTimeout(self.play);
            });

            self.play = window.setInterval(function(){
                self.activateSwipe(leftRight, replaceImg);
            },delay);
        },
        showImage: function ($img) {
               $img.fadeIn();
        },
        lazyLoad: function ($listElements) {
            var self = this;

            $listElements.each(function () {
                var $this = $(this),
                    $currentElem = $this;

                if(!$this.hasClass('img-loaded')) {
                    $this.on('load', function() { self.showImage($currentElem);  })
                        .attr('style', $currentElem.attr('data-inlineStyle'));
                    $this.addClass('img-loaded');
                }
            });
        }
    };

	$(document).ready(function () {
		var DetectDevice = new detectDevice();
		var AnimateOnScroll = new animateOnScroll();
	});

var streaming = [{
		"name": "Los Simpsons",
		"canal": "Fox",
		"days": "Lunes a Viernes",
		"hour": "20:30",
		"image" : "css/images/simpsons.jpg",
		"ranking" : "20",
		"videoId" : "padrino",
		"recomended" : 1
    },{
        "canal": "Warner",
        "name": "The big bang theory",
        "days": "Lunes a Viernes",
        "hour": "20:00",
		"image" : "css/images/simpsons.jpg",
		"ranking" : "10",
		"videoId" : "padrino",
 		"recomended" : 1
   },{
        "canal": "cinecanal",
		"name": "El Padrino",
		"days": "Jueves",
		"hour": "22:00",
		"image" : "css/images/simpsons.jpg",
		"ranking" : "25",
		"videoId" : "padrino",
		"recomended" : 1
	}];

streaming.sort(function(a, b){
    return b.ranking - a.ranking;
});
$(streaming).each(function (i) {
    var output = '<li data-videoid="' + this.videoId + '" data-url="' + this.image + '" data-days="' + this.days + '" data-hour="' + this.hour + '" data-canal="' + this.canal + '" data-position="50% 0%" data-index="" data-size="" data-title="' + this.name + '"></li>';
    $('#masvisto #listItems').append(output);
});
$(streaming).each(function (i) {
    var output = '<li data-videoid="' + this.videoId + '" data-url="' + this.image + '" data-days="' + this.days + '" data-hour="' + this.hour + '" data-canal="' + this.canal + '" data-position="50% 0%" data-index="" data-size="" data-title="' + this.name + '"></li>';
    $('#recomended #listItems').append(output);
});

$("#search").one('focus', function() {
	$(streaming).each(function () {
	    var output = '<li data-href="' + this.videoId + '">' +
					'<img alt="' + this.name + '" src="' + this.image + '" />' +
					'<div class="resultDescription">' +
						'<h3 class="title">' + this.name + '</h3>' +
						'<p class="canal">' + this.canal + '</p>' +
						'<p><span class="date">' + this.days + '</span><span class="hour">' + this.hour + '</span></p>' +
					'</div>' +
				'</li>';
	    $('#placeholder').hide().append(output);
	});
});
$('#search').keydown(function () {
    var yourtext = $(this).val();
    if (yourtext.length > 0) {
		$('#placeholder').show();
        var abc = $("li").filter(function () {
            var str = $(this).text();
            var re = new RegExp(yourtext, "i");
            var result = re.test(str);
            if (!result) {
                return $(this);
            }
        }).hide();
    } else {
		$('#placeholder').hide();
		$('li').show();
    }
});

    $(document).ready(function () {
        var SwipeText = new swipeText('#masvisto');
        var SwipeText = new swipeText('#recomended');
        // var SwipeText = new swipeText('#curriculum');
        // var SwipeText = new swipeText('.gallery');
        swipeText.prototype.play('#masvisto', '-','next',5000);
        // $('.gallery ul li .element').on('click touchstart', function(){
        //     $('.gallery .overlay').addClass('active').fadeIn();
        // });
        // $('.gallery .overlay .close').on('click touchstart', function(){
        //     $('.gallery .overlay').removeClass('active').fadeOut();
        // });
	});

})(jQuery);

