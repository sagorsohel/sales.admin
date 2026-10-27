import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import ordersReducer from "./slices/ordersSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    ui: uiReducer,
  },
});

export default store;
