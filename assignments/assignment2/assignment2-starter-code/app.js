/**
 * Created by mando70 on 9/4/17.
 */
(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListService', ShoppingListService);

    ToBuyController.$inject = ['ShoppingListService'];
    function ToBuyController(ShoppingListService) {
        var toBuyItems  = this;

        toBuyItems.allBought = false;
        toBuyItems.someBought = false;
        toBuyItems.items = ShoppingListService.getItemsToBuy();

        toBuyItems.removeFromToBuy = function (itemIndex) {
            console.log('remove ' +  itemIndex);
            var itemsToBuy = ShoppingListService.getItemsToBuy();
            console.log("itemIndex  " + itemIndex + " updating for " + itemsToBuy[itemIndex].name + " quantity " + itemsToBuy[itemIndex].quantity);
            ShoppingListService.addItemToAlreadyBoughtList(itemsToBuy[itemIndex].name, itemsToBuy[itemIndex].quantity);
            ShoppingListService.removeItemFromToBuyList(itemIndex);

            toBuyItems.someBought = true;

            if (itemsToBuy.length === 0){
                toBuyItems.allBought = true;
            }

        };

    }


    AlreadyBoughtController.$inject = ['ShoppingListService'];
    function AlreadyBoughtController(ShoppingListService){
        var alreadyBoughtItems = this;

       alreadyBoughtItems.items = ShoppingListService.getItemsBought();

       alreadyBoughtItems.someBought = function() {
           console.log('items bought = ' + alreadyBoughtItems.items.length);
           if (alreadyBoughtItems.items.length > 0) {
               return false;
           }
           return true;
       }
    }

    function ShoppingListService(){
        var service = this;
        var itemsToBuy = [
            {name: "donuts", quantity: 2},
            {name: "milk", quantity: 22},
            {name: "raisins", quantity: 200},
            {name: "oatmeal", quantity: 25} ,
            {name: "chocolate donuts", quantity: 23} ] ;

        var alreadyBoughtItems = [];

        // remove the item specified at itemIndex from the itemsToBuy list.
        service.removeItemFromToBuyList = function (itemIndex){
            itemsToBuy.splice(itemIndex,1);
        };

        // add item to itemsToBuy list
        service.addItemToAlreadyBoughtList = function(itemName, itemQuantity){
            var item = {
                name: itemName,
                quantity: itemQuantity
            };
            alreadyBoughtItems.push(item) ;
        };

        service.getItemsBought = function(){
           return alreadyBoughtItems;
        };

        service.getItemsToBuy = function() {
            return itemsToBuy;
        };
    }

})();
