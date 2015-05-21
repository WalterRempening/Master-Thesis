define([
    'jquery',
    'backbone',
    'marionette',
    'underscore',
    'configurator/collections/Markers',
    'configurator/views/MarkersCollection',
    'insurance/views/Insurance',
    'insurance/models/InsuranceModel'
],  function (
        jQuery,
        Backbone,
        Marionette,
        _,
        MarkerCollection,
        MarkerCollectionView,
        InsuranceView,
        InsuranceModel
    ) {
        return Marionette.Module.extend({
            /**
             * Insurance product model
             *
             * @type {Object}
             */
            oInsuranceModel: null,

            prepareInsurance: function (oInsuranceData) {
                if (!this.oInsuranceModel) {
                    var oSettingsCollection = new MarkerCollection(oInsuranceData.configurationParts);

                    /**
                     * The insurance model is not what it seems to be. It contains insurance options and fields
                     * for these insurance options on the same level. On the next line we are getting the instance of
                     * insurance options in order to assign a proper id and select value to the insurance model.
                     *
                     * NOTE: Insurance model not only represents the insurance product, but also all the data which we
                     * have received from the server.
                     *
                     * TODO: UNU-325 try to improve that ;)
                     */
                    var oInsuranceProduct = _.findWhere(oInsuranceData.configurationParts, {type:'image'});

                    this.oInsuranceModel = new InsuranceModel({
                        productId   : oInsuranceData.productId,
                        id          : oInsuranceProduct.id,
                        basePrice   : oInsuranceData.basePrice,
                        settings    : oSettingsCollection,
                        selected    : oInsuranceProduct.selected
                    });

                    /** forcing event handler context to be still pointing to self instance */
                    _.bindAll(this, 'insuranceModelChangeHandler');
                    this.oInsuranceModel.on('change', this.insuranceModelChangeHandler);
                }
            },

            getInsuranceModel: function () {
                return this.oInsuranceModel;
            },

            insuranceModelChangeHandler: function () {
                this.trigger('modelChange', this.oInsuranceModel);
            },

            initialize: function(options) {
                if (typeof options === 'undefined' || typeof options.oProduct === 'undefined') {
                    return;
                }

                this.prepareInsurance(options.oProduct.insurance);

                this.oRegion = options.oRegion;
                this.debug = this.app.debug;
            },

            onStart: function() {
                var oMarkerCollection = this.oInsuranceModel.getSettingCollectionSubsetByType('image');
                var oFieldsCollection = this.oInsuranceModel.getSettingCollectionSubsetByType(['field', 'drop_down']);
                this.oRegion.show(new MarkerCollectionView({
                    collection  : oMarkerCollection,
                    className   : 'insurance',
                    itemView    : InsuranceView,
                    itemViewOptions: {
                        module: this,
                        fieldsCollection: oFieldsCollection
                    }
                }));

                var oCurrentModule = this;
                this.oRegion.on("close", function(){
                    oCurrentModule.trigger('insurance', 'valid');
                    oCurrentModule.stop();
                });
            }
        });
    }
);

