/**
 * Start of the main configurator application
 * Loading of plugins and combine main router width controller
 *
 * @requires    App,
 *              routers/AppRouter,
 *              controllers/Controller
 */
define([
    'configurator/App',
    'configurator/routers/AppRouter',
    'configurator/routers/CheckoutRouter',
    'configurator/controllers/Controller',
    'jquery',
    'configurator-json-modules'
], function (App, AppRouter, CheckoutRouter, Controller, jQuery, oConfiguratorJsModules) {
        var startTheApp = function () {

            if (window.location.pathname.indexOf('checkout') !== -1){
                App.appRouter = new CheckoutRouter({
                    controller: new Controller()
                });
            } else {
                App.appRouter = new AppRouter({
                    controller: new Controller()
                });
            }

            var oAppSettings = {
                debug: JSON.parse(jQuery('#developer-mode').text())
            };

            App.start(oAppSettings);
        };

        /** loading insurance app if it is available */
        if (oConfiguratorJsModules.hasOwnProperty('insurance')) {
            require(
                [oConfiguratorJsModules.insurance],
                function (InsuranceModule) {
                    App.module(
                        "Insurance",
                        {
                            moduleClass: InsuranceModule,
                            startWithParent: false
                        }
                    );

                    startTheApp();
                }
            );
        } else {
            startTheApp();
        }
    }
);