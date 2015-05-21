/**
 * Backbone Model for product
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
    'backbone',
    'configurator/collections/Markers'
],  function (App, jQuery, Backbone, MarkerCollection) {
        var oModel = Backbone.Model.extend({
            defaults: {
                parts: []
            },
            initialize: function (oOptions) {
                var oMarkerCollection = this.get('markers'),
                    oCurrentModel = this;

                this.prepareAdditional();

                oMarkerCollection.on('change', function (oChangedModel) {
                    oCurrentModel.updateProductParts(oChangedModel);

                    // trigger price change
                    oCurrentModel.updatePrice(oChangedModel);
                });
            },
            updatePrice: function (oChangedModel) {
                App.oMainRegion.oPriceBox.model.updateModifier(
                    oChangedModel.get('id'),
                    parseFloat(oChangedModel.get('selected').price)
                );
            },
            updateProductParts: function (oChangedModel) {
                var oTmpObject = {},
                    iChangedModelId = oChangedModel.get('id'),
                    oChangedModelOption = oChangedModel.get('selected');

                oTmpObject[iChangedModelId] = oChangedModelOption;
                this.set(oTmpObject);
                this.trigger('rerender', {model: oChangedModel});
            },
            prepareAdditional: function () {
                var aAdditionalProducts = [],
                    oAdditionalProducts = this.get('additionalProducts');

                if (typeof oAdditionalProducts !== 'undefined'){
                    _.each(oAdditionalProducts, function (oAdditionalProduct){
                        var aPartIds = _.map(oAdditionalProduct.configurationParts, function (oPart) {
                            return oPart.id;
                        });
                        aAdditionalProducts.push({
                            oProductModel: new oModel({
                                id: oAdditionalProduct.productId,
                                basePrice: oAdditionalProduct.basePrice,
                                parts: aPartIds,
                                markers: new MarkerCollection(oAdditionalProduct.configurationParts)
                            })
                        });
                    });
                    this.set({additionalProducts:aAdditionalProducts},{silent:true});
                }
            }
        });

        return oModel;
    }
);