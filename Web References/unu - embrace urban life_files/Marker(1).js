define([
    'configurator/App',
    'jquery',
    'marionette',
    'text!configurator/templates/marker.html'
],  function (App, jQuery, Marionette, Template) {
        return Marionette.ItemView.extend({
            tagName: "div",
            template: _.template(Template),
            className: 'configurator__marker',
            events: {
               "click .marker__trigger": "toggleModal",
               "click .marker__option": "setOption",
               "click .marker__close": "toggleModal",
               "click .marker__okay": "toggleModal"
            },
            modelEvents: {
                "change": "currentOption"
            },
            onBeforeRender: function () {
                var oMarkerPosition = this.model.get('marker_position');
                this.$el.css(oMarkerPosition);

                if( this.model.get('hidden') === true ){
                    this.$el.css({display: 'none'});
                }
            },
            onRender: function () {
                // visual set preselection
                var iPreselectId = this.model.get('selected').id;
                this.$el.find('[data-option-id='+ iPreselectId +']').addClass('option--selected');
            },
            setOption: function (oEvent) {
                var aOptions = this.model.get('options'),
                    $Target = jQuery(oEvent.currentTarget),
                    iOptionId = $Target.data('optionId');

                var oSelectedOption = false;
                _.some( aOptions, function( oEl ) {
                    if ( oEl.id === iOptionId.toString() ) {
                        oSelectedOption = oEl;
                        return true;
                    }
                });

                if(App.debug) {
                    console.log('MarkerView:    selected option:', iOptionId, oSelectedOption);
                }

                // set user selected option to the model
                this.model.set({selected:oSelectedOption});
            },
            toggleModal: function () {
                if(App.debug) {
                    console.log('MarkerView:    toggle modal:', this.model.get('title'));
                }
                jQuery('.marker--open .marker__modal').fadeOut("fast", function () {
                    jQuery(this).parent().toggleClass('marker--open');
                });
                this.$el.find('.marker__modal').stop().fadeToggle("fast", function () {
                    jQuery(this).parent().toggleClass('marker--open');
                });
            },
            currentOption: function () {
                /** method to fill the current option container and handle preselection */
                var $currentOption = this.$el.find('.option__current'),
                    oSelected = this.model.get('selected');

                _.each(oSelected, function (sOption, sKey) {
                    $currentOption.find('.option__'+ sKey.replace('option','')).html(sOption);
                });

                // remove last selection on this modal and set new selection
                this.$el.find('.option--selected').removeClass('option--selected');
                this.$el.find('*[data-option-id='+ oSelected.id +']').addClass('option--selected');
            }
        });
    }
);