angular.module("Hoohair", [])

.controller("formCtrl", function($scope) {
  $scope.registered = false;
  
  $scope.register = function() {
    $scope.registered = true;
  }
});