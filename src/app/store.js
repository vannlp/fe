import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';
import testReducer  from '../features/test/testSlice';
import interfaceSlice from '../features/interface/interfaceSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    test: testReducer,
    auth: authSlice,
    interface: interfaceSlice
  },
});
