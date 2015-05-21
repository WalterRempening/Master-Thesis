/**
 * Marionette Router for routing urls to controller actions
 * Under appRoutes the different routes and trigger names should be added.
 *
 * @module      AppRouter
 * @requires    Marionette
 * @returns     {object} Marionette Router
 * @category    UnuMotors/configurator
 * @copyright   Copyright (c) 2014 Sitewards GmbH (http://www.sitewards.com/)
 */
define([
    'marionette'
],  function (Marionette) {
        return Marionette.AppRouter.extend({
            appRoutes: {
                "": "stepone",
                "step-2": "steptwo",
                "step-3": "stepthree"
            },
            onRoute: function() {
                if(window._gaq) {
                    _gaq.push(['_trackPageview', location.pathname + location.search + location.hash]);
                }
            }
        });
    }
);