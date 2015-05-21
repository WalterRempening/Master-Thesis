/**
 * @module jquery.unuAnimateScooter.js
 * This module enables scooter animation on product configurator and checkout pages
 *
 * @copyright   Copyright (c) 2014 Sitewards GmbH (http://www.sitewards.com/)
 */
(function ($) {
    "use strict";

    $.unuAnimateScooter = {
        ANIMATE_OUT     : 'animateOut',
        ANIMATE_IN      : 'animateIn',
        ANIMATE_WHEEL   : 'animateWheel'
    };

    $.fn.unuAnimateScooter = function (oOptions) {

        return this.each(function(){
            var $this = $(this);
            var oSettings = $.extend({
                duration             : 2,
                complete             : false,
                animateMode          : $.unuAnimateScooter.ANIMATE_OUT,
                wheelDiameter        : 140,
                wheelObject          : $this.find('.wheel')
            }, oOptions);

            var oData = $this.data('unuScooter');

            if(!oData) {
                oData = {
                    oTimeLine   : null,
                    wheelCircleLengthParam: oSettings.wheelDiameter * Math.PI / 360
                };

                oData.getDegDeltaForPath = function (iPathLength) {
                    var iTurnDeg = Math.round(iPathLength / oData.wheelCircleLengthParam);
                    if (iTurnDeg >= 0) {
                        return "+=" + iTurnDeg;
                    } else {
                        return "-=" + (-iTurnDeg);
                    }
                };

                $this.data('unuScooter', oData);
            }

            if (oData.oTimeLine) {
                oData.oTimeLine.stop();
                oData.oTimeLine.clear();
            } else {
                oData.oTimeLine = new TimelineLite({
                    paused: true,
                    align: 'normal'
                });
            }

            var addWheelAnimation = function ($wheel, iRotation) {
                oData.oTimeLine.add(
                    TweenLite.to(
                        $wheel,
                        oSettings.duration,
                        {
                            rotation: oData.getDegDeltaForPath(iRotation),
                            ease: cEase
                        }
                    ),
                    0
                );
            };

            var iTargetPosition;
            var cEase = Power2.easeOut;
            var iPositionDelta;

            if(typeof oOptions.ease !== 'undefined'){
                cEase = oOptions.ease;
            }

            switch (oSettings.animateMode) {
                case $.unuAnimateScooter.ANIMATE_WHEEL:
                    var iRotation = oSettings.range;
                    if(oOptions.back === true){
                        iRotation = iRotation * -1;
                    }

                    TweenLite.to(
                        oSettings.wheelObject,
                        oSettings.duration,
                        {
                            rotation: oData.getDegDeltaForPath(iRotation),
                            ease: cEase,
                            onComplete: function () {
                                if (oSettings.complete) {
                                    oSettings.complete();
                                }
                            }
                        }
                    );

                    break;
                case $.unuAnimateScooter.ANIMATE_IN:
                    iTargetPosition = -Math.round($this.offset().left + $this.width());
                    iPositionDelta = -iTargetPosition;

                    $this.css('visibility','visible');

                    oData.oTimeLine.eventCallback("onComplete", function () {
                        if (oSettings.complete) {
                            oSettings.complete();
                        }
                    });

                    /* add sliding movement to timeline */
                    oData.oTimeLine.add(
                        TweenLite.fromTo(
                            $this,
                            oSettings.duration,
                            {
                                left: iTargetPosition
                            },
                            {
                                left: 0,
                                ease: cEase
                            }
                        ),
                        0
                    );

                    /* add rotation movement to timeline */
                    addWheelAnimation(oSettings.wheelObject, iPositionDelta);

                    /* start the animation */
                    oData.oTimeLine.play();

                    break;
                case $.unuAnimateScooter.ANIMATE_OUT:
                default:
                    iTargetPosition = Math.round(($(window).width() + $this.width())/2);
                    iPositionDelta = iTargetPosition;

                    oData.oTimeLine.eventCallback("onComplete", function () {
                        $this.hide();

                        if (oSettings.complete) {
                            oSettings.complete();
                        }
                    });

                    /* add sliding movement to timeline */
                    oData.oTimeLine.add(
                        TweenLite.to(
                            $this,
                            oSettings.duration,
                            {
                                left: iTargetPosition,
                                ease: cEase
                            }
                        ),
                        0
                    );

                    /* add rotation movement to timeline */
                    addWheelAnimation(oSettings.wheelObject, iPositionDelta);

                    /* start the animation */
                    oData.oTimeLine.play();

                    break;
            }
        });
    };

}( jQuery ));