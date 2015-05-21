/** required libs, plugins defined in paths and their dependencies defined in shim */
require.config({
    baseUrl:"/skin/frontend/base/default/js/unumotors/",
    paths:{
        // Core Libraries
        "jquery":"/js/jquery/jquery-2.1.0.min",
        "underscore":"/js/backbone/underscore-min",
        "backbone":"/js/backbone/backbone-min",
        "marionette":"/js/marionette/backbone.marionette.min",

        // Plugins
        "text":"/js/require/text",
        "countup": "/js/countup/countUp.min",
        "greensock": "/js/greensock/TweenMax.min",
        "gsCss": "/js/greensock/plugins/CSSPlugin.min",
        "gsEasing": "/js/greensock/easing/EasePack.min",
        "unuanimatescooter": "jquery.unuanimatescooter",
        "unuparallax": "jquery.unuparallax",
        "unustatusbar": "jquery.unustatusbar"
    },
    shim:{
        "countup":{
            "deps":["jquery"]
        },
        "unuparallax":{
            "deps":["jquery","greensock","gsCss"]
        },
        "unustatusbar":{
            "deps":["jquery","greensock","gsCss"]
        },
        "backbone":{
            "deps":["underscore","jquery"],
            "exports":"Backbone"
        },
        "marionette":{
            "deps":["underscore", "backbone","jquery"],
            "exports":"Marionette"
        },
        "unuanimatescooter":{
            "deps":["jquery", "greensock", "gsEasing"]
        }
    }
});

if (typeof jQuery === 'function') {
    //jQuery already loaded, just use that
    define('jquery', function() { return jQuery; });
}

require(['jquery'], function(jQuery){
    jQuery(document).ready(function() {
        var oJSModules = JSON.parse(jQuery('#configurator-json-modules').text());
        define ('configurator-json-modules', oJSModules);
        for (var sModuleName in oJSModules) {
            if (oJSModules.hasOwnProperty(sModuleName)) {
                require([oJSModules[sModuleName]]);
            }
        }
    });
});