/**
 * @module jquery.unuselects.js
 * This module enables custom look for form selects
 */
(function ($) {
    $.fn.unuselect = function (evt) {
        var aMatches = window.navigator.userAgent.match(/MSIE\s(\d+)\./);
        var bIsIE = (aMatches && aMatches[1] > 7 && aMatches[1] <= 10);

        if (bIsIE) {
            return this;
            /** activate custom select boxes by https://github.com/gfranko/jquery.selectBoxIt.js */
            /**
             * TODO: the jQuery.selectBoxIt somehow brakes the IE10 and maybe others, in the way, that IE10 crashes on
             * document.getElementsByName('sample') calls
             *
             * So we disabled it for IE10 and lower. We have to get back to that later, see UNU-129
             */
        }
        this.selectBoxIt({
            showEffect: "fadeIn",
            showEffectSpeed: 400,
            hideEffect: "fadeOut",
            hideEffectSpeed: 400,
            autoWidth: false
        })
            .css('display', '')
            .addClass('unu-hidden-select')
            .each(function () {
                var $this = $(this);
                var $selectBoxItInstance = $this.data("selectBox-selectBoxIt");
                this.refreshSelectBoxIt = function () {
                    setTimeout(function () {
                        $selectBoxItInstance.refresh().enable();
                        $this.css('display', '');
                    }, 10);
                };
                this.refreshSelectBoxIt();
            });

        return this;
    };
})(jQuery);
