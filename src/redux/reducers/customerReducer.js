import { GET_CUSTOMERS } from "../actions";

const initialState = {
  customers: [],
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      };

    default:
      return state;
  }
};

export default customerReducer;
