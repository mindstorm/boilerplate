/*
 * IONIC APP
 ****************************************************/

var app = angular.module("App", ["ionic", "ngIOS9UIWebViewPatch", "ngSanitize"]);

// INIT
// --------------------------------------------------
app.run(function ($ionicPlatform) {
    "use strict";

    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});

// MAIN CONTROLLER
// --------------------------------------------------
app.controller("MainCtrl", function ($scope) {
    "use strict";
    
    $scope.output = "";

    // OUTPUT
    $scope.log = function (text) {

        var currentdate = new Date();
        var datetime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

        $scope.$apply(function () {
            $scope.output += "<p>[" + datetime + "] " + text;
        });
    };

    // CLEAR
    $scope.clear = function (e) {
        e.preventDefault();
        $scope.output = "";
        return false;
    };
});