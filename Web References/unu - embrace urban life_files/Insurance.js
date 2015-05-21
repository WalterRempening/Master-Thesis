define([
    'configurator/App',
    'jquery',
    'marionette',
    'insurance/views/InsuranceFieldsCollection',
    'text!insurance/templates/insurance.html',
    'underscore'
],  function (App, jQuery, Marionette, InsuranceFieldsCollectionView, Template, _) {
        return Marionette.ItemView.extend({
            tagName: "div",
            template: _.template(Template),
            className: 'insurance__marker',
            events: {
               "click .btn.cancel": "cancelForm",
               "click .btn.proceed": "setFieldValues",
               "click .marker__option": "setOption"
            },
            modelEvents: {
                "change": "modelChangeHandler"
            },
            initialize: function () {
                /** forcing event handler context to be still pointing to self instance */
                _.bindAll(this, 'cancelForm');
                App.on('goBack', this.cancelForm);
                App.on("regionActivated", this.afterActivation);
            },
            onBeforeRender: function () {
                this.FieldsView = new InsuranceFieldsCollectionView({collection:this.options.fieldsCollection}).render().el;
                var oMarkerPosition = this.model.get('marker_position');
                this.$el.css(oMarkerPosition);
                this.fireModuleEvent('invalid');
            },
            onRender: function () {
                this.$el.find('.insurance__fields').append(this.FieldsView);
                this.$el.find("select").unuselect();
                var $allInputs = this.$el.find("input");
                if (typeof $allInputs.placeholder == 'function') {
                    $allInputs.placeholder();
                }

                // if there are a preselected option make it visible
                if (this.model.get('selected').length !== 0 ){
                    var $tmpEl = this.$el,
                        iSelectedId = this.model.get('selected').id;

                    $tmpEl.find('li[data-option-id='+ iSelectedId +']').trigger('click');
                }

                this.setGrouped();
            },
            /**
             * this method is only for _group: processing on field titles
             */
            setGrouped: function () {
                var $groupedFields = this.$el.find('.form-group[data-group]'),
                    aDoneFieldGroups = [],
                    $tmpEl = this.$el;

                _.each($groupedFields, function (oGroup) {
                    var sGroupName = jQuery(oGroup).data('group'),
                        sGroupNameTitle = jQuery(oGroup).data('group');

                    if(_.indexOf(aDoneFieldGroups, sGroupName) === -1) {
                        var $groupFromName = $groupedFields.filter('[data-group="'+ sGroupName +'"]');

                        $groupFromName.wrapAll('<div class="fieldgroup fieldgroup__' + sGroupName.replace(' ','-') + '"></div>');
                        $tmpEl.find('.fieldgroup__' + sGroupName.replace(' ','-')).append('<label>'+ sGroupNameTitle +'</label>');

                        aDoneFieldGroups.push(sGroupName);
                    }
                });
            },
            fireModuleEvent: function (sValue) {
                this.options.module.trigger('insurance', sValue);
            },
            setFieldValues: function () {
                var oModel = this.model,
                    oSelected = oModel.get('selected'),
                    oFormValidator = new Validation(this.$el.find('.insurance-form')[0]),
                    oFieldsCollection = this.options.fieldsCollection;

                // collect fields name and value
                var aFieldsValues = _.map(oFieldsCollection.models, function(oFieldModel){
                    return {
                        name: 'insurance_' + oFieldModel.get('id'),
                        value: oFieldModel.get('value')
                    };
                });
                oSelected.fields = aFieldsValues;
                var bIsFormValid = jQuery.clearPlaceholder(function () {
                    return oFormValidator.validate();
                });
                if (bIsFormValid) {
                    // only set values to selected if validation is passed
                    oModel.set({selected: oSelected});
                    this.fireModuleEvent('valid');
                    this.closeModal();
                }
            },
            setOption: function (oEvent) {
                var aOptions = this.model.get('options'),
                    $Target = jQuery(oEvent.currentTarget),
                    iOptionId = $Target.data('optionId');

                if ($Target.data('optionModal') === true ){
                    this.openModal();
                }else {
                    this.closeModal();
                }

                var oSelectedOption = false;
                _.some( aOptions, function( oEl ) {
                    if ( oEl.id === iOptionId.toString() ) {
                        oSelectedOption = oEl;
                        return true;
                    }
                });

                // set user selected option to the model and trigger model change (needed for pre selecting)
                this.model.set({selected: oSelectedOption}).trigger('change', this.model);

                // if we have no modal on the selected option we can reactivate proceed
                if ($Target.data('optionModal') === false) {
                    this.fireModuleEvent('valid');
                } else {
                    this.fireModuleEvent('invalid');
                }
            },
            cancelForm: function () {
                // unselect insurance selection
                this.$el.find('.option--selected').removeClass('option--selected');

                this.model.set({selected: {}});
                this.closeModal();
            },
            openModal: function () {
                var $Modal = this.$el.find('.marker__modal');
                this.$el.find('.marker__modal').stop().fadeOut("fast", function () {
                    $Modal.fadeIn("fast", function () {
                        jQuery(this).parent().toggleClass('marker--open');
                    });
                });
            },
            closeModal: function () {
                this.$el.find('.marker__modal').stop().fadeOut("fast", function () {
                    jQuery(this).parent().toggleClass('marker--open');
                });
            },
            /**
             * Handles model change and highlights the currently selected option.
             */
            modelChangeHandler: function () {

                var oSelected = this.model.get('selected');

                if (typeof oSelected.id !== 'undefined') {
                    // remove last selection on this modal and set new selection

                    this.$el.find('.marker__option')
                        .removeClass('option--selected')
                        .filter('[data-option-id='+ oSelected.id +']')
                        .addClass('option--selected');

                    this.setModalArrow();
                }
            },
            setModalArrow: function () {
                // to have only one function which moves the arrow
                // simulating the afterActivation trigger
                this.afterActivation({active: true});
            },
            afterActivation: function (oEvent) {
                var $this;

                // check if this.$el is available in the current scope
                // if not use the region given in oEvent
                if(typeof this.$el !== 'undefined' ) {
                    $this = this.$el;
                }else {
                    $this = oEvent.region.$el;
                }

                if(oEvent.active && $this.find('.option--selected').length !== 0) {
                    var iMarginOffset = parseInt($this.find('.option--selected').css("margin-left"), 10);
                    var iPositionLeft = $this.find('.option--selected').position().left;
                    var iOuterWidth = $this.find('.option--selected').outerWidth();
                    var iModalPositionLeft = $this.find('.marker__modal').position().left;

                    $this.find('.modal__pointer')
                        .css('background-position',  Math.ceil( ((iOuterWidth + (2 * iMarginOffset)) / 2)  + iPositionLeft) - iModalPositionLeft + 'px 0' );
                }

                if(!window._activatedStandardInsuranceOption) {
                    window._activatedStandardInsuranceOption = true;
                    jQuery('[data-option-id="47"]').click();
                }

                // Scrolls the insurance form into the visible area of the browser
                jQuery.scrollTo(jQuery('.insurance__marker'), 200);
            }
        });
    }
);