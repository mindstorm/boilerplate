/* global angular, window, cordova, ionic, jQuery */

angular.module('starter.controllers', [])

.controller("MainCtrl", function ($scope) {
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
})

.controller("HomeCtrl", function ($scope) {
    "use strict";

    $scope.version = {
        "cordova": (window.cordova) ? cordova.version : "n/a",
        "ionic": (window.ionic) ? ionic.version : "n/a",
        "angular": (window.angular) ? angular.version.full : "n/a",
        "jquery": window.jQuery ? jQuery.fn.jquery : "n/a",
        "app": (window.apputils) ? apputils.info.bundleVersion : "n/a",
        "apputils": (window.apputils) ? apputils.version : "n/a"
    };

})

.controller("InAppBrowserCtrl", function ($scope) {
    "use strict";

    // CONTENTTYPE
    $scope.contentTypeData = [{
        name: "M4V",
        value: "assets/dummy.m4v"
    }, {
        name: "PNG",
        value: "assets/dummy.png"
    }, {
        name: "HTML",
        value: "assets/dummy.html"
    }, {
        name: "WWW",
        value: "http://www.orf.at"
    }];
    $scope.contentType = $scope.contentTypeData[1];
    $scope.updateContentType = function (item) {
        $scope.contentType = item;
    };

    // TARGET
    $scope.targetData = [{
        name: "SELF",
        value: "_self"
    }, {
        name: "BLANK",
        value: "_blank"
    }, {
        name: "SYSTEM",
        value: "_system"
    }];
    $scope.target = $scope.targetData[1];
    $scope.updateTarget = function (item) {
        $scope.target = item;
    };

    // TRANSITION STYLE
    $scope.transitionStyleData = [{
        name: "Flip Horizontal",
        value: "fliphorizontal"
    }, {
        name: "Cross Dissolve",
        value: "crossdissolve"
    }, {
        name: "Cover Vertical",
        value: "coververtical"
    }];
    $scope.transitionStyle = $scope.transitionStyleData[2];
    $scope.updateTransitionStyle = function (item) {
        $scope.transitionStyle = item;
    };

    // TOOLBAR POSITION
    $scope.toolbarPositionData = [{
        name: "Bottom",
        value: "bottom"
    }, {
        name: "Top",
        value: "top"
    }];
    $scope.toolbarPosition = $scope.toolbarPositionData[0];
    $scope.updateToolbarPosition = function (item) {
        $scope.toolbarPosition = item;
    };

    // LOCATION BAR
    $scope.locationBar = 'no';
    $scope.updateLocationBar = function (item) {
        $scope.locationBar = item;
    };

    // TOOL BAR
    $scope.toolBar = 'yes';
    $scope.updateToolBar = function (item) {
        $scope.toolBar = item;
    };

    // LISTENER
    $scope.iabListener = function (event) {
        $scope.log(event.type);

        if (event.url === "iab://notfound") {
            $scope.ref.close();
        }

    };
    $scope.iabClose = function (event) {
        $scope.log(event.type);

        $scope.ref.removeEventListener("loadstart", $scope.iabListener);
        $scope.ref.removeEventListener("loadstop", $scope.iabListener);
        $scope.ref.removeEventListener("loaderror", $scope.iabListener);
        $scope.ref.removeEventListener("exit", $scope.iabClose);
    };

    // OPEN
    $scope.ref = null;
    $scope.open = function (e) {
        e.preventDefault();

        var options = [];
        options.push("transitionstyle=" + $scope.transitionStyle.value);
        options.push("location=" + $scope.locationBar);
        options.push("toolbarposition=" + $scope.toolbarPosition.value);

        $scope.ref = window.open($scope.contentType.value, $scope.target.value, options.join());
        $scope.ref.addEventListener("loadstart", $scope.iabListener);
        $scope.ref.addEventListener("loadstop", $scope.iabListener);
        $scope.ref.addEventListener("loaderror", $scope.iabListener);
        $scope.ref.addEventListener("exit", $scope.iabClose);

        return false;
    };

    $scope.error = function (e) {
        $scope.contentType.value = "FEHLER";
        return $scope.open(e);
    };

});