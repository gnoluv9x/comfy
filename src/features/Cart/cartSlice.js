import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [], // {id , product , quantity }
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const index = state.cartItems.findIndex(item => item.id === newItem.id);
            if (index >= 0) {
                state.cartItems[index].quantity += newItem.quantity;
            } else {
                state.cartItems.push(newItem);
            }
        },
        setQuantity(state, action) {
            // action.payload : { id , quantity}
            // check if product has in cart
            const { id, quantity } = action.payload;
            const index = state.cartItems.findIndex(product => product.id === id);
            console.log(index);
            if (index >= 0) {
                state.cartItems[index].quantity += quantity;
            }
        },
        increaseQuantity(state, action) {
            const idNeedToIncreaseQuantity = action.payload;

            const index = state.cartItems.findIndex(
                product => product.id === idNeedToIncreaseQuantity
            );
            if (index >= 0) {
                state.cartItems[index].quantity += 1;
            }
        },
        decreaseQuantity(state, action) {
            const idNeedToIncreaseQuantity = action.payload;

            const index = state.cartItems.findIndex(
                product => product.id === idNeedToIncreaseQuantity
            );
            if (index >= 0) {
                state.cartItems[index].quantity -= 1;
            }
        },
        removeFromCart(state, action) {
            const idNeedToRemove = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== idNeedToRemove);
        },
    },
});

const { actions, reducer } = cartSlice;
export const { addToCart, removeFromCart, setQuantity, decreaseQuantity, increaseQuantity } =
    actions;
export default reducer;
