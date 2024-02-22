import { POST_RESERVATION, DELETE_RESERVATION } from "../actions";

const initialState = {
  singleReservation: [],
};

const handleReservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_RESERVATION:
      return {
        ...state,
        singleReservation: action.payload,
      };
    case DELETE_RESERVATION:
      return {
        ...state,
        reservations: state.reservations.filter(
          (reservation) => reservation.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default handleReservationsReducer;
