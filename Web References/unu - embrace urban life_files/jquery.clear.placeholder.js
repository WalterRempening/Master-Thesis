/**
 * @module jquery.placeholder.validate.js
 * Fix for IE 9 and placeholder jquery plugin
 * Remove placeholder from input value to process validation
 */
(function ($) {
    $.clearPlaceholder = function (cCallback) {
        var $allInputs = jQuery('input, textarea');
        if (typeof $allInputs.placeholder == 'function') {
            $allInputs.placeholder('clear');
        }
        var bResult = cCallback();
        if (typeof $allInputs.placeholder == 'function') {
            $allInputs.placeholder('fill');
        }
        return bResult;
    };
})(jQuery);
