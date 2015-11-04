/*
 * UI-ROUTER ROUTES
 ****************************************************/

app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    "use strict";

    $stateProvider
        .state("app", {
            url: "/app",
            abstract: true,
            templateUrl: "menu.html",
            controller: "MainCtrl"
        })
        .state("app.home", {
            url: "/home",
            views: {
                "menuContent": {
                    templateUrl: "Home.html",
                    controller: "HomeCtrl"
                }
            }
        })
        .state("app.cordova", {
            url: "/cordova",
            abstract: "true",
        })
        .state("app.cordova.inappbrowser", {
            url: "/inappbrowser",
            views: {
                "menuContent@app": {
                    templateUrl: "cordova/InAppBrowser.html",
                    controller: "InAppBrowserCtrl"
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise("/app/home");
}]);