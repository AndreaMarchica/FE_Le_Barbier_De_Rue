import { POST_RESERVATION } from "../actions";

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

    default:
      return state;
  }
};

export default handleReservationsReducer;
