/**
 * @module unu-slider.js
 * This module initializes slider functionality
 */
(function ($) {
    $(document).ready(function () {
        $('.stage-slider').each(function () {
            var $this = $(this);

            $this.find('.scrollable-content').slideStackCarousel({
                pageIndicator : $this.find('ul.page-indicator'),
                autoAnimationDelay: 14000
            });
        });
    });
})(jQuery);