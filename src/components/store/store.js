import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Cart-slice'
import cartItemReducer from './CatItem-slice'

const store = configureStore({
    reducer: { cart: cartReducer, cartItem: cartItemReducer }
});

export default store;