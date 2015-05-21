/**
 * Backbone Collection for markers
 *
 * @module      Collection
 * @requires    Backbone
 * @returns     {object} Backbone Collection
 * @category    UnuMotors
 * @copyright   Copyright (c) 2014 Sitewards GmbH (http://www.sitewards.com/)
 */
define([
    'jquery',
    'backbone',
    'configurator/models/Marker'
],  function (jQuery, Backbone, MarkerModel) {
        var Collection = Backbone.Collection.extend({
            model: MarkerModel
        });

        return Collection;
    }
);