import { configureStore, combineReducers } from "@reduxjs/toolkit";
import meReducer from "../reducers/meReducer";
import authReducer from "../reducers/authReducer";
import reservationsReducer from "../reducers/ReservationsReducer";

const bigReducer = combineReducers({
  me: meReducer,
  auth: authReducer,
  reservations: reservationsReducer,
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;
