/**
 * Created by mando70 on 9/10/17.

<!--#### Steps for Implementing Assignment Requirements-->
<!--DONE   1. Declare `ng-app` either on the `html` or the `body` element. Name your app `NarrowItDownApp`.-->

<!--DONE   2. Create `app.js` in your project and declare an Angular module to match your `ng-app`declaration.-->

<!--DONE   3. Declare and create a NarrowItDownController (with controller as syntax)
that will wrap your search textbox and button as well as the list of found items.-->

<!--4. Declare and create MenuSearchService. -->
<!--The service should have the following method: getMatchedMenuItems(searchTerm). -->
<!--That method will be responsible for reaching out to the server (using the $http service) -->
<!--to retrieve the list of all the menu items. Once it gets all the menu items, -->
<!--it should loop through them to pick out the ones whose description matches the searchTerm. -->
<!--Once a list of found items is compiled, it should return that list (wrapped in a promise). -->
<!--Remember that the `then` function itself returns a promise. -->
<!--Your method would roughly look like this:-->
<!--```javascript-->
<!--return $http(...).then(function (result) {-->
<!--// process result and only keep items that match-->
<!--var foundItems...-->

<!--// return processed items-->
<!--return foundItems;-->
<!--});-->
<!--```-->
<!--The URL for the REST Endpoint is https://davids-restaurant.herokuapp.com/menu_items.json-->

    <!--5. The NarrowItDownController should be injected with the MenuSearchService. -->
    <!--The controller should call the getMatchedMenuItems method when appropriate -->
    <!--and store the result in a property called `found` attached to the controller instance.-->

    <!--6. Declare and create `foundItems` directive. The list should be displayed -->
    <!--using this `directive` which takes the `found` array of items specified on it -->
    <!--as an attribute (think one-way binding with '<'). -->
    <!--To implement the functionality of the "Don't want this one!" button, -->
    <!--the directive should also provide an on-remove attribute that will use function -->
    <!--reference binding to invoke the parent controller removal an item from the `found` array -->
    <!--based on an index into the `found` array. The index should be passed in from the directive -->
    <!--to the controller. -->
    <!--(Note that we implemented almost identical type of behavior in the Lecture 30 Part 2, -->
    <!--so as long as you understood that code, it should be very close to copy/paste). -->
    <!--In the NarrowItDownController, simply remove that item from the `found` array. -->
    <!--You can do that using the [Array's splice() method]-->
    <!--(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).-->
<!--For example, to remove an item with the index of 3 from the `found` array, -->
<!--you would call `found.splice(3, 1);`.-->
 */
(function () {
    'use strict';


    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItems);


    function FoundItems() {
        var ddo = {
            templateUrl: 'menuItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    NarrowItDownController.$inject = [ 'MenuSearchService' ];

    function NarrowItDownController(MenuSearchService) {

        var searchListCtrl = this;

        searchListCtrl.getMatchedMenuItems = function(searchTerm) {

            if (searchTerm.length > 0) {
                var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
                promise.then(function (response) {
                    searchListCtrl.found = response;
                })
                    .catch(function (error) {
                        console.log("Something went terribly wrong.");
                    });
            }
            else {
                searchListCtrl.found = [];
            }


        };

        searchListCtrl.removeItem = function (itemIndex) {
            searchListCtrl.found.splice(itemIndex, 1);
        };
    }

    // // instantiating instance will automatically get list
    // NarrowItDownController.$inject = ['MenuSearchService'];
    // function NarrowItDownController(MenuSearchService) {
    //     var menu = this;
    //     // var promise = MenuSearchService.getMenuItems();
    //     var promise = MenuSearchService.getMatchedMenuItems("Chicken");
    //
    //     promise.then(function (response) {
    //         menu.items = response;
    //     })
    //         .catch(function (error) {
    //             console.log('something went wrong');
    //
    //         });
    //     return menu.items;
    // }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMenuItems = function(){
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
            });
            console.log('getMenuItems');
            return response;
        }

        service.getMatchedMenuItems = function(searchTerm){
            var foundItems = [];
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
            }).then (function(response){
                for (var item in response.data.menu_items) {
                    // next we want to filter the results
                    if (response.data.menu_items[item].name.includes(searchTerm)){
                        console.log(response.data.menu_items[item].name);
                        foundItems.push(response.data.menu_items[item]);
                    }

                }
                return foundItems;
            }).catch(function(error){
                return err;
            });
        }

    }


})();
