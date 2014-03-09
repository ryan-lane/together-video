'use strict';

var tvApp = angular.module('tvApp', []);

tvApp.controller('tvCtrl', function ($scope, $timeout, $log, $http, $location) {
    $scope.auth_required = true;
    $scope.authorized = true;
    $scope.user = {};
    $http.get('/auth/info').success(function(data) {
        $scope.auth_required = data['auth_required'];
        })
    if ($scope.auth_required) {
        $http.get('/user').success(function(data) {
            $scope.user = data;
            })
            .error(function(data, status) {
                if (status == '401') {
                    $scope.authorized = false;
                }
            });
    }

    $scope.logout = function() {
        $http.get('/auth/logout', {})
            .success(function(data) {
                $scope.user = data;
                $scope.authorized = false;
                });
    };

});
