/**
 * Marionette ItemView for product
 *
 * @module      View
 * @requires    Backbone,
 *              jquery,
 *              Marionette
 * @returns     {object} Marionette ItemView
 * @category    UnuMotors/configurator
 * @copyright   Copyright (c) 2014 Sitewards GmbH (http://www.sitewards.com/)
 */
define([
    'configurator/App',
    'jquery',
    'backbone',
    'marionette',
    'text!configurator/templates/product.html',
    'unuanimatescooter'
], function (App, jQuery, Backbone, Marionette, ProductTemplate) {
        return Marionette.ItemView.extend({
            template: _.template(ProductTemplate),
            className: 'product__item',
            modelEvents: {
                "rerender": "rerender"
            },
            rerender: function (oModel) {
                var oModel = oModel.model;
                var oSelected = oModel.get('selected');

                var bIsResizable = oModel.get('title').indexOf('resizable') !== -1;
                var bProductIsWheel = oModel.get('title').indexOf('wheel') !== -1;
                var bIsBody = oModel.get('title').indexOf('body') !== -1;

                this.renderPart(
                    'product__part--' + oModel.get('id'),
                    oSelected,
                    oModel.get('position'),
                    bProductIsWheel,
                    bIsBody,
                    bIsResizable
                );
            },
            renderPart: function (sPartToRender, oOptions, oImagePosition, bProductIsWheel, bIsBody, bIsResizable) {
                if (App.debug) {
                    console.log('ProductView:   render changed part:', sPartToRender);
                    console.log('ProductView:   apply image', oOptions.image);
                }

                var $RegionToChange = this.$el.find('.' + sPartToRender);
                var $Img = $RegionToChange.find('img');
                if (_.has(oOptions, 'image')) {
                    $Img.attr('src', oOptions.image.src);
                    $Img.attr('data-origin-width', oOptions.image.width);
                    $Img.attr('data-origin-height', oOptions.image.height);
                    $Img.show();
                } else {
                    $Img.hide();
                }

                if (typeof oImagePosition !== 'undefined' && oImagePosition !== null) {
                    $RegionToChange.css(oImagePosition);
                }

                if (bIsResizable) {
                    $RegionToChange.addClass('resizable');
                }

                if (bProductIsWheel) {
                    $RegionToChange.addClass('wheel');
                    this.resizeWheels();
                }

                if (bIsBody) {
                    this.$el.find('.product__part').not($RegionToChange).removeClass('body');
                    $RegionToChange.addClass('body');
                    this.resizeWheels();
                }
            },
            resizeWheels: function () {
                var $BodyImg = this.$el.find('.body img');
                if ($BodyImg.length > 0) {
                    var iBodyWidth = $BodyImg.width();

                    /*
                     * IE always set 28 as return for width() if image is not loaded or not found
                     * so a workaround here is to check if body width is 28, that's ok as long as
                     * we know that our product image is higher that 28px
                     *
                     * To have a exact value i've added a 1px empty image to the initial image tag
                     * so we have to proof this, too
                     */
                    if( iBodyWidth === 28 || iBodyWidth === 1 ) {
                        iBodyWidth = 0;
                    }

                    var iBodyOriginWidth = $BodyImg.data('origin-width');
                    var fWidthDiff = iBodyWidth / iBodyOriginWidth;
                    if (fWidthDiff > 0) {
                        this.$el.find('.resizable').each(function(i, oResizable) {
                            oResizable = jQuery(oResizable);
                            var iImageWidth = oResizable.find('img').data('origin-width');
                            var iImageHeight = oResizable.find('img').data('origin-height');
                            oResizable.css(
                                {
                                    height: Math.round(iImageHeight * fWidthDiff),
                                    width: Math.round(iImageWidth * fWidthDiff)
                                }
                            );
                            oResizable.removeClass('resizable');
                            oResizable.addClass('resized');
                        });
                    }
                }
            },
            animateOut: function (oOptions) {
                if (typeof oOptions === 'undefined') {
                    oOptions = {};
                }
                oOptions.animateMode = jQuery.unuAnimateScooter.ANIMATE_OUT;
                oOptions.wheelObject = this.$el.find('.wheel');
                this.$el.unuAnimateScooter(oOptions);
            },
            animateIn: function (oOptions) {
                if (typeof oOptions === 'undefined') {
                    oOptions = {};
                }
                oOptions.animateMode = jQuery.unuAnimateScooter.ANIMATE_IN;
                oOptions.wheelObject = this.$el.find('.wheel');
                this.$el.unuAnimateScooter(oOptions);
            },
            animateWheel: function (oOptions) {
                oOptions.animateMode = jQuery.unuAnimateScooter.ANIMATE_WHEEL;
                oOptions.wheelObject = this.$el.find('.wheel');
                this.$el.unuAnimateScooter(oOptions);
            }
        });
    }
);