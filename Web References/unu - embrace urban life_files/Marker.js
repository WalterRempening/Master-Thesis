/**
 * Backbone Model for configuration markers
 * This model used to provide data of an configuration marker and its content on the scooter.
 * The configuration items like colors are added as an collection object.
 *
 * @module      Model
 * @requires    Backbone
 * @returns     {object} Backbone Model
 * @category    UnuMotors/configurator
 * @copyright   Copyright (c) 2014 Sitewards GmbH (http://www.sitewards.com/)
 */
define([
    'jquery',
    'backbone'
],  function (jQuery, Backbone) {
        return Backbone.Model.extend({
            defaults: {
                selected: false,
                showLabel: false,
                hidden: false
            },
            initialize: function () {
                // UNU-280 show and hide labels on options should be done in magento backend by checkbox
                var aOptions = this.get('options');
                if (typeof aOptions !== 'undefined') {
                    var iOptionsCount = aOptions.length;
                    if( iOptionsCount < 5 ){
                        this.set({showLabel: true},{silent:true});
                    }

                    // if the marker has only one option we can hide it from frontend
                    if ( iOptionsCount === 1 ) {
                        this.set({hidden: true},{silent:true});
                    }
                }
            }
        });
    }
);