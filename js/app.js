var app = angular.module("Hoohair", ["ngAnimate"]);

app.controller("formCtrl", function($scope) {
  $scope.registered = false;
  
  $scope.register = function() {
    $scope.registered = true;
  }
});