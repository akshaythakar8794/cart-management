import ShoppingCart from "./ShoppingCart";

describe("Adding items to cart", () => {
  test("should add single item to cart one time", () => {
    //Arrange
    const shoppingCart = new ShoppingCart();

    //Act
    shoppingCart.addItem(110);

    //Assert
    expect(shoppingCart.cart.size).toEqual(1);
    expect(shoppingCart.cart.get(110).itemName).toEqual("Apple");
    expect(shoppingCart.cart.get(110).count).toEqual(1);
  });

  test("should add one item to cart multiple times", () => {
    const shoppingCart = new ShoppingCart();
    shoppingCart.addItem(110);
    shoppingCart.addItem(110);
    shoppingCart.addItem(110);
    expect(shoppingCart.cart.size).toEqual(1);
    expect(shoppingCart.cart.get(110).itemName).toEqual("Apple");
    expect(shoppingCart.cart.get(110).count).toEqual(3);
  });

  test("should add different item to cart one time", () => {
    const shoppingCart = new ShoppingCart();
    shoppingCart.addItem(110);
    shoppingCart.addItem(111);
    shoppingCart.addItem(112);
    expect(shoppingCart.cart.size).toEqual(3);
    expect(shoppingCart.cart.get(110).itemName).toEqual("Apple");
    expect(shoppingCart.cart.get(111).itemName).toEqual("Mango");
    expect(shoppingCart.cart.get(112).itemName).toEqual("Orange");
    expect(shoppingCart.cart.get(110).count).toEqual(1);
    expect(shoppingCart.cart.get(111).count).toEqual(1);
    expect(shoppingCart.cart.get(112).count).toEqual(1);
  });

  test("should add different item to cart multiple times", () => {
    const shoppingCart = new ShoppingCart();
    shoppingCart.addItem(110);
    shoppingCart.addItem(110);
    shoppingCart.addItem(111);
    shoppingCart.addItem(111);
    expect(shoppingCart.cart.size).toEqual(2);
    expect(shoppingCart.cart.get(110).itemName).toEqual("Apple");
    expect(shoppingCart.cart.get(111).itemName).toEqual("Mango");
    expect(shoppingCart.cart.get(110).count).toEqual(2);
    expect(shoppingCart.cart.get(111).count).toEqual(2);
  });
});

describe("Deleting items from cart", () => {
  test("should delete one item from cart at a time", () => {
    const shoppingCart = new ShoppingCart();
    //adding item
    shoppingCart.addItem(110);

    // testing added item
    expect(shoppingCart.cart.size).toEqual(1);
    expect(shoppingCart.cart.get(110).count).toEqual(1);

    //removing item
    shoppingCart.removeItem(110);

    expect(shoppingCart.cart.size).toEqual(0);
  });

  test("should delete one item in cart from multiple items at a time", () => {
    const shoppingCart = new ShoppingCart();

    shoppingCart.addItem(110);
    shoppingCart.addItem(110);

    expect(shoppingCart.cart.size).toEqual(1);
    expect(shoppingCart.cart.get(110).count).toEqual(2);
    expect(shoppingCart.removeItem(110)).toEqual("Apple is removed.");
    expect(shoppingCart.cart.size).toEqual(1);
  });

  test("should delete all the items in cart", () => {
    const shoppingCart = new ShoppingCart();
    shoppingCart.addItem(110);
    shoppingCart.addItem(110);

    expect(shoppingCart.cart.size).toEqual(1);
    expect(shoppingCart.cart.get(110).count).toEqual(2);
    expect(shoppingCart.removeItem(110)).toEqual("Apple is removed.");
    expect(shoppingCart.removeItem(110)).toEqual("Apple is removed.");
    expect(shoppingCart.cart.size).toEqual(0);
  });

  test("should return error message when delete is performed on empty carrt", () => {
    const shoppingCart = new ShoppingCart();
    expect(shoppingCart.removeItem()).toEqual(
      "Cart is empty. Cannot perform delete action."
    );
  });
});

describe("Calculating bill", () => {
  test("should return complete bill text with detail", () => {
    const billText = `2 X Apple @500 = 1000 \n1 X Mango @350 = 350 \n1 X Orange @440 = 440 \n1 X Banana @280 = 280 \nTotal = 2070`;

    const shoppingCart = new ShoppingCart();
    shoppingCart.addItem(110);
    shoppingCart.addItem(110);
    shoppingCart.addItem(111);
    shoppingCart.addItem(112);
    shoppingCart.addItem(113);

    expect(shoppingCart.generateBill()).toEqual(billText);
  });
});
