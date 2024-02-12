import { configureStore, combineReducers } from "@reduxjs/toolkit";
import meReducer from "../reducers/meReducer";
import authReducer from "../reducers/authReducer";

const bigReducer = combineReducers({
  me: meReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;
