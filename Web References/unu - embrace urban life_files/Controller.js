/**
 * Backbone Marionette Controller
 * Provide the different route actions. The initialize function will be called
 * on every route.
 *
 * @module      Controller
 * @requires    configurator/App,
 *              Backbone,
 *              Marionette
 * @returns     {object} Backbone Marionette Controller
 * @category    UnuMotors/configurator
 * @copyright   Copyright (c) 2014 Sitewards GmbH (http://www.sitewards.com/)
 */
define([
    'configurator/App',
    'jquery',
    'backbone',
    'marionette',

    'configurator/collections/Markers',

    'configurator/views/StatusBar',
    'configurator/views/PriceBox',
    'configurator/views/Product',
    'configurator/views/Hint',

    'configurator/models/Product',
    'configurator/models/PriceBox',
    'configurator/models/Hint'
],  function (
        App,
        jQuery,
        Backbone,
        Marionette,
        MarkerCollection,
        StatusBar,
        PriceBox,
        ProductView,
        HintView,
        ProductModel,
        PriceModel,
        HintModel
    ) {
        /**
         * Configurator steps
         */
        var aSteps = ['', 'step-2', 'step-3', 'checkout'];
        var sCurrentStep  = '';
        var sCheckoutStep = 'checkout';
        var aStepRegions = [
            App.oMarkerRegion,
            App.oAdditionalRegion,
            App.oInsuranceRegion
        ];

        var $backButton = jQuery('#back-button');
        var $proceedButton = jQuery('#proceed-button');

        /**
         * Model and view for displaying hints
         *
         * @type {configurator.models.Hint}
         * @type {configurator.views.Hint}
         */
        var oHint = new HintView({
            model: new HintModel({
                title:'foo'
            })
        });
        App.oProceedHint.show(oHint);

        /**
         * Semaphore blocking the navigation if the server sync is currently in progress
         *
         * @type {boolean}
         */
        var bServerSyncInProgress = false;

        /**
         * Semaphore blocking the navigation if the step-3 module state blocks it
         *
         * @type {boolean}
         */
        var bStepThreeIsNotValid = false;

        /**
         * Semaphore blocking the navigation if user press some button leading him out of the configurator
         *
         * @type {boolean}
         */
        var bUserNavigatedOut = false;

        /**
         * Semaphore blocking the background animation
         *
         * @type {boolean}
         */
        var bForwardToCheckout = false;

        /**
         * Main product model
         *
         * @type {Object}
         */
        var oProductModel = null;

        /**
         * Main product view
         *
         * @type {Object}
         */
        var oProductView = null;

        /**
         * Checks the current state and allows navigation only if nothing blocks it.
         *
         * @returns {boolean} true if navigation enabled and false otherwise
         */
        var isNavigationEnabled = function () {
            return !bServerSyncInProgress && !bStepThreeIsNotValid && !bUserNavigatedOut;
        };

        /**
         * Checks if it is allowd to animate background
         *
         * @returns {boolean}
         */
        var canAnimateBackground = function () {
            return App.oProduct.configuratorBgParallaxEnabled && !bForwardToCheckout;
        };

        /**
         * refresh the current region and close others
         *
         * @param sCurrentStepName compare to aSteps
         */
        var refreshRegions = function (sCurrentStepName) {
            var iCurrentStepKey = _.indexOf(aSteps, sCurrentStepName);
            _.each(aStepRegions, function (oRegion, iKey) {
                if (iKey === iCurrentStepKey){
                    if (App.debug) {
                        console.log('step:', aSteps[iKey], oRegion.el, 'reset');
                    }
                    oRegion.reset();
                } else {
                    if (App.debug) {
                        console.log('step:', aSteps[iKey], oRegion.el, 'close');
                    }
                    oRegion.close();
                }
            });
        };

        /**
         * returns the step previous to the current one
         *
         * @param sStep {string}
         * @returns {*}
         */
        var getPreviousStep = function(sStep) {
            var iPreviousStepIndex = aSteps.indexOf(sStep) - 1;
            if (iPreviousStepIndex >= 0) {
                return aSteps[iPreviousStepIndex];
            } else {
                return null;
            }
        };

        /**
         * returns the step next to the current one
         *
         * @param sStep {string}
         * @returns {string}
         */
        var getNextStep = function(sStep) {
            var iNextStepIndex = aSteps.indexOf(sStep) + 1;
            if (iNextStepIndex > 0 && iNextStepIndex < aSteps.size()) {
                return aSteps[iNextStepIndex];
            } else {
                return sCheckoutStep;
            }

        };

        /**
         * goes to the next configurator step
         */
        var gotoNextStep = function() {
            gotoStep(
                getNextStep(sCurrentStep)
            );
        };

        /**
         * goes to the previous configurator step
         */
        var gotoPreviousStep = function() {
            gotoStep(
                getPreviousStep(sCurrentStep)
            );
        };

        /**
         * goes to the given step and sets it as the new current one
         *
         * @param sStep {string}
         */
        var gotoStep = function(sStep) {
            sCurrentStep = sStep;
            App.appRouter.navigate(sStep, true);
        };

        /**
         * If we want to we can create a good error handling system here
         */
        var errorHandling = function () {
            alert('An error occurred, please retry');
        };

        /**
         * show or hide back button dependent on the previous step
         */
        var toggleBackButton = function() {
            var sPreviousStep = getPreviousStep(sCurrentStep);
            if (sPreviousStep === null) {
                $backButton.hide();
            } else {
                $backButton.show();
            }
        };

        /**
         * enable or disable button
         *
         * @param $button {Object}
         * @param bActivate {Boolean}
         */
        var toggleButtonActive = function ($button, bActivate) {
            if (bActivate) {
                $button.removeAttr('disabled');
            } else {
                $button.attr('disabled', 'disabled');
            }
        };

        /**
         * returns basic product information to be sent to magento backend
         *
         * @param iProductId
         * @returns {{params: {product: *, qty: number, options: {}}}}
         */
        var getBasicProductConfiguration = function (iProductId) {
            return {
                "params": {
                    "product": iProductId,
                    "qty": 1,
                    "options": {}
                }
            };
        };

        /**
         * Send configuration data to server
         * Move to next step
         *
         * @param oEvent
         */
        var proceed = function(oEvent) {
            var oMarkerCollection = oEvent.data.productModel.get('markers');
            var iProductId = oEvent.data.productModel.get('productId');

            // main product
            var oProductParams = getBasicProductConfiguration(iProductId);

            oMarkerCollection.each(function(oMarker) {
                // add product option only if value has price or there are more then on value
                if (oMarker.attributes.selected.price > 0 || oMarker.attributes.options.length > 1) {
                    oProductParams["params"]["options"][oMarker.id] = oMarker.attributes.selected.id;
                }
            });

            var sProductsKey = $proceedButton.data('products-key');
            var oRequest = {};
            oRequest[sProductsKey] = [oProductParams];


            // additional products
            oEvent.data.productModel.get('additionalProducts').each(function(oAdditionalProduct) {
                var oProductModel = oAdditionalProduct.oProductModel;
                var aParts = oProductModel.get('parts');
                var iPart = aParts[0];
                var oSelected = oProductModel.get(iPart);
                if (typeof oSelected !== 'undefined') {
                    // add product only if it's worth something, so we don't add the custom option "no helmet"
                    if (oSelected.price > 0) {
                        var oProductParams = getBasicProductConfiguration(oProductModel.get('id'));
                        oProductParams.params.options[iPart] = oSelected.id;

                        oRequest[sProductsKey].push(oProductParams);
                    }
                }
            });

            // insurance
            if (typeof App.module("Insurance") !== 'undefined') {
                var oInsurance = App.module("Insurance").getInsuranceModel();

                if (oInsurance) {
                    var oSelectedInsurance = oInsurance.get('selected');
                    var iOptionId = oInsurance.get('optionId');
                    if (oSelectedInsurance.price > 0 && typeof iOptionId !== 'undefined') {
                        var oProductParams = getBasicProductConfiguration(oInsurance.get('productId'));
                        oProductParams.params.options[iOptionId] = oSelectedInsurance.id;

                        var aFields = oSelectedInsurance.fields;
                        if (typeof aFields !== 'undefined') {
                            for (var i = 0; i < aFields.length; i++) {
                                var oField = aFields[i];
                                var aIdOption = oField.name.match(/[0-9]+/);
                                if (aIdOption.length > 0) {
                                    oProductParams.params.options[aIdOption[0]] = oField.value;
                                }
                            }
                        }

                        oRequest[sProductsKey].push(oProductParams);
                    } else if (getNextStep(sCurrentStep) == sCheckoutStep) {
                        // insurance option was not selected yet
                        /*if (oSelectedInsurance == false) {
                            alert(Translator.translate('Please select an insurance option!'));
                            return false;
                        }*/
                    }
                }
            }

            /**
             * hides buttons and price, animates the scooter out and redirects to the checkout url
             *
             * @param $elementsToHide {object}
             * @param oProductView {object}
             * @param sUrl {string}
             * @param iFadeOutDuration {int}
             */
            var finalizeConfigurator = function ($elementsToHide, oProductView, sUrl, iFadeOutDuration) {
                iFadeOutDuration = iFadeOutDuration || 500;
                bForwardToCheckout = true;

                // visually hide regions to get rid of insurance stuff
                hideRegions();

                // removed the fade because callback fired three times
                // we maybe should refactor this later in a smooth animations story
                $elementsToHide.hide();

                oProductView.animateOut({
                    ease: Quint.easeInOut,
                    duration: 3,
                    complete: function () {
                        document.location.href = sUrl;
                    }
                });
            };

            App.trigger('sync',true);
            jQuery.ajax({
                url: $proceedButton.data('action'),
                type: "post",
                data: oRequest,
                success: function (oResponse) {
                    var bSuccess;
                    var sForwardUrl;
                    try {
                        bSuccess = oResponse.bSuccess && typeof oResponse.sForwardUrl === 'string';
                        sForwardUrl = oResponse.sForwardUrl;
                    } catch (e) {
                        bSuccess = false;
                        sForwardUrl = '';
                        errorHandling(e);
                        return;
                    }

                    if (bSuccess) {
                        var sNextStep = getNextStep(sCurrentStep);
                        if (sNextStep === sCheckoutStep) {
                            bUserNavigatedOut = true;
                            toggleButtonActive($proceedButton, isNavigationEnabled());

                            finalizeConfigurator(
                                $backButton.add($proceedButton).add(jQuery('.price-box')),
                                oProductView,
                                sForwardUrl
                            );

                        } else {
                            gotoNextStep();
                            toggleBackButton();
                        }
                    }
                },
                error: function(){
                    App.trigger('sync',false);
                    errorHandling();
                },
                complete: function(){
                    App.trigger('sync',false);
                    if(App.debug) {
                        console.log('-> Sending status to server done!');
                    }
                }
            });
        };

        /**
         * go back to the previous configurator step
         *
         * @param oEvent
         */
        var goBack = function(oEvent) {
            App.trigger('goBack');
            gotoPreviousStep();
            toggleBackButton();
            if (App.oProduct.configuratorBgParallaxEnabled) {
                animateBackground(true);
            }

            oHint.model.set({
                hidden: true
            });
        };

        /**
         * helper function for displaying additional products
         *
         * @param oRegion
         * @param aAdditionalProducts
         * @param bMarkers
         */
        var displayAdditionalProducts = function (oRegion, aAdditionalProducts, bMarkers) {
            require([
                'backbone',
                'underscore',
                'configurator/views/MarkersCollection',
                'configurator/views/Product',
                'configurator/views/AdditionalProductWrapper'
            ],  function (Backbone, _, MarkersCollectionView, ProductView, AdditionalProductWrapperView) {
                _.each(aAdditionalProducts, function(oAdditionalProduct) {
                    var aAttachedViews = [];
                    aAttachedViews.push(new ProductView({model: oAdditionalProduct.oProductModel}).render().el);
                    if (bMarkers) {
                        aAttachedViews.push(new MarkersCollectionView({collection: oAdditionalProduct.oProductModel.get('markers')}).render().el);
                    }

                    // for this region show and close are rewritten look at App.js line:30
                    var oViewToShow = new AdditionalProductWrapperView({
                        id: oAdditionalProduct.oProductModel.get('id'),
                        attachedViews: aAttachedViews
                    });

                    oRegion.show(oViewToShow, {
                        preventClose: true
                    });
                });


                _.each(oProductModel.get('additionalProducts'), function (oModel) {
                    var oAdditionalProduct = oModel.oProductModel;
                    // do updating parts to make sure the preselection is shown
                    _.each(oAdditionalProduct.get('markers').models, function(oMarkerModel){
                        oAdditionalProduct.updateProductParts(oMarkerModel);
                    });
                });
            });
        };

        /**
         * animateBackground function for triggering background animation
         * and fire events
         *
         * @param bBack boolean set true if animation should be backwards
         */
        var animateBackground = function (bBack) {
            var cEase = Quint.easeInOut;
            var iDuration = 4;

            // only animate the wheel this way if were in configuration steps
            if(!bForwardToCheckout){
                oProductView.animateWheel({
                    ease: cEase,
                    back: (bBack === true),
                    range: 800,
                    duration: iDuration
                });
            }

            var oOptions = {
                back: (bBack === true),
                step: aSteps.indexOf(sCurrentStep),
                duration: iDuration,
                complete: function () {
                    App.oBackground.currentStep = aSteps.indexOf(sCurrentStep);
                }
            };

            App.oBackground.unuParallaxAnimate(oOptions);
        };

        /**
         * function to hide all regions e.g. during animation
         */
        var hideRegions = function () {
            var oProductWrap = jQuery('.configurator__product');
            _.each(aStepRegions, function (oRegion) {
                oProductWrap.children(oRegion.el).hide();
            });
        };

        /**
         * function to show all regions after animation
         */
        var showRegions = function () {
            var oProductWrap = jQuery('.configurator__product');
            _.each(aStepRegions, function (oRegion) {
                oProductWrap.children(oRegion.el).show();

                // if there is a currentView in the region fire event on app which region is activated
                if(typeof oRegion.currentView !== 'undefined') {
                    App.trigger('regionActivated', {active: true, region: oRegion});
                }
            });
        };

        /**
         * function to update the price box model
         *
         * @param oMarkerModels
         * @param oAdditionalProduct
         */
        var updatePriceBoxModel = function (oMarkerModels, oAdditionalProduct) {
            _.each(oMarkerModels, oAdditionalProduct.updatePrice);
        };

        return Backbone.Marionette.Controller.extend({
            initialize:function () {
                var oProduct = App.oProduct;

                // Main product set marker, product view and model
                // additional products will be prepared in the product model (models/Product.js)
                this.markerCollection = new MarkerCollection(oProduct.configurationParts);
                var aPartIds = _.map(oProduct.configurationParts, function (oPart) {
                    return oPart.id;
                });
                oProductModel = new ProductModel({
                    parts: aPartIds,
                    markers: this.markerCollection,
                    additionalProducts: oProduct.additionalProducts,
                    productId: oProduct.productId
                });
                oProductView = new ProductView({model: oProductModel});
                App.oProductRegion.show(oProductView);

                // set status bar
                App.oHeaderRegion.oStatusBar = new StatusBar();

                // set priceBox model and view
                var oPriceModel = new PriceModel({
                    fBasePrice: parseFloat(App.oProduct.basePrice)
                });
                App.oMainRegion.oPriceBox = new PriceBox({model: oPriceModel});

                // display selected product parts
                _.each(this.markerCollection.models, function (oMarkerModel) {
                    oProductModel.updateProductParts(oMarkerModel);
                });

                // update main product price on load if we already have some selected stuff
                updatePriceBoxModel(this.markerCollection.models, oProductModel);

                // collect data for checkout
                var oBindData = { productModel: oProductModel };
                $proceedButton.bind('click', oBindData , proceed);

                // init back button
                toggleBackButton();
                $backButton.bind('click', {}, goBack);

                if (typeof App.module("Insurance") !== 'undefined') {
                    App.module("Insurance").initialize({
                        oProduct: App.oProduct,
                        oRegion: App.oInsuranceRegion
                    });

                    var insuranceModelChangeHandler = function (oInsuranceModel) {
                        oProductModel.updatePrice(oInsuranceModel);
                    };

                    /* listening to insurance model changes */
                    App.module("Insurance").on('modelChange', insuranceModelChangeHandler);

                    /* listening to the form validation state changes */
                    App.module("Insurance").bind('insurance',function (oEvent) {
                        bStepThreeIsNotValid = (oEvent !== 'valid');
                        toggleButtonActive($proceedButton, isNavigationEnabled());

                        if(!bStepThreeIsNotValid) {
                            oHint.model.set({
                                hidden: true
                            });
                        }
                    });
                }

                App.bind('sync', function (oEvent) {
                    if(App.debug){
                        console.log('-> disable/enable proceed', oEvent);
                        console.log('current Step:', sCurrentStep);
                    }

                    if( oEvent == false && canAnimateBackground()){
                        animateBackground(false);
                    }
                    bServerSyncInProgress = oEvent && true;

                    // if sync is done we got an event sync false
                    toggleButtonActive($proceedButton, isNavigationEnabled());
                });

                App.oBackground.on('bgAnimated', function (oEvent) {
                    if(oEvent.value){
                        hideRegions();
                    }else{
                        showRegions();
                    }
                });
            },
            stepone:function () {
                // Step one: configuring the scooter seat, engine and color
                sCurrentStep = aSteps[0];
                refreshRegions(sCurrentStep);

                if (App.debug) {
                    console.log('step one started');
                    console.log('Markers: ', this.markerCollection);
                }

                // display markers
                var oMarkerCollection = this.markerCollection;
                require(['configurator/views/MarkersCollection'], function (MarkersCollectionView) {
                    var MarkerCollectionView = new MarkersCollectionView({collection:oMarkerCollection});
                    App.oMarkerRegion.show(MarkerCollectionView);
                });

                App.oHeaderRegion.oStatusBar.setCurrentStep(0);
            },
            steptwo: function () {
                // Step two: add additional products like helmet and battery

                sCurrentStep = aSteps[1];
                refreshRegions(sCurrentStep);
                toggleBackButton();

                if( App.oBackground.currentStep !== aSteps.indexOf(sCurrentStep) ){
                    animateBackground(false);
                }

                if (App.debug) {
                    console.log('step two started');
                }

                // update additional product price on load if we already have some selected stuff
                _.each(oProductModel.get('additionalProducts'), function (oModel) {
                    updatePriceBoxModel(oModel.oProductModel.get('markers').models, oModel.oProductModel);
                });

                // display additional products and markers
                displayAdditionalProducts(App.oAdditionalRegion, oProductModel.get('additionalProducts'), true);

                App.oHeaderRegion.oStatusBar.setCurrentStep(1);
            },
            stepthree:function () {
                // Step three: add insurance

                sCurrentStep = aSteps[2];
                refreshRegions(sCurrentStep);
                toggleBackButton();

                if( App.oBackground.currentStep !== aSteps.indexOf(sCurrentStep) ){
                    animateBackground(false);
                }

                if (App.debug) {
                    console.log('step three started');
                }

                // update additional product price on load if we already have some selected stuff
                _.each(oProductModel.get('additionalProducts'), function (oModel) {
                    updatePriceBoxModel(oModel.oProductModel.get('markers').models, oModel.oProductModel);
                });

                if (typeof App.module("Insurance") !== 'undefined') {
                    App.module("Insurance").start();
                }

                /*if(bStepThreeIsNotValid) {
                    oHint.model.set({
                        title: Translator.translate('Please select an insurance option!'),
                        hidden: false
                    });
                }*/

                App.oHeaderRegion.oStatusBar.setCurrentStep(2);
            },
            checkout: function () {
                var oMarkerCollection = this.markerCollection;

                var oTmpObject = {};
                _.each(oMarkerCollection.models, function (oModel) {
                    oTmpObject[oModel.get('id')] = oModel.get('selected');
                    App.oProductRegion.currentView.model.set(oTmpObject);
                });

                oProductView.animateIn({
                    ease: Quint.easeInOut,
                    duration: 4,
                    complete: function () {
                        displayAdditionalProducts(
                            App.oAdditionalRegion,
                            oProductModel.get('additionalProducts'),
                            false
                        );

                        /** showing the static block with product information */
                        jQuery('.stage .stage__body')
                            /** showing the sharing button */
                            .add('.stage .stage__product .stage__buttons')
                            .fadeIn(500);
                    }
                });
            }
        });
    }
);