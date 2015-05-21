/**
 * @module jquery.unustatusbar.js
 * This module enables status-bar animation
 *
 * Depends on the greensock animation Framework (http://www.greensock.com/)
 *
 * @copyright   Copyright (c) 2014 Sitewards GmbH (http://www.sitewards.com/)
 */
(function ($) {
    "use strict";

    /**
     * unuStatusbar
     *
     * @param options
     * @returns jQuery object
     */
    $.fn.unuStatusbar = function (options) {
        return this.each(function(){
            var oSettings = {
                ease                : Quint.easeInOut,
                useCsstransforms3d  : true,
                complete            : false,
                duration            : 3,
                steps               : [0, 43, 86]
            };

            var $this = $(this),
                $Progress = $(this).find('.progress'),
                oData = $this.data('unustatusbar'),
                oAnimation = {},
                iToStep = 0;

            if(typeof options === 'object') {
                oSettings = $.extend(oSettings, options);
            } else if (typeof options === 'number') {
                iToStep = options;
            } else {
                return $(this);
            }

            if(!oData) {
                oData = {
                    $Bar        : $this,
                    oSettings   : oSettings,
                    iCurrentStep: 0
                };

                $this.data('unustatusbar', oData);
            }

            if(oData.oSettings.complete !== false) {
                oAnimation.onComplete = function () {
                    oData.oSettings.currentStep = iToStep;
                    oData.oSettings.complete();
                };
            }

            var animateBar = function (iToStep) {
                var iNewPosition = oData.oSettings.steps[iToStep];

                if(oData.oSettings.useCsstransforms3d){
                    oAnimation.width = iNewPosition + '%';
                    oAnimation.ease = oData.oSettings.ease;
                }else{
                    oAnimation.css = {width: iNewPosition + '%'};
                    oAnimation.css.easeIn = oData.oSettings.ease;
                }

                TweenMax.to($Progress, oData.oSettings.duration, oAnimation);
            };

            animateBar(iToStep);
            return $this;
        });
    };
}( jQuery ));