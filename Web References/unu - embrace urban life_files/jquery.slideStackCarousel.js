/*!
 @module jquery.slideStackCarousel.js
 jQuery plugin, designed to provide basic functionality of carousel, which can be dragged by mouse or touch interface.
 Carousel supports navigation back and forward and also direct navigation. Supposed to work in collaboration with jquery.pageIndicator.js

 @copyright   Copyright (c) 2014 Sitewards GmbH (http://www.sitewards.com/)
 */
(function( $ ){

    var methods = {
        init : function( oOptions ) {
            return this.each(function(){
                var $this = $(this);

                var oData = $this.data('slideStackCarousel');

                if ( !oData ) {
                    var oSettings = {
                        mouseTarget                 : null,
                        pageIndicator               : $(),
                        autoAnimationDelay          : 7000,
                        animationDuration           : 500,
                        animationEasing             : 'swing',
                        visiblePercent              : 95
                    };
                    if ( oOptions ) {
                        $.extend( oSettings, oOptions );
                    }

                    oData = {
                        oSettings                       : oSettings,
                        $carouselInstance               : $this,
                        $cellsToAnimate                 : $this.find('.cell'),
                        $lastCellToAnimate              : $this.find('.cell:last-child'),
                        iTotalSections                  : 0,
                        bEnableSlideShow                : 1,
                        bAnimationInProgress            : 0,
                        bMouseIsOver                    : 0,
                        iCurrentSection                 : 0,
                        iSliderAutoAnimationTimeout     : 0,
                        iPreviousScreenWidth            : 0,
                        $window                         : $(window)
                    };
                    $this.data('slideStackCarousel', oData);

                    if (!oData.oSettings.mouseTarget) {
                        oData.oSettings.mouseTarget = $this;
                    }

                    oData.iTotalSections = oData.$cellsToAnimate.length;

                    oData.resetZIndex = function () {
                        oData.$cellsToAnimate.each(function (iIndex) {
                            var iZIndex = 2 * oData.iTotalSections - iIndex;
                            $(this).css('z-index', iZIndex).data('slideStackCarousel.z-index', iZIndex);
                        });
                    };

                    oData.windowResizeHandler = function (oEvent) {
                        if ((typeof oEvent !== 'undefined') && (oData.$window.width() === oData.iPreviousScreenWidth)) {
                            return;
                        }
                        oData.iPreviousScreenWidth = oData.$window.width();
                        oData.$cellsToAnimate.stop(true).css('height','');
                        oData.iCurrentSection = 0;

                        oData.resetZIndex();

                        oData.$carouselInstance.trigger({
                            type: 'slideStackCarousel.sectionChange',
                            section: oData.iCurrentSection
                        });
                    };

                    oData.goBackTo = function (iTargetSection) {
                        var iCurrentSection = oData.iCurrentSection;
                        var $sectionsToExpand = $();
                        var cFilteringClosure;

                        if (iTargetSection < iCurrentSection) {
                            cFilteringClosure = function( iIndex ) {
                                var $this = $(this);
                                var iOriginalZIndex = $this.data('slideStackCarousel.z-index');
                                if (iIndex >= iTargetSection && iIndex < iCurrentSection) {
                                    $sectionsToExpand = $sectionsToExpand.add(this);
                                    $this.css({
                                        'z-index': iOriginalZIndex,
                                        'height': 0
                                    });
                                }
                            };
                        } else {
                            /* nothing to animate */
                            return;
                        }

                        oData.$cellsToAnimate.each(cFilteringClosure);

                        if ($sectionsToExpand.length === 0) {
                            /* nothing to animate */
                            return;
                        }

                        oData.iCurrentSection = iTargetSection;
                        oData.bAnimationInProgress = 1;

                        oData.oSettings.pageIndicator.pageIndicator('setCurrentPage', oData.iCurrentSection);
                        oData.$carouselInstance.trigger({
                            type: 'slideStackCarousel.sectionChange',
                            section: oData.iCurrentSection
                        });

                        $sectionsToExpand.stop(true).animate({
                            height: '100%'
                        },{
                            duration: oData.oSettings.animationDuration,
                            easing: oData.oSettings.animationEasing,
                            complete: function () {
                                oData.bAnimationInProgress = 0;
                            }
                        });
                    };

                    oData.goForwardTo = function (iTargetSection) {
                        var iCurrentSection = oData.iCurrentSection;
                        var $sectionsToCollapse = $();
                        var cFilteringClosure;

                        if (iTargetSection > iCurrentSection) {
                            cFilteringClosure = function( iIndex ) {
                                if (iIndex >= iCurrentSection && iIndex < iTargetSection) {
                                    $sectionsToCollapse = $sectionsToCollapse.add(this);
                                }
                            };
                        } else if (iTargetSection < iCurrentSection) {
                            cFilteringClosure = function( iIndex ) {
                                var $this = $(this);
                                var iOriginalZIndex = $this.data('slideStackCarousel.z-index');
                                if (iIndex >= iCurrentSection && iIndex < oData.iTotalSections) {
                                    $sectionsToCollapse = $sectionsToCollapse.add(this);
                                    /** restoring some elements */
                                    $this.css('z-index', iOriginalZIndex);
                                } else if (iIndex <= iTargetSection) {
                                    /** moving some elements deeper */
                                    $this.css('z-index', iOriginalZIndex - oData.iTotalSections).css('height', '');
                                }
                            };
                        } else {
                            /* nothing to animate */
                            return;
                        }

                        oData.$cellsToAnimate.each(cFilteringClosure);

                        if ($sectionsToCollapse.length === 0) {
                            /* nothing to animate */
                            return;
                        }

                        oData.iCurrentSection = iTargetSection;
                        oData.bAnimationInProgress = 1;

                        oData.oSettings.pageIndicator.pageIndicator('setCurrentPage', oData.iCurrentSection);
                        oData.$carouselInstance.trigger({
                            type: 'slideStackCarousel.sectionChange',
                            section: oData.iCurrentSection
                        });

                        $sectionsToCollapse.stop(true).animate({
                                height: 0
                            },{
                                duration: oData.oSettings.animationDuration,
                                easing: oData.oSettings.animationEasing,
                                complete: function () {
                                    /* moving the element to the bottom of the stack */
                                    var $this = $(this);
                                    var iOriginalZIndex = $this.data('slideStackCarousel.z-index');
                                    $this.css('z-index', iOriginalZIndex - oData.iTotalSections).css('height', '');

                                    /* resetting all z-indices when passing around the first element */
                                    if ($this.is(oData.$lastCellToAnimate)) {
                                        oData.resetZIndex();
                                    }

                                    oData.bAnimationInProgress = 0;
                                }
                            });
                    };

                    oData.goToSection = function (iSection) {
                        if (iSection < 0 || iSection >= oData.iTotalSections ) {
                            return;
                        }

                        if (iSection > oData.iCurrentSection) {
                            oData.goForwardTo(iSection);
                        } else {
                            oData.goBackTo(iSection);
                        }
                    };

                    oData.goToPrevSection = function () {
                        var iNextSection = oData.iCurrentSection - 1;
                        if (iNextSection < 0) {
                            iNextSection = oData.iTotalSections - 1;
                        }

                        oData.goBackTo(iNextSection);
                    };

                    oData.goToNextSection = function () {
                        var iNextSection = oData.iCurrentSection + 1;
                        if (iNextSection >= oData.iTotalSections) {
                            iNextSection = 0;
                        }

                        oData.goForwardTo(iNextSection);
                    };

                    oData.autoAnimate = function () {
                        this.iSliderAutoAnimationTimeout = 0;
                        oData.goToNextSection();
                        oData.resumeSlideShow();
                    };

                    oData.pauseSlideShow = function () {
                        clearTimeout(this.iSliderAutoAnimationTimeout);
                        this.iSliderAutoAnimationTimeout = 0;
                    };

                    oData.resumeSlideShow = function () {
                        if (oData.oSettings.autoAnimationDelay === 0 || this.iSliderAutoAnimationTimeout > 0) {
                            /* in case auto slideshow is disabled or already initialized - just exit */
                            return;
                        }
                        var self = this;
                        this.iSliderAutoAnimationTimeout = setTimeout(
                            function () {
                                self.autoAnimate();
                            },
                            this.oSettings.autoAnimationDelay
                        );
                    };

                    oData.checkSlideShow = function () {
                         if (oData.bMouseIsOver) {
                             oData.pauseSlideShow();
                         } else {
                             oData.resumeSlideShow();
                         }
                    };

                    oData.wheelHandler = function (oEvent) {
                        oData.enableScrollAnimation = 0;
                        var fDelta = 0;
                        /* some old IE special case */
                        if (!oEvent) {
                            oEvent = window.event;
                        } else {
                            oEvent = oEvent.originalEvent;
                        }

                        if (oEvent.wheelDelta) {
                            fDelta = oEvent.wheelDelta/120;
                        } else if (oEvent.detail) {
                            fDelta = -oEvent.detail/3;
                        }
                        if (!oData.processWheelDelta(fDelta)) {
                            oEvent.preventDefault();
                        }
                    };

                    oData.processWheelDelta = function (fDelta) {
                        /**
                         * Do not start new animation until previous is not finished
                         */
                        if (oData.bAnimationInProgress) {
                            return false;
                        }

                        /**
                         * Enable default browser scrolling
                         * - if we are on the first slide and scroll top
                         * - if we are on the last slide and scroll down
                         *
                         */
                        var bOnFirstSlide      = oData.iCurrentSection === 0;
                        var bOnLastSlide       = oData.iCurrentSection === oData.iTotalSections - 1;
                        var bCanScrollToTop    = fDelta > 0 && bOnFirstSlide;
                        var bCanScrollToBottom = fDelta < 0 && bOnLastSlide;
                        if (bCanScrollToTop || bCanScrollToBottom) {
                            return true;
                        }

                        var iWindowHeight = $(window).height();
                        var iSliderHeight = oData.$carouselInstance.height();
                        var iScrollTop = $(document).scrollTop();
                        var iSliderOffset = oData.$carouselInstance.offset().top;

                        if (fDelta < 0) {
                            // scroll the slides only if the slider element is visible at least oData.oSettings.visiblePercent %
                            var iVisiblePercent = (iWindowHeight + iScrollTop) * 100 / (iSliderHeight + iSliderOffset);
                            var bIsSliderVisible = iVisiblePercent >= oData.oSettings.visiblePercent;

                            if(bIsSliderVisible) {
                                oData.goToNextSection();
                            } else {
                                return true;
                            }
                        } else if (fDelta > 0) {
                            var bSliderTopIsHidden = iScrollTop > iSliderOffset;

                            if (bSliderTopIsHidden) {
                                return true;
                            }
                            oData.goToPrevSection();
                        }

                    };

                    /* launching the slider */
                    $(window).on('resize',oData.windowResizeHandler);
                    oData.windowResizeHandler();

                    oData.$window.on('mousewheel DOMMouseScroll', oData.wheelHandler);

                    if (oData.iTotalSections < 2) {
                        oData.oSettings.pageIndicator.hide();
                        return;
                    }

                    oData.oSettings.pageIndicator.pageIndicator({
                        totalPages      : oData.iTotalSections,
                        initialPage     : oData.iCurrentSection
                    });

                    oData.oSettings.pageIndicator.on('pageIndicator.pageChange', function (oEvent) {
                        oData.goToSection(oEvent.page);
                    });

                    oData.oSettings.mouseTarget
                        .on('mouseover', function () {
                            oData.bMouseIsOver = 1;
                            oData.checkSlideShow();
                        })
                        .on('mouseout', function () {
                            oData.bMouseIsOver = 0;
                            oData.checkSlideShow();
                        });

                    oData.resumeSlideShow();
                }
            });
        },

        getSectionCount : function () {
            var oData = this.eq(0).data("slideStackCarousel");
            if (oData) {
                return oData.iTotalSections;
            }
            return 0;
        },

        goToSection : function ( iSection ) {
            return this.each(function(){
                var oData = $(this).data("slideStackCarousel");
                if (oData) {
                    oData.goToSection(iSection);
                }
            });
        },

        goToPrevSection : function () {
            return this.each(function(){
                var oData = $(this).data("slideStackCarousel");
                if (oData) {
                    oData.goToPrevSection();
                }
            });
        },

        goToNextSection : function () {
            return this.each(function(){
                var oData = $(this).data("slideStackCarousel");
                if (oData) {
                    oData.goToNextSection();
                }
            });
        },

        pauseSlideShow : function () {
            return this.each(function(){
                var oData = $(this).data("slideStackCarousel");
                if (oData) {
                    oData.pauseSlideShow();
                }
            });
        },

        resumeSlideShow : function () {
            return this.each(function(){
                var oData = $(this).data("slideStackCarousel");
                if (oData) {
                    oData.resumeSlideShow();
                }
            });
        }
    };

    $.fn.slideStackCarousel = function( method ) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.slideStackCarousel' );
            return false;
        }
    };
 })( jQuery );