angular.module('starter.controllers', [])

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

    $scope.ref = null;
    $scope.open = function (e) {
        e.preventDefault();

        var options = [];
        /*
        options.push("transitionstyle=" + $scope.transitionStyle.value);
        options.push("presentationstyle=" + $scope.presentationStyle.value);
        options.push("location=" + $scope.locationBar);
        options.push("toolbarposition=" + $scope.toolbarPosition.value);
        */

        $scope.ref = window.open($scope.contentType.value, $scope.target.value, options.join());
        //$scope.ref.addEventListener("loadstart", $scope.iabListener);
        //$scope.ref.addEventListener("loadstop", $scope.iabListener);
        //$scope.ref.addEventListener("loaderror", $scope.iabListener);
        //$scope.ref.addEventListener("exit", $scope.iabClose);

        return false;
    };
});