import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import profileReducer from '../features/profile/profileSlice';
import loginReducer from '../features/login/loginSlice';
import signUpReducer from '../features/signUp/signUpSlice';
import productCategoryReducer from '../features/productCategory/productCategorySlice';
import productListReducer from '../features/productList/productListSlice';
import singleProductReducer from '../features/singleProduct/singleProductSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profile: profileReducer,
    login: loginReducer,
    signUp: signUpReducer,
    productCategory: productCategoryReducer,
    productList: productListReducer,
    singleProduct: singleProductReducer,
  },
});
