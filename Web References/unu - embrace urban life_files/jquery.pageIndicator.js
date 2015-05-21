/*
 @module jquery.pageIndicator.js
 jQuery plugin, designed to control slider's page-indicators. Supposed to work in collaboration
 with jquery.slideStackCarousel.js

 @copyright   Copyright (c) 2014 Sitewards GmbH (http://www.sitewards.com/)
*/
(function( $ ){
    var S_PLUGIN_NAME = 'pageIndicator';
    var methods = {
        init : function( oOptions ) {
            return this.each(function(){
                var $this = $(this);
                var oData = $this.data(S_PLUGIN_NAME);

                if ( !oData ) {
                    var oSettings = {
                        totalPages      : -1,
                        initialPage     : 0
                    };
                    if ( oOptions ) {
                        $.extend( oSettings, oOptions );
                    }

                    oData = {
                        oSettings       : oSettings,
                        $attachedTo     : $this,
                        $pages          : null,
                        iCurrentPage    : 0,
                        iTotalPages     : 0
                    };
                    $this.data(S_PLUGIN_NAME, oData);

                    oData.$pages = $this.find("a").removeClass('active');
                    oData.iTotalPages = oData.$pages.length;
                    if (oData.oSettings.totalPages > oData.iTotalPages) {
                        for (var i = oData.iTotalPages; i < oData.oSettings.totalPages; i++) {
                            var $newSection = oData.$pages.first().parent().clone();
                            oData.$pages.parent().parent().append(" ").append($newSection);
                            oData.$pages = oData.$pages.add($newSection.find('a'));
                        }
                    } else {
                        if (oData.oSettings.totalPages > 0) {
                            while (oData.$pages.length > oData.oSettings.totalPages) {
                                oData.$pages.last().remove();
                                oData.$pages.splice(oData.$pages.length - 1, 1);
                            }
                        }
                    }
                    /* fill all items with correct indexes */
                    oData.$pages.each(function (index) {
                        $(this).attr({
                            'title': index + 1,
                            'data-target-item': index + 1
                        });
                    });

                    /* this is to add whitespaces between inline-blocks generated without them by CMS */
                    oData.$pages.after(" ");

                    oData.iTotalPages = oData.$pages.length;

                    oData.setCurrentPage = function (iNewPage) {
                        oData.iCurrentPage = iNewPage;
                        oData.$pages.removeClass('active').eq(iNewPage).addClass('active');
                    };

                    oData.pageClickHandler = function (oEvent) {
                        oEvent.preventDefault();

                        var iNewPage = parseInt($(this).attr('data-target-item'), 10) - 1;
                        oData.setCurrentPage(iNewPage);

                        oData.$attachedTo.trigger({
                            type: S_PLUGIN_NAME + '.pageChange',
                            page: oData.iCurrentPage
                        });
                    };
                    oData.$pages.on('click', oData.pageClickHandler);

                    oData.setCurrentPage(oData.iCurrentPage);
                }
            });
        },

        setCurrentPage : function( iNewPage ) {
            return this.each(function(){
                var oData = $(this).data(S_PLUGIN_NAME);

                oData.setCurrentPage(iNewPage);
            });
        },

        getCurrentPage : function() {
            var oData = this.eq(0).data(S_PLUGIN_NAME);
            return oData.iCurrentPage;
        }
    };

    $.fn.pageIndicator = function( sMethod ) {
        if ( methods[sMethod] ) {
            return methods[sMethod].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof sMethod === 'object' || ! sMethod ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  sMethod + ' does not exist on jQuery.' + S_PLUGIN_NAME );
        }
        return false;
    };
})( jQuery );
