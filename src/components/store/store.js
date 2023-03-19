import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Cart-slice'

const store = configureStore({
    reducer: { cart: cartReducer }
});

export default store;