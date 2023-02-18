import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import testReducer  from '../features/test/testSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    test: testReducer
  },
});
