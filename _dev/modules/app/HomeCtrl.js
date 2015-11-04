/*
 * Home Controller
 ****************************************************/

app.controller("HomeCtrl", function ($scope) {
    "use strict";

    $scope.version = {
        "cordova": (window.cordova) ? cordova.version : "n/a",
        "ionic": (window.ionic) ? ionic.version : "n/a",
        "angular": (window.angular) ? angular.version.full : "n/a",
        "jquery": window.jQuery ? jQuery.fn.jquery : "n/a",
        "app": (window.apputils) ? apputils.info.bundleVersion : "n/a",
        "apputils": (window.apputils) ? apputils.version : "n/a"
    };

});