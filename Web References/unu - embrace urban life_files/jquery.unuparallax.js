/**
 * @module jquery.unuparallax.js
 * This module enables parallax like background animation for the configurator
 *
 * Depends on the greensock animation Framework (http://www.greensock.com/)
 *
 * @copyright   Copyright (c) 2014 Sitewards GmbH (http://www.sitewards.com/)
 */
(function ($) {
    "use strict";

    /**
     * unuParallax plugin initialization and binding
     * animation function to a trigger
     *
     * @param options
     * @returns jQuery object
     */
    $.fn.unuParallax = function (options) {
        return this.each(function(){

            var oSettings = $.extend({
                ease                 : Sine.easeInOut,
                direction            : 'left',
                useDataModifier      : true,
                useCsstransforms3d   : true,
                steps                : [0, 1200, 2400]
            }, options);

            var $this = $(this);
            var oData = $this.data('unuParallax');

            if(!oData) {
                oData = {
                    $Stage      : $this,
                    $Layers     : $this.find(".background__layer"),
                    oSettings   : oSettings
                };

                $this.data('unuParallax', oData);

                oData.initLayersPosition = function () {
                    oData.$Layers.data('position', 0);
                };

                oData.resizeHandler = function () {
                    var fNewStageWidth = oData.$Stage.width() + Math.max.apply(Math, oData.oSettings.steps);

                    oData.$Layers.css('width', fNewStageWidth);
                };

                $(window).on('resize', oData.resizeHandler);
            }

            oData.initLayersPosition();
            oData.resizeHandler();
        });
    };

    /**
     * unuParallaxAnimate function to trigger animation
     * and add callback function for complete
     *
     * triggered by: $('element').unuParallaxAnimate({options object});
     * Options:
     *      back        boolean
     *      complete    boolean
     *      duration    integer
     *
     * @param options
     * @returns jQuery object
     */
    $.fn.unuParallaxAnimate = function (options) {
        return this.each(function(){

            var oAnimationSettings = $.extend({
                back: false,
                complete: false,
                duration: 2,
                step: 0
            }, options);

            var oData = $(this).data('unuParallax');
            if(!oData) {
                return;
            }

            oAnimationSettings.range = oData.oSettings.steps[oAnimationSettings.step];
            oData.iAnimationDoneCounter = 0;

            var checkAnimationDone = function () {
                var iLayersCount = oData.$Layers.length;
                return (iLayersCount === oData.iAnimationDoneCounter);
            };

            var $this = $(this);
            $this.trigger({
                type: 'bgAnimated',
                value: true
            });

            oData.$Layers.each(function (iKey, layer) {
                var $Layer         = $(layer),
                    iOldPosition   = $Layer.data('position'),
                    iModifier      = iKey,
                    iNewPosition   = 0,
                    oAnimation     = {};

                if(oAnimationSettings.complete !== false) {
                    oAnimation.onComplete = function () {
                        oData.iAnimationDoneCounter = oData.iAnimationDoneCounter + 1;
                        if (checkAnimationDone()) {
                            $this.trigger({
                                type: 'bgAnimated',
                                value: false
                            });
                            oAnimationSettings.complete();
                        }
                    };
                }

                if(oData.oSettings.useDataModifier){
                    iModifier = $Layer.data('animationModifier');
                }

                if(iOldPosition === 0){
                    iNewPosition = (oAnimationSettings.range/iModifier) * - 1;
                }else {
                    if(oAnimationSettings.back === true){
                        if(oAnimationSettings.range === 0) {
                            iNewPosition = 0;
                        }else{
                            iNewPosition = (oAnimationSettings.range/iModifier) * -1;
                        }
                    }else {
                        iNewPosition = (oAnimationSettings.range/iModifier) * -1;
                    }
                }

                if(oData.oSettings.useCsstransforms3d){
                    oAnimation.x = iNewPosition;
                    oAnimation.ease = oData.oSettings.ease;
                }else{
                    var oTmpCss = {};
                    oTmpCss[oData.oSettings.direction] = iNewPosition;
                    oAnimation.css = oTmpCss;
                    oAnimation.ease = oData.oSettings.ease;
                }

                TweenMax.to($Layer, oAnimationSettings.duration, oAnimation);
                $Layer.data('position', iNewPosition);
            });
        });
    };
}( jQuery ));