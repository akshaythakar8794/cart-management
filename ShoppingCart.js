import {INVENTORY} from './Inventory';

export default class ShoppingCart{
    constructor(){
        this.cart = new Map();
        this.total = 0;
    }

    addItem(barcode){
        //finding a item from inventory
        const item = INVENTORY.find(item => item.barcode === barcode);
        
        //check whether that item is already present in cart
        const existed = this.cart.get(barcode);
        
        //if item is already present increase its count otherwise set count to 1 and add it in cart
        item.count = existed ? existed.count + 1 : 1;
        this.cart.set(barcode,item)
     }

    removeItem(barcode){
        //check whether item is present in cart
        const existed = this.cart.get(barcode);

        if(existed){
            // if item is already present then descrese its count
            existed.count = existed.count - 1;    

            //if count is greater than zero keep it otherwise remove it from cart
            existed.count > 0 ? this.cart.set(barcode, existed) : this.cart.delete(barcode);
            return `${existed.itemName} is removed.`    
        }else{
            //if delete is attempted on empty cart, return error message
            return "Cart is empty. Cannot perform delete action."
        }
    }

    generateBill(){
        let billText = '';

        // iterate throught Cart map and create a bill string with item name, its count and its cost
        this.cart.forEach(function(value, key) {
            billText = billText + `${value.count} X ${value.itemName} @${value.price} = ${value.count*value.price} \n`
          })

          const totalItems = Array.from(this.cart.values());

          //Sum up the total cost of items
          const total = totalItems.reduce((prev, current) => {
            return prev + current.price * current.count;
        },0);

        //Concat total amount string to bill string and return it.
        billText = billText + `Total = ${total}`;

        return billText;
    }
}

