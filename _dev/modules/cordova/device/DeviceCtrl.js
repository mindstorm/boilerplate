/*
 * Cordova Device Controller
 ****************************************************/

app.controller("DeviceCtrl", function ($scope) {
    "use strict";

    $scope.items = (window.device) ? window.device : null;
});