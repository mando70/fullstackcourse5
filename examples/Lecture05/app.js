(function () {
'use strict';

angular.module('myFirstApp', [])

.controller('MyFirstController', function ($scope) {
  $scope.name = "inititial value is Yaakov";
  $scope.sayHello = function () {
    return "Hello Coursera!";
  };
});

})();
