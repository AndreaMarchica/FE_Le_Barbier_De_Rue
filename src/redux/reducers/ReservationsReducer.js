import { GET_RESERVATIONS } from "../actions";

const initialState = {
  reservations: [],
};

const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESERVATIONS:
      return {
        ...state,
        reservations: action.payload,
      };

    default:
      return state;
  }
};

export default reservationsReducer;
