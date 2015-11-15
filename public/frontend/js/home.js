/*
(function () {
    "use strict";
*/
    var nua = navigator.userAgent;
    var is_android = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));

    var swipeImages = function(){
        this.$cont = $('#slider');
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

        this.$overlayInfo = this.$cont.find('#overlay-info');

        this.mouseStart;
        this.mouseEnd;
        this.xMove = 0;
        this.endTransition = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
        this.matchTransform = /matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/;
        this.viewportWidth;
        this.imageSize;


        this.$currentItem = 1;
        this.$preventTouch = false;
        this.$itemHeight;
        this.$newHeight = this.$items.outerHeight();
        this.$totalWidth = 0;
        this.$startPos = 0;

        this.windowHeight;

        this.init();
    };


    swipeImages.prototype = {
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
            self.viewportWidth = $(window).width();
            self.$cont.css({
                'height' : $(window).height()
            });
            if (self.viewportWidth <= 480 ){
                self.imageSize = 'data-url-sm';
            } else if (self.viewportWidth > 480 && self.viewportWidth <= 920 ){
                self.imageSize = 'data-url-mid';
            } else {
                self.imageSize = 'data-url-big';
            }
            self.loadImages();
        },
        loadImages: function () {
            var self = this;
            this.$currentEl.css({
                "background-image": 'url(' + this.$listItems.eq(self.$indexImage).attr(self.imageSize) + ')',
                "background-color": this.$listItems.eq(self.$indexImage).attr('data-bgcolor'),
                "background-blend-mode": this.$listItems.eq(self.$indexImage).attr('data-blendmode'),
                "background-position": this.$listItems.eq(self.$indexImage).attr('data-position')
            }).attr('data-index', self.$indexImage);
            self.$currentIndex.text(self.$indexImage + 1);
            self.$items.css({"transform": "translate3d( 0, 0, 0)"});

            this.$items.width(self.windowWidth).css({ right: self.windowWidth, "transform": "translate3d( 0, 0, 0)" });
            this.$previousEl.css({
                "background-image": 'url(' + this.$listItems.eq(self.$indexImage - 1).attr(self.imageSize) + ')',
                "background-color": this.$listItems.eq(self.$indexImage - 1).attr('data-bgcolor'),
                "background-blend-mode": this.$listItems.eq(self.$indexImage - 1).attr('data-blendmode'),
                "background-position": this.$listItems.eq(self.$indexImage - 1).attr('data-position')
            });
            if (self.$lastItem == self.$indexImage) {
                this.$nextEl.css({
                    "background-image": 'url(' + this.$listItems.eq(0).attr(self.imageSize) + ')',
                    "background-color": this.$listItems.eq(0).attr('data-bgcolor'),
                    "background-blend-mode": this.$listItems.eq(0).attr('data-blendmode'),
                    "background-position": this.$listItems.eq(0).attr('data-position')
                });
            } else {
                this.$nextEl.css({
                    "background-image": 'url(' + this.$listItems.eq(self.$indexImage + 1).attr(self.imageSize) + ')',
                    "background-color": this.$listItems.eq(self.$indexImage + 1).attr('data-bgcolor'),
                    "background-blend-mode": this.$listItems.eq(self.$indexImage + 1).attr('data-blendmode'),
                    "background-position": this.$listItems.eq(self.$indexImage + 1).attr('data-position')
                });
            }
            self.changeOverlayInfo(self.$listItems.eq(parseInt(self.$indexImage)));
            self.$overlayInfo.css({opacity: '1'});
        },
        changeOverlayInfo: function(changeto){
            var self = this;
            this.$overlayInfo.find("#overlayTitle h1").html(changeto.attr("data-title"));
            this.$overlayInfo.find("#overlayDescription").html(changeto.data("description"));
        },
        /*
        loadImages: function () {
            var self = this;
            this.$currentEl.attr('data-index', self.$indexImage).text(this.$listItems.eq(self.$indexImage).attr('data-title'));
            self.$currentIndex.text(self.$indexImage + 1);
            self.$items.css({"transform": "translate3d( 0, 0, 0)"});

            this.$items.width(self.windowWidth).css({ right: self.windowWidth, "transform": "translate3d( 0, 0, 0)" });
            this.$previousEl.text(this.$listItems.eq(self.$indexImage - 1).attr('data-title'));
            if ((self.$lastItem + 1) == self.$indexImage) {
                this.$nextEl.text(this.$listItems.eq(0).attr('data-title'));
            } else {
                this.$nextEl.text(this.$listItems.eq(self.$indexImage + 1).attr('data-title'));
            }
        },
        */
        bindEvents: function () {
            var self = this,
                itemsN = 0,
                firstLoad = true;
            
            $(document).on('horizontalOr verticalOr', function(){
                self.resize();
            });

            self.$paginator.find('.left').on('touchstart click', function(e){
                e.preventDefault();
                self.activateSwipe('+', 'prev');
            });
            self.$paginator.find('.right').on('touchstart click', function(e){
                e.preventDefault();
                self.activateSwipe('-', 'next');
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
                      }, 500);
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
                    self.$overlayInfo.css({opacity: 1-(Math.abs(dist)/self.viewportWidth)*5});
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

                    clearTimeout(self.play);
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
                self.$overlayInfo.css({opacity: '1'});
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
        play: function (leftRight, replaceImg, delay) {
            var self = this;
            self.$paginator.find('.whiteArrow').on('touchstart click',function(e){
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
        var SwipeImages = new swipeImages();
    });
/*
})();
*/