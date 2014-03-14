'use strict';

var tvApp = angular.module('tvApp',
    [
       "com.2fdevs.videogular",
       "com.2fdevs.videogular.plugins.controls",
       "com.2fdevs.videogular.plugins.overlayplay",
       "com.2fdevs.videogular.plugins.buffering",
    ]);

tvApp.controller('TvCtrl', function ($scope, $sce, $http) {
    $scope.auth_required = true;
    $scope.authorized = true;
    $scope.user = {};
    $scope.loaded = null;
    $scope.stretchModes = [
        {label: "None", value: "none"},
        {label: "Fit", value: "fit"},
        {label: "Fill", value: "fill"}
    ];

    $scope.config = {
        autoHide: false,
        autoHideTime: 3000,
        autoPlay: false,
        responsive: false,
        stretch: $scope.stretchModes[1],
        theme: {
            url: "static/vendor/videogular-themes-default/videogular.css",
            playIcon: "&#xe000;",
            pauseIcon: "&#xe001;",
            volumeLevel3Icon: "&#xe002;",
            volumeLevel2Icon: "&#xe003;",
            volumeLevel1Icon: "&#xe004;",
            volumeLevel0Icon: "&#xe005;",
            muteIcon: "&#xe006;",
            enterFullScreenIcon: "&#xe007;",
            exitFullScreenIcon: "&#xe008;"
        },
    }

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

    $scope.logout = function() {
        $http.get('auth/logout', {})
            .success(function(data) {
                $scope.user = data;
                $scope.authorized = false;
                });
    };

    $scope.update = function(sourcelink) {
        $http.head(sourcelink).success(function(data, status, headers) {
            var sourceElement = angular.element("videogular video");
            $scope.loaded = true;
            sourceElement[0].src = $sce.trustAsResourceUrl(sourcelink);
            sourceElement[0].type = headers('Content-Type');
        });
    };

});
