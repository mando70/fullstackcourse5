/**
 * Created by mando70 on 9/10/17.
 */
(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuCategoriesService', MenuCategoriesService)

    function NarrowItDownController(MenuListFactory) {
        var list = this;

        // Use factory to create new shopping list service
        var menuList = MenuListFactory();

        list.items = menuList.getItems();

    }
        // If not specified, maxItems assumed unlimited
        function MenuListService(maxItems) {
            var service = this;

            // List of shopping items
            var items = [];

            service.addItem = function (itemName, quantity) {
                if ((maxItems === undefined) ||
                    (maxItems !== undefined) && (items.length < maxItems)) {
                    var item = {
                        name: itemName,
                        quantity: quantity
                    };
                    items.push(item);
                }
                else {
                    throw new Error("Max items (" + maxItems + ") reached.");
                }
            };

            service.removeItem = function (itemIndex) {
                items.splice(itemIndex, 1);
            };

            service.getItems = function () {
                return items;
            };
        }


        function MenuListFactory() {
            var factory = function (maxItems) {
                return new MenuListService(maxItems);
            };

            return factory;
        }

})();
