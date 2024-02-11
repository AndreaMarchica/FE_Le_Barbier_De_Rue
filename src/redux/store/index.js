import { configureStore, combineReducers } from "@reduxjs/toolkit";
import meReducer from "../reducers/me";

const bigReducer = combineReducers({
  me: meReducer,
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;
