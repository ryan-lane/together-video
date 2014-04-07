'use strict';

var tvApp = angular.module('tvApp',
    [
       'ngRoute',
       'angular-md5',
       'com.2fdevs.videogular',
       'com.2fdevs.videogular.plugins.controls',
       'com.2fdevs.videogular.plugins.overlayplay',
       'com.2fdevs.videogular.plugins.buffering',
    ]);

tvApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'static/pages/main.html',
            controller  : 'MainCtrl'
            })
        .when('/video/:hash', {
            templateUrl : 'static/pages/video.html',
            controller  : 'TvCtrl'
            });
    $locationProvider.html5Mode(true);
    });

tvApp.controller('MainCtrl', function ($scope, $http, $window, $location, md5) {
    var hash = null;
    TogetherJS();
    $scope.auth_required = true;
    $scope.authorized = true;
    $scope.user = {};

    $http.get('auth/info').success(function(data) {
        $scope.auth_required = data['auth_required'];
        })
    if ($scope.auth_required) {
        $http.get('user').success(function(data) {
            $scope.user = data;
            })
            .error(function(data, status) {
                if (status == '401') {
                    $scope.authorized = false;
                }
            });
    }

    $scope.login = function() {
        $window.location.pathname = '/auth/login';
        };

    $scope.logout = function() {
        $http.get('auth/logout', {})
            .success(function(data) {
                $scope.user = data;
                $scope.authorized = false;
                });
        };

    $scope.update = function(sourcelink) {
        hash = md5.createHash(sourcelink);
        $http.head(sourcelink).success(function(data, status, headers) {
            data = {
                'video_url': sourcelink,
                'video_type': headers('Content-Type')
            }
            $http.post('data/' + hash, data).success(function() {
                $location.path('/video/' + hash);
                //$scope.$apply();
                });
            });
        };
    });

tvApp.controller('TvCtrl', function ($scope, $http, $routeParams) {
    $scope.loaded = null;
    $scope.currentTime = 0;
    $scope.totalTime = 0;
    $scope.state = null;
    $scope.volume = 1;
    $scope.isCompleted = false;
    $scope.API = null;

    $scope.onPlayerReady = function(API) {
        $scope.API = API;
    };

    $scope.onCompleteVideo = function() {
        $scope.isCompleted = true;
    };

    $scope.onUpdateState = function(state) {
        $scope.state = state;
    };

    $scope.onUpdateTime = function(currentTime, totalTime) {
        $scope.currentTime = currentTime;
        $scope.totalTime = totalTime;
    };

    $scope.onUpdateVolume = function(newVol) {
        $scope.volume = newVol;
    };

    $scope.onUpdateSize = function(width, height) {
        $scope.config.width = width;
        $scope.config.height = height;
    };

    $scope.stretchModes = [
        {label: "None", value: "none"},
        {label: "Fit", value: "fit"},
        {label: "Fill", value: "fill"}
    ];

    $scope.config = {
        width: 740,
        height: 380,
        autoHide: true,
        autoHideTime: 3000,
        autoPlay: false,
        responsive: false,
        stretch: $scope.stretchModes[1],
        theme: {
            url: "static/vendor/videogular-themes-default/videogular.css"
        },
        transclude: true,
        sources: [],
    }

    if ($routeParams.hash) {
        $http.get('data/' + $routeParams.hash).success(function(data) {
            if (Object.keys(data).length !== 0) {
                console.log(JSON.stringify(data))
                $scope.config.sources = [{
                    src: data.video_url,
                    type: data.video_type
                    }];
                $scope.loaded = true;
            }
        });
    }
    });
