import { createSlice } from "@reduxjs/toolkit";

const cartItemState = { items: [], totalQuantity: 0, changed: false };

const cartItemSlice = createSlice({
    name: "cart",
    initialState: cartItemState,
    reducers: {
        getdata(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addToCart(state, action) {
            const addItem = action.payload;
            const existingItem = state.items.find((item) => item.id === addItem.id);
            state.totalQuantity++;
            state.changed = true;
            if (!existingItem) {
                state.items.push({
                    id: addItem.id,
                    title: addItem.title,
                    price: addItem.price,
                    quantity: 1,
                    totalPrice: addItem.price,
                })
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + addItem.price;
            }

        },
        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.totalQuantity--;
            state.changed = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);

            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }


        }
    }
})
export const cartItemActions = cartItemSlice.actions;
export default cartItemSlice.reducer;