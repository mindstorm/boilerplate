/*
 * UI-ROUTER ROUTES
 ****************************************************/

app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    "use strict";

    $stateProvider
        .state("app", {
            url: "/app",
            abstract: true,
            templateUrl: "app/Menu.html",
            controller: "MainCtrl"
        })
        .state("app.home", {
            url: "/home",
            views: {
                "menuContent": {
                    templateUrl: "app/Home.html",
                    controller: "HomeCtrl"
                }
            }
        })
        .state("app.cordova", {
            url: "/cordova",
            abstract: "true",
        })
        .state("app.cordova.device", {
            url: "/device",
            views: {
                "menuContent@app": {
                    templateUrl: "cordova/device/Device.html",
                    controller: "DeviceCtrl"
                }
            }
        })
        .state("app.cordova.inappbrowser", {
            url: "/inappbrowser",
            views: {
                "menuContent@app": {
                    templateUrl: "cordova/inappbrowser/InAppBrowser.html",
                    controller: "InAppBrowserCtrl"
                }
            }
        })
        .state("app.cordova.statusbar", {
            url: "/statusbar",
            views: {
                "menuContent@app": {
                    templateUrl: "cordova/statusbar/StatusBar.html",
                    controller: "StatusBarCtrl"
                }
            }
        })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise("/app/home");
}]);