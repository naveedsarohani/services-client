import { configureStore } from '@reduxjs/toolkit';
import   servicesReducer from '../features/servicesSlice';

 const store = configureStore({
  reducer: {
    services:  servicesReducer,
  },
});
export default store;
