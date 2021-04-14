import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import profileReducer from '../features/profile/profileSlice';
import loginReducer from '../features/login/loginSlice';
import signUpReducer from '../features/signUp/signUpSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profile: profileReducer,
    login: loginReducer,
    signUp: signUpReducer,
  },
});
