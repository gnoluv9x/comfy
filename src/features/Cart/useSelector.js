import { createSelector } from "@reduxjs/toolkit";

const cartItemsSelector = state => state.cart.cartItems;
// count items in cart
export const countCartItems = createSelector(cartItemsSelector, cartItems =>
    cartItems.reduce((count, item) => count + item.quantity, 0)
);
// caculate total price
export const calTotalPrice = createSelector(cartItemsSelector, cartItems =>
    cartItems.reduce((totalPrice, item) => totalPrice + item.quantity * item.product.price, 0)
);
