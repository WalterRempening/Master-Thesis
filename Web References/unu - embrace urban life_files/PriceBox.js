/**
 * PriceBox View displays product price and allows to change it.
 *
 * @module      PriceBox
 * @returns     {object} Backbone.View
 * @category    UnuMotors/configurator
 * @copyright   Copyright (c) 2014 Sitewards GmbH (http://www.sitewards.com/)
 */
define([
    'configurator/App',
    'jquery',
    'backbone',
    'marionette'
],  function (App, jQuery, Backbone, Mariontte) {
        return Mariontte.ItemView.extend({
            el: 'div.price-box',
            sTagLine: '',
            modelEvents: {
                "change": "render"
            },
            initialize: function(oOptions) {
                this.sTagLine = this.$el.find('.price-tagline').text();
                this.render();
            },
            render: function() {
                // Check to see if we have an int of float and update the precision
                if (typeof this.model.get('fPrice') === 'number' && this.model.get('fPrice') % 1 === 0) {
                    App.oCurrencyFormat.precision = 0;
                    App.oCurrencyFormat.requiredPrecision = 0;
                } else {
                    App.oCurrencyFormat.precision = App.iDefaultPrecision;
                    App.oCurrencyFormat.requiredPrecision = App.iDefaultRequiredPrecision;
                }
                this.$el.find('.price').text(formatCurrency(this.model.get('fPrice'), App.oCurrencyFormat));
                this.$el.find('.price-tagline').text(this.sTagLine);
                this.$el.show();
            },
            setTagline: function(sTagLine) {
                this.sTagLine = sTagLine;
                this.render();
            }
        });
    }
);