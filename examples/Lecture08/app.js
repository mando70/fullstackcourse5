(function () {
'use strict';

angular.module('NameCalculator', [])

.controller('NameCaculatorController', function ($scope) {
  $scope.name = "";
  $scope.totalValue = 0;

  $scope.displayNumeric = function () {
    $scope.totalValue = totalNameValue;
    var totalNameValue = calculatNumericForString($scope.name);
  };


  function calculatNumericForString(string) {
    var totalStringValue = 0;
      for (var i = 0; i < string.length; i++) {
          totalStringValue += string.charCodeAt(i);
      }

    return totalStringValue;
  }

});


})();
