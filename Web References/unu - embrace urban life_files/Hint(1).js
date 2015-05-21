/**
 * Backbone Model for showing hints
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
                title: '',
                hidden: true
            }
        });
    }
);