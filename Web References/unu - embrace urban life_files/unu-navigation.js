/**
 * @module unu-navigation.js
 * This module enables navigation effects for main navigation
 * as well as sticky headers on /product.
 */
(function ($) {
    $(window).load(function () {
        var bHasTransitions     = $('html').hasClass('csstransitions'),
            $navSection         = $(".cms-top-menu"),
            $mainNav            = $navSection.find(".wrapper"),
            $navItems           = $mainNav.children(".widget"),
            $currentMenuItem    = $mainNav.find(".active"),
            iLeftOffset         = parseInt($($navItems[0]).css("margin-left"), 10),
            iOriginalWidth      = 0,
            iOriginalPos        = 0,
            $magicLine          = $("<div />").addClass("navigation__pointer");

        $magicLine.css({
            left: iOriginalPos,
            width: iOriginalWidth
        });
        $mainNav.append($magicLine);

        if ($currentMenuItem.length > 0) {
            /**
             * currently the best fix because fonts in IE are rendered after window load
             */
            setTimeout(function () {
                iOriginalWidth = $currentMenuItem.find('span').width();
                iOriginalPos = $currentMenuItem.position().left + iLeftOffset;
                $magicLine
                    .width(iOriginalWidth)
                    .css("left", iOriginalPos);
            },0);
        }

        $navItems.on("mouseenter mouseleave", function (oEvent) {
            var $hoverMenuItem = $(this),
                iLeftPos = $hoverMenuItem.position().left + iLeftOffset,
                iNewWidth = $hoverMenuItem.find('span').width(),
                iAnimateLeft = 0,
                iAnimateWidth = 0;

            if ( oEvent.type === "mouseenter" ) {
                iAnimateLeft = iLeftPos;
                iAnimateWidth = iNewWidth;
            } else {
                iAnimateLeft = iOriginalPos;
                iAnimateWidth = iOriginalWidth;
            }
            if(bHasTransitions) {
                $magicLine.css({
                    left: iAnimateLeft,
                    width: iAnimateWidth
                });
            } else {
                $magicLine.stop().animate({
                    left: iAnimateLeft,
                    width: iAnimateWidth
                });
            }
        });
    });

    // Sticky Submenus, but only if a submenu exists
    $(document).ready(function () {
        var submenu = $('.submenu-container');
        if(submenu.length) {
            var submenuOriginalOffset = submenu.offset();

            function scroll() {
                if ($(window).scrollTop() >= submenuOriginalOffset.top) {
                    submenu.addClass('navbar-fixed-top');
                    $('body').css('paddingTop', submenu.height());

                    if($('.sticky-link').css('opacity') == '0') {
                        $('.sticky-link').animate({opacity: 1});
                    }
                } else {
                    submenu.removeClass('navbar-fixed-top');
                    $('body').css('paddingTop', 0);

                    if($('.sticky-link').css('opacity') == '1') {
                        $('.sticky-link').animate({opacity: 0});
                    }
                }
            }

            $(document).on('scroll', scroll);

            document.addEventListener('gesturechange', function() {});
            document.addEventListener('touchmove', scroll, true);

            function resize() {
                var left = $('.cms-top-menu .widget.widget-product-link-inline').offset().left;
                $('.sticky-link').css('left', left-12);
            }

            $(document).on('resize', resize);
            resize();
        }
    });
})(jQuery);