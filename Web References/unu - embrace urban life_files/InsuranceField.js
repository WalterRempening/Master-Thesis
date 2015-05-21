define([
    'backbone',
    'marionette',
    'text!insurance/templates/insurance_field.html'
],  function (Backbone, Marionette, Template) {
        return Marionette.ItemView.extend({
            template: _.template(Template),
            className: 'form-group',
            onBeforeRender: function () {
                var $tmpEl = this.$el;
                var sFieldLength = this.model.get('field_length');
                if (sFieldLength) {
                    $tmpEl.addClass(sFieldLength);
                }
            },
            onRender: function () {
                var oFieldAttributes = this.model.get('field_attributes'),
                    $tmpEl = this.$el;

                if (typeof oFieldAttributes !== 'undefined') {
                    _.each (oFieldAttributes, function (settingValue, settingKey) {
                        $tmpEl.attr('data-'+ settingKey, settingValue);
                    });
                }
            },
            events : {
                "change input" :"changed",
                "change select" :"changed"
            },
            changed: function(oEvent) {
                var oTarget = oEvent.currentTarget;
                this.model.set({value: oTarget.value});
            },
            initialize: function() {
                var aDefaultValue = this.model.get('selected');
                if (aDefaultValue.hasOwnProperty('length') && aDefaultValue.length > 0) {
                    // setting string values
                    this.model.set({value: aDefaultValue[0]});
                } else if (aDefaultValue.hasOwnProperty('id')) {
                    // setting drop_down values
                    this.model.set({value: aDefaultValue.id});
                }
            }
        });
    }
);