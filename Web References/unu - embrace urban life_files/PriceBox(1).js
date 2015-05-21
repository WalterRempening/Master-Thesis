/**
 * Backbone Model for price
 *
 * @module      Model
 * @requires    Backbone
 * @returns     {object} Backbone Model
 * @category    UnuMotors/configurator
 * @copyright   Copyright (c) 2014 Sitewards GmbH (http://www.sitewards.com/)
 */
define([
    'configurator/App',
    'jquery',
    'backbone'
],  function (App, jQuery, Backbone) {
        return Backbone.Model.extend({
            defaults: {
                fBasePrice: 0,
                fPrice: 0,
                oModifier: {}
            },
            setPrice: function(fPrice) {
                // only this method fires the change event of this model
                this.set('fPrice', fPrice);
            },
            calcPrice: function () {
                var fNewPrice = 0;
                _.each(this.get('oModifier'), function (fModifierPrice) {
                    if(!isNaN(fModifierPrice)) {
                        fNewPrice = fNewPrice + fModifierPrice;
                    }
                });

                this.setPrice(this.get('fBasePrice') + fNewPrice);
            },
            updateModifier: function (iModifierId, fModifierPrice) {
                var oModifier = this.get('oModifier');
                oModifier[iModifierId] = fModifierPrice;
                this.set({oModifier: oModifier},{silent:true});
                this.calcPrice();
            }
        });
    }
);