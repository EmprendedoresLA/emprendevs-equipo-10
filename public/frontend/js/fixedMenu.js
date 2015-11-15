(function () {
	"use strict";

    var nua = navigator.userAgent;
    var is_android = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));

/**************************************************
**				Start Fixed Menu
**************************************************/
	var fixedMenu = function(){
		this.$slideEl = $('.slide');								// Define Swipeable elements.
		this.$body = $('body');								// Define Swipeable elements.
		this.$containerEl = $('.wrapper');								// Define Swipeable elements.
		this.$contentEl = $('#menu, #container');								// Define Swipeable element.
		this.$header = $('header#menu');								// Define Swipeable element.
		this.$menuBtn = $('#menu-icon, .homeBtn, #menuButton');							// Define Clickeable button for show or hide menu content.
		this.$menuIcon = $('#menu-icon, #menuButton');							// Define Clickeable Icon button for show or hide menu content.
		this.$menuContent = $('#menu nav');									// Define Content Menu.
		this.$swipeableEl = $('#emptyLeft');								// Define Swipeable element.
		this.$subMenu = this.$menuContent.find('.subMenu');						// Define Sub-Menu Element.
		this.$menuList = this.$menuContent.find('ul li');						// Define Items from menu list.
		this.$menuContentChilds = this.$menuList.find('.subMenu');	// Define Menu and Sub-Menu Element.
		this.$menuSubEl = this.$menuContent.find('ul li .arrow');				// Define Items with sub items.
        this.$GUClose = $('#getupdates-close, #submit-button, #closeThankyou')
		this.$promotions = $('.promotions');
        this.$nameplateImg = $('.nameplate-slide');
        this.$nameplateCont = $('#nameplate-gallery');
        this.$subMenuID;

        this.menuContentPos = 0;
        this.countSubElements = 0;
        this.endTransition = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

		this.init();

	};
/**************************************************
**				Start Define Variables
**************************************************/

	fixedMenu.prototype = {
		init: function () {
			this.detectOrientation();
			this.calcSize();
			this.bindEvents();
		},
        detectOrientation: function () {
            var self = this;
            this.$setOrientation = function() {
                if (window.orientation === undefined) { return; }
                (Math.abs(window.orientation) == 90) ? $(document).triggerHandler('horizontalOr') : $(document).triggerHandler('verticalOr');
            };
            var orientationEvent = "onorientationchange" in window ? "orientationchange" : "resize";
            window.addEventListener(orientationEvent, this.$setOrientation, false);
            $(window).resize(function() {
                self.calcSize();
            });
        },
		bindEvents: function () {
			var self = this;
			var mouseStart,
				mouseEnd,
				centerPos,
				rightPos = 0;
            this.$containerEl.height($(window).height());
            (detectDevice.prototype.isMobile()) ? this.$menuContent.css({'min-height' : $(window).height()}) : '';
			this.$menuSubEl.on('click', function(){
                var $this = $(this);
				self.$subMenuID = $this.data('submenu');
                console.log($this.data('submenu'));

				($(this).hasClass('backArrow')) ? self.deactivateSubMenu() : self.activateSubMenu();

			});
			this.$menuIcon.on('click', function(){
				($(self.$contentEl).hasClass('active')) ? self.deactivateMenu() : self.activateMenu();
			});

/**************************************************
**				Start Touch Eventstest
**************************************************/
			this.$swipeableEl.on('touchstart',function(e){
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				e.preventDefault();
				mouseStart = touch.pageX;
			});
			this.$swipeableEl.on('touchmove',function(e){
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				e.preventDefault();
				self.$contentEl.css({"transform": "translate3d(" + ( parseInt(self.centerPos) + ( touch.pageX - mouseStart ) ) + "px, 0, 0)", "-webkit-transform": "translate3d(" + ( parseInt(self.centerPos) + ( touch.pageX - mouseStart ) ) + "px, 0, 0)"});
			});
			this.$swipeableEl.on('touchend',function(e){
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				e.preventDefault();
				mouseEnd = touch.pageX;
				var xMove = mouseEnd - mouseStart;
				(( xMove ) >= 5) ? self.deactivateMenu() : self.activateMenu();
			});

/**************************************************
**				End Touch Events
**************************************************/
		},
		calcSize: function () {
			var self = this;
			this.$slideContent = this.$menuBtn.outerWidth(true) - $(window).width();
			this.$swipeableEl.css({
				width: this.$menuBtn.outerWidth(true),
				height: $(window).height() - this.$menuBtn.outerHeight(true),
				'margin-top': this.$menuBtn.outerHeight(true)
			});
            (this.$containerEl.hasClass('no-scroll')) ? this.$containerEl.css({height: $(window).outerHeight(true)+'px'}) : this.$containerEl.css({height: '100%'});
			if(this.$menuBtn.hasClass('active')){
				this.$contentEl.css({"transform": "translate3d("+ (this.$slideContent) +"px, 0, 0)", "-webkit-transform": "translate3d("+ (this.$slideContent) +"px, 0, 0)"}).on(self.endTransition, function(e){
					self.centerPos = self.$contentEl.css('-webkit-transform').match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/).slice(5, 8)[0];
				});
				if(this.$subMenu.hasClass('list')){
					this.$menuContentChilds.css({"transform": "translate3d("+ (self.countSubElements * self.$slideContent) +"px, 0, 0)", "-webkit-transform": "translate3d("+ (self.countSubElements * self.$slideContent) +"px, 0, 0)"});
				}
			}
            (detectDevice.prototype.isMobile()) ? this.$menuContent.css({'min-height' : $(window).height()}) : '';
		},
		activateMenu: function () {
			var self = this;
			this.$contentEl.addClass('active');
            this.$menuContent.scrollTop(0);
            this.$containerEl.addClass('no-scroll').css({height: $(window).height()+'px'});
			this.$contentEl.addClass("animate").css({"-webkit-transform": "translate3d("+ (self.$slideContent) +"px, 0, 0)", "transform": "translate3d("+ (self.$slideContent) +"px, 0, 0)"}).on(self.endTransition, function(e){
				self.$contentEl.removeClass("animate");
				self.centerPos = self.$contentEl.css('-webkit-transform').match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/).slice(5, 8)[0];
			});
			self.$swipeableEl.show();
		},
		deactivateMenu: function () {
			var self = this;
            self.countSubElements = 0;
			this.$contentEl.addClass("animate").css({"transform": "translate3d(0, 0, 0)",  "-webkit-transform": "translate3d( 0, 0, 0)"}).on(self.endTransition, function(e){
				self.$contentEl.removeClass("animate");
				self.centerPos = 0;
            });
			self.$contentEl.removeClass('active');
            this.$containerEl.removeClass('no-scroll').css({height: '100%'});
			self.$menuBtn.removeClass('active');
			self.$swipeableEl.hide();
            self.$menuContentChilds.addClass("animate").css({"transform": "translate3d( 0, 0, 0)", "-webkit-transform": "translate3d( 0, 0, 0)"}).on(self.endTransition, function(e){
                $(this).off(self.endTransition);
	            $(self.$subMenuID).hide();
            });
		},
		activateSubMenu: function () {
			var self = this;
            $(this.$subMenuID).show(0, function(){
                self.countSubElements ++;
                self.$subMenu.addClass('list');
                self.$menuContentChilds.addClass("animate").css({"transform": "translate3d("+ self.$slideContent +"px, 0, 0)", "-webkit-transform": "translate3d("+ self.$slideContent +"px, 0, 0)"}).on(self.endTransition, function(e){
                    self.$subMenu.addClass('list');
                    $(self.$subMenuID).show();
                    self.$menuContentChilds.removeClass("animate");
                    $(this).off(self.endTransition);
                });
            });
        },
		deactivateSubMenu: function () {
			var self = this;
            self.countSubElements --;
            this.$menuContentChilds.addClass("animate").css({"transform": "translate3d( 0, 0, 0)", "-webkit-transform": "translate3d( 0, 0, 0)"}).on(self.endTransition, function(e){
				// After animation is complete remove sub-menu and hide.
            	self.$menuContentChilds.removeClass("animate");
				self.$subMenu.removeClass('list');
                $(self.$subMenuID).hide();
                $(this).off(self.endTransition);
            });
		}
	};
/**************************************************
**				End Fixed Menu
**************************************************/
	$(document).ready(function () {
		var FixedMenu = new fixedMenu();
		$( window ).resize(function() {
            if(is_android){
                setTimeout(function(){
//                    alert('asd');
                    FixedMenu.calcSize();
                },300);
            } else {
                FixedMenu.calcSize();
            }
		});
	});

})();