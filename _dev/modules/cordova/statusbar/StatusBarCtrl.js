/*
 * Cordova StatusBar Controller
 ****************************************************/

app.controller("StatusBarCtrl", function ($scope) {
  "use strict";
  
  $scope.disabled = false;
  $scope.visability = true;
  $scope.styleTypeData = [{
    name: "Default",
    value: "styleDefault"
    }, {
    name: "Light Content",
    value: "styleLightContent"
    }, {
    name: "Black Translucent",
    value: "styleBlackTranslucent"
    }, {
    name: "Black Opaque",
    value: "styleBlackOpaque"
    }];
  $scope.styleType = $scope.styleTypeData[0];

  // VISABILITY
  // --------------------------------------------------
  $scope.updateVisability = function (value) {
    $scope.visability = value;

    // toggle visability
    if (value) {
      window.StatusBar.show();
    } else {
      window.StatusBar.hide();
    }
  };

  // STYLE
  // --------------------------------------------------
  $scope.updateStyleType = function (value) {
    $scope.styleType = value;

    $scope.visability = StatusBar.isVisible;
    var fn = window.StatusBar[value.value];
    if (typeof fn === "function") {
      fn();
    }
  };

  // INIT
  // --------------------------------------------------
  $scope.$on("$ionicView.enter", function () {

    $scope.output = "";
    
    // check if installed
    if (window.StatusBar) {
      $scope.visability = StatusBar.isVisible;
      $scope.disabled = false;
    } else {
      $scope.log("StatusBar plugin not installed!");
      $scope.disabled = true;
    }
  });

});