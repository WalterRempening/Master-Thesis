/*
COMMENT OUT THIS ENTIRE FILE - WE NO LONGER WANT JAVASCRIPT INTERACTION ON THE LEGACY NAV, JUST STATIC LINKS 
2/10/2015 Kathleen Vignos
*/
/*
window.tabCheck = window.orientation;

jQuery(document).ready(function(){

    var navExtras = false;
    var searchBox = false;
    var primaryNav = jQuery('#primary-nav');
    var topLi = false;
    var feedSubnav = false;
    var feedContentUl = false;

    var openDropdown = function(){
        primaryNav.parents('#nav-wrap').css('overflow','hidden');
        primaryNav.addClass('active')
            .parents('#nav-wrap')
                .addClass('active')
                .stop().animate({height: 270}, 'fast');
    };

    var closeDropdown = function(){
        primaryNav.removeClass('active')
            .find('li')
                .removeClass('active')
            .end()
            .parents('#nav-wrap')
                .removeClass('active')
                .stop().animate({height: 50}, 'fast',
                    function(){
                        primaryNav.css('overflow', 'visible');
                        // the dropdown closes too slowly so the search text box gets covered.  show it again.
                        if (searchBox)
                        {
                            jQuery('#nav-wrap').css('overflow','visible');
                        }
                    }
                );
        jQuery('#primary-nav li.subscribe').find('#AMS_WIR_GLOBAL_NAVBAR_ROLLOVER').removeClass('active');
    };

    // tablets:  top level nav elements - first tap opens dropdown, second tap follows link
    if (tabCheck != undefined) {

        var lastClick = null;
        // run once when the page loads on tablet: hide links in data attribute
        jQuery('#nav-wrap a.non-js-menu').each(
            function() {
                // save off the href
                var save_href = jQuery(this).attr('href');
                // add data-tapref attrib and save href value there
                jQuery(this).removeAttr('href').attr('data-tapref',save_href);
            }
        );

        // on single click, don't follow link (dropdown only).  on double click, add href back and follow link.
        jQuery('#nav-wrap').find('a.non-js-menu').click(
                function(){
                    if (lastClick == this) {
                        // add href back for doubletap
                        var a_href = jQuery(this).attr('data-tapref');
                        jQuery(this).attr('href',a_href).removeAttr('data-tapref');
                        return true;
                    } else {
                        // save off this and href
                        lastClick = this;
                        return true;
                    }
                }
            );
    } // end tabcheck

    // Parent hover, open the dropdowns (unless hovering over RSS or Search)
    jQuery('#nav-wrap').hoverIntent(
        function(){
            if (!navExtras) {
                openDropdown();
            }
        },
        function(){
            closeDropdown();
        }
    );

    // Activate and Deactivate the first child of dropdowns on parent hover
    // Use hoverIntent plugin jQuery.hoverIntent.js to delay hover event so that user doesn't unintentionally engage wrong top level navs
    primaryNav.children('li').hoverIntent(
        function(){
            topLi = true;
            openDropdown();
            jQuery('#primary-nav > li').not(this).removeClass('active').find('li').removeClass('active');
            jQuery(this).addClass('active');
            // this class is getting added to first ul > li when mousing to left of subnav, for no apparent reason (should only fire on primary-nav > li hover)
            // add some conditionals to make that stop happening.  do not activate first ul > li unless hovering on primary-nav > li.
            if (topLi === true && feedSubnav === false && feedContentUl === false) {
                jQuery(this).find('ul > li:first').addClass('active');
            }
            // Subscription dropdown
            jQuery('#primary-nav > li').filter(this).find('#AMS_WIR_GLOBAL_NAVBAR_ROLLOVER').addClass('active');
            jQuery('#primary-nav > li').not(this).find('#AMS_WIR_GLOBAL_NAVBAR_ROLLOVER').removeClass('active');

            // Parent hover, lazy load all the sub images
            jQuery(this).find( 'img[data-lazy-src]' ).each( function() {
               lazy_load_nav_image( this );
            } );
       },
       function() {
            topLi = false;
       }
    );

    // Sub menu events in dropdowns
    jQuery('#primary-nav .subnav > li').each(
        function(){
            var thisElement = jQuery(this);
            var thisElementPosition = thisElement.position();

            jQuery(this).children('ul').css('top',-thisElementPosition.top);

            jQuery(this).find('.feed-title a').mouseenter(
                function(){
                    jQuery('#primary-nav .subnav > li').not(thisElement).removeClass('active');
                    thisElement.addClass('active');
                }
            );
        }
    );

    // set some variables on subnav and subnav ul to control behavior of activating ul > li:first
    jQuery('#primary-nav .subnav').hover(
        function(){
            feedSubnav = true;
        },
        function(){
            feedSubnav = false;
        }
    );

    jQuery('#primary-nav .subnav > ul').hover(
        function(){
            feedContentUl = true;
        },
        function(){
            feedContentUl = false;
        }
    );
*/

    /* Search Box */
/*    jQuery('#nav-extras li.search').hoverIntent(
        function(){
            navExtras = true;
            searchBox = true;
            closeDropdown();
            jQuery('#nav-wrap').css('overflow','visible');
            jQuery('#search-form-cont').css('display', 'block');
            jQuery(this).addClass('active');
            jQuery('#search-input').focus();
        },
        function(){
            jQuery('#nav-wrap').css('overflow','hidden');
            jQuery('#search-form-cont').css('display', 'none');
            jQuery(this).removeClass('active');
            jQuery('#search-input').blur();
        }
    );
*/
    /* Wired Logo, RSS, Search, left of Wired, right of Search - close dropdown */
/*    jQuery('#nav-extras li.rss').add('#logo').add('#global_header').hover(
        function(){
            navExtras = true;
            closeDropdown();
        },
        function() {
            navExtras = false;
        }
    );

});

function lazy_load_nav_image( img ) {
    var $img = jQuery( img ),
        src = $img.attr( 'data-lazy-src' );

    $img.hide()
        .removeAttr( 'data-lazy-src' )
        .attr( 'data-lazy-loaded', 'true' );

    img.src = src;
    $img.fadeIn();
}

function positionSubnav( container ){
    /*
    if ( jQuery( container ).length == 0 ) {
        console.info(container + ' not found!');
        // Wait 3 secs and try again
        setTimeout( function(){ positionSubnav(container) }, 3000);
        return;
    }
    var navOffset = jQuery( container ).offset();

    jQuery( container + ' > li > ul' ).each( function(){
        var h2Offset  = jQuery( this ).parentsUntil( '#primary-nav' ).offset();

        if ( ! jQuery( this ).parent().is( ':first-child' ) ) {
            var moveTo = navOffset.left - h2Offset.left;
            jQuery( this ).css( 'left', moveTo+'px' );

            console.info('Positioning subnav at ' + moveTo + 'px');
        }
    });
    */
    //console.info('Positioning subnav ' + container );
//}