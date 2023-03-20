import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
    showCart: false,
    notification: null
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        showCartHandler(state) {
            state.showCart = !state.showCart;
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            };
        },
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;