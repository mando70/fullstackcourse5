/**
 * Created by mando70 on 9/2/17.
 */
(function () {
    'use strict';

    angular.module('MealStatusApp', [])
        // .controller('MealStatusController', MsgController);
    .controller('MealStatusController', function ($scope) {

// MsgController.$inject = ['$scope'];
//     function MsgController($scope) {
        $scope.meal_status = "";
        $scope.meal_list = "garbage";

    $scope.checkMealStatus = function () {
        console.log('Enter checkMealStatus...')
        $scope.meal_status = "checking..." + $scope.meal_list;
        var letsCheck = checkMeal($scope.meal_list);
        $scope.meal_status = letsCheck;
    };

    function checkMeal(string){
        var numItems = 0;
        var status = "";
        array=[];
        numItems = Object.keys(string).length;
        // split into list
        var array = string.split(',');
        for (var item in array){
            console.log(array[item]);
        }

        if (array.length === 1){
          if (array[0].length === 0 )   {
             status = "Please enter data first";
          }else{
             status = "Enjoy" ;
          }
        } else if (array.length >= 1 && array.length <= 3){
           status = "Enjoy!" ;
        }else if (array.length > 3){
            status = "Too much!";
        }else{
           status = "Please enter data first";
        }
        return [status, array.length, array];
    }


});

})();