/**
 * StatusBar View implements the configurator status bar behavior.
 *
 * @module      StatusBar
 * @returns     {object} Backbone.View
 * @category    UnuMotors/configurator
 * @copyright   Copyright (c) 2014 Sitewards GmbH (http://www.sitewards.com/)
 */
define([
    'jquery',
    'backbone',
    'unustatusbar'
],  function (jQuery, Backbone) {
        return Backbone.View.extend({
            el: '.status-bar',
            iCurrentStep: 0,
            aStepCssClass: ['step-one', 'step-two', 'step-three'],

            initialize: function() {
                this.render();
            },

            render: function() {
                $buttons = this.$el.find('.status-bar__control');

                //if we move back to previous step inactive next steps
                for (var i = this.iCurrentStep; i < this.aStepCssClass.length; i++) {
                    $buttons.removeClass(this.aStepCssClass[i]);
                }
                var oStepItems = $buttons.find('li');
                for (var i = this.iCurrentStep; i < oStepItems.length; i++) {
                    oStepItems.eq(i).removeClass('active');
                }

                //set active new step class to progress bar
                var sNewStepCssClass = this.aStepCssClass[this.iCurrentStep];
                if (!this.$el.hasClass(sNewStepCssClass)) {
                    this.$el.addClass(sNewStepCssClass);
                }
                //set active new step progress item
                var oNewActiveStep = $buttons.find('li').eq(this.iCurrentStep);
                if (!oNewActiveStep.hasClass('active')) {
                    oNewActiveStep.addClass('active');
                }
            },

            setCurrentStep: function(iCurrentStep) {
                this.iCurrentStep = iCurrentStep;

                this.$el.find('.status-bar__progress').unuStatusbar(this.iCurrentStep);
                this.render();
            }
        });
    }
);