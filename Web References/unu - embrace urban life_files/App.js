/**
 * Main Backbone Marionette application
 * Here we define main regions of the application and basic stuff like mobile tester
 * or starting of Backbone.history.
 *
 * @module      App
 * @requires    Backbone, Marionette
 * @returns     {object} Backbone Marionette Application
 * @category    UnuMotors/configurator
 * @copyright   Copyright (c) 2014 Sitewards GmbH (http://www.sitewards.com/)
 */
define([
    'jquery',
    'backbone',
    'marionette',
    'underscore',
    'unuparallax'
],  function (jQuery, Backbone, Marionette) {

        var bUseCsstransforms3d = false;
        if (jQuery('html').hasClass('csstransforms3d')){
            bUseCsstransforms3d = true;
        }

        var App = new Backbone.Marionette.Application();

        App.oBackground = jQuery('.configurator__background').unuParallax({
            useCsstransforms3d: bUseCsstransforms3d,
            steps: [0, 1000, 2000],
            ease: Quint.easeInOut
        });
        App.oBackground.currentStep = 0;

        App.addRegions({
            oHeaderRegion    : "header",
            oMainRegion      : "#main",
            oMarkerRegion    : ".product__markers",
            oProductRegion   : ".product",
            oAdditionalRegion: ".product__additional",
            oInsuranceRegion : ".product__insurance",
            oProceedHint     : ".proceed-button__hint"
        });

        // override for marionette region open and close function
        // to make sure that more than one view can be appended and removed;
        App.oAdditionalRegion.aViews = [];
        App.oAdditionalRegion.open = function (view) {
            this.aViews.push(view);
            this.$el.append(view.el);
        };
        App.oAdditionalRegion.close = function () {
            var aViews = this.aViews;
            _.each(aViews, function (oView, iKey) {
                if (!oView || oView.isClosed){ return; }

                // call 'close' or 'remove', depending on which is found
                if (oView.close) { oView.close(); }
                else if (oView.remove) { oView.remove(); }

                Marionette.triggerMethod.call(this, "close", oView);
                delete aViews[iKey];
            });
            delete this.currentView;
        };

        // setting up magento information
        App.oProduct = JSON.parse(jQuery('#product-data-json').text());
        App.oCurrencyFormat = JSON.parse(jQuery('#currency-format-json').text());
        App.iDefaultPrecision = App.oCurrencyFormat.precision;
        App.iDefaultRequiredPrecision = App.oCurrencyFormat.requiredPrecision;

        /**
         * preloads images of products
         *
         * @param aProducts
         */
        App.preloadImages = function (aProducts) {
            for (var i = 0; i < aProducts.length; i++) {
                var aOptions = aProducts[i].options;
                for (var j = 0; j < aOptions.length; j++) {
                    if (typeof aOptions[j].image !== 'undefined') {
                        var oImage = new Image();
                        oImage.src = aOptions[j].image.src;
                    }
                }
            }
        };

        App.addInitializer(function (oOverrideOptions) {

            // start preloading of images
            App.preloadImages(App.oProduct.configurationParts);
            var aAdditionalProducts = App.oProduct.additionalProducts;
            for (var i = 0; i < aAdditionalProducts.length; i++) {
                if (aAdditionalProducts[i].hasOwnProperty('configurationParts')) {
                    App.preloadImages(aAdditionalProducts[i].configurationParts);
                }
            }

            var bConsoleAvailable = typeof console !== 'undefined';
            var oOptions = {
                debug: true
            };

            if ( oOverrideOptions ) {
                jQuery.extend( oOptions, oOverrideOptions );
            }

            App.debug = bConsoleAvailable && oOptions.debug;

            if (App.debug){
                console.log('configurator started');
                console.log('-------------------');
                console.log('Application:', App);
                console.log('Run-Options:', oOptions);
                console.log('Product:', App.oProduct);
                console.log('-------------------');
            }
            Backbone.history.start();
        });

        return App;
    }
);