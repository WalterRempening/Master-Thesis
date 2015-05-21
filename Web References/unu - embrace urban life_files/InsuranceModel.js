/**
 * Backbone Model for insurance form
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
    'backbone',
    'underscore'
],  function (jQuery, Backbone, _) {
        return Backbone.Model.extend({
            defaults: {
                selected: false
            },
            settingsByTypeCache : {},
            initialize: function () {
                var oSettingsCollection = this.get('settings');

                /** forcing event handler context to be still pointing to self instance */
                _.bindAll(this, 'updateProductParts');
                oSettingsCollection.on('change', this.updateProductParts);
            },
            updateProductParts: function (oChangedModel) {
                var oTmpObject = {},
                    iChangedModelId = oChangedModel.get('id'),
                    oChangedModelOption = oChangedModel.get('selected');

                if (oChangedModel.get('type') === 'image') {
                    this.set({
                        id          : iChangedModelId,
                        optionId    : iChangedModelId,
                        selected    : oChangedModelOption
                    }, {
                        silent      : true /* no need to fire event here, there is one more change below */
                    });
                }

                oTmpObject[iChangedModelId] = oChangedModelOption;
                this.set(oTmpObject);
            },
            getSettingCollectionSubsetByType: function (Type) {
                var aSettingsByType = [];

                if (typeof Type === 'object') {
                    var oSettings = this.get('settings').models,
                        oType = Type,
                        sType = Type.join("-");

                    if (typeof this.settingsByTypeCache[sType] === 'undefined') {
                        _.each(oSettings, function (oModel) {
                            _.each(oType, function (sTypePart) {
                                if (oModel.get('type').indexOf(sTypePart) !== -1){
                                    aSettingsByType.push(oModel);
                                }
                            });
                        });
                        this.settingsByTypeCache[sType] = new Backbone.Collection(aSettingsByType);
                    }
                    return this.settingsByTypeCache[sType];
                } else {
                    if (typeof this.settingsByTypeCache[Type] === 'undefined') {
                        aSettingsByType = this.get('settings').where({type: Type});
                        this.settingsByTypeCache[Type] = new Backbone.Collection(aSettingsByType);
                    }
                    return this.settingsByTypeCache[Type];
                }
            }
        });
    }
);