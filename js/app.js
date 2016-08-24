const REGISTERED_SUCCESS = "templates/registred.html";
const REGISTERED_DUPLICATE = "templates/duplicate.html";

var app = angular.module("Hoohair", ["ngAnimate", "firebase"]);

app.controller("formCtrl", function($scope, $firebaseObject) {
  $scope.responseTemplateUrl = "";
  $scope.emailValid = false;
  $scope.isRegistered = false;
  var isRegistering = false;
  
  $scope.checkEmail = function() {
    var vRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    $scope.emailValid = vRe.test($scope.email);
  }
  
  $scope.reset = function() {
    console.log("reset");
  };
  
  $scope.register = function() {
    if (isRegistering) {
      return
    }
    
    var path = "Website/";
    var ref = firebase.database().ref(path);
    var value = {
      email: $scope.email
    };
    
    isRegistering = true;
    
    var query = $firebaseObject(ref.orderByChild("email").equalTo($scope.email));
    
    query.$loaded().then(function(snapshot) {
      var isDuplicate = false;
      // check for existance
      snapshot.forEach(function() {
        isDuplicate = true;
      });
      
      // register if there is no duplicate
      if (!isDuplicate) {
        ref.push(value);
        $scope.responseTemplateUrl = REGISTERED_SUCCESS;
      } else {
        $scope.responseTemplateUrl = REGISTERED_DUPLICATE;
      }
      
      $scope.isRegistered = true;
      isRegistering = false;
    });
  };
});