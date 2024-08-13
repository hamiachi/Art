import { configureStore } from '@reduxjs/toolkit';
import toolReducer from './toolSlice';

const store = configureStore({
  reducer: {
    tool: toolReducer,
  },
});

export default store;