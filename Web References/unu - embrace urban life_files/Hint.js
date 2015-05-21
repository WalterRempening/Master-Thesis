/**
 * Marionette ItemView for displaying hints
 *
 * @module      StatusBar
 * @returns     {object} Backbone.View
 * @category    UnuMotors/configurator
 * @copyright   Copyright (c) 2014 Sitewards GmbH (http://www.sitewards.com/)
 */
define([
    'jquery',
    'backbone',
    'marionette',
    'text!configurator/templates/hint.html'
],  function (jQuery, Backbone, Marionette, Template) {
        return Backbone.Marionette.ItemView.extend({
            template: _.template(Template),
            tagName: "div",
            className: 'configurator__hint',
            modelEvents: {
                change : "render"
            },
            onRender: function () {
                if(this.model.get('hidden')){
                    this.$el.hide();
                }else{
                    this.$el.show();
                }
            }
        });
    }
);