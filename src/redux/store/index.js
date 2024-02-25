import { configureStore, combineReducers } from "@reduxjs/toolkit";
import meReducer from "../reducers/meReducer";
import authReducer from "../reducers/authReducer";
import reservationsReducer from "../reducers/ReservationsReducer";
import { handleReservationsReducer } from "../reducers/handleReservationsReducer.js";
import customerReducer from "../reducers/customerReducer.js";

const bigReducer = combineReducers({
  me: meReducer,
  auth: authReducer,
  reservations: reservationsReducer,
  //singleReservation: handleReservationsReducer,
  customers: customerReducer,
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;
