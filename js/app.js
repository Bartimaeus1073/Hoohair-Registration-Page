var app = angular.module("Hoohair", ["ngAnimate", "firebase"]);

app.constant("RESPONSE_DUPLICATE", "templates/duplicate-response.html");
app.constant("RESPONSE_REGISTERED", "templates/registered-response.html");
app.constant("FORM", "templates/form.html");

app.controller("formCtrl", ["$scope", "$firebaseObject", "RESPONSE_DUPLICATE", "RESPONSE_REGISTERED", "FORM", function($scope, $firebaseObject, responseDuplicate, responseRegistered, form) {
  // variable that removes first animations
  $scope.firstTime = true;
  
  // the ng-module for email field
  $scope.info = {
    email: ''
  };
  
  // mark first use
  angular.element(document).ready(function () {
    setTimeout(function () {
      $scope.firstTime = false;
    }, 0);
  });
  
  // email validation function
  $scope.checkEmail = function() {
    var vRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    $scope.emailValid = vRe.test($scope.info.email);
  }
  
  // resets form in case of failure
  $scope.reset = function() {
    $scope.formTemplate = form;
    $scope.emailValid = false;
    $scope.isRegistering = false;
  };
  
  // registrartion function
  $scope.register = function() {
    if ($scope.isRegistering) {
      return;
    }
    
    $scope.isRegistering = true;
    
    var path = "Website/";
    var ref = firebase.database().ref(path);
    var value = $scope.info;
    var query = $firebaseObject(ref.orderByChild("email").equalTo(value.email));
    
    query.$loaded().then(function(snapshot) {
      var isDuplicate = false;
      // check for existance
      snapshot.forEach(function() {
        isDuplicate = true;
      });
      
      // register if there is no duplicate
      if (!isDuplicate) {
        ref.push(value);
        $scope.formTemplate = responseRegistered;
      } else {
        $scope.formTemplate = responseDuplicate;
      }
    });
  };
  
  // initial reset
  $scope.reset();
  
}]);