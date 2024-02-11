import { GET_ME } from "../actions";

const initialState = {
  userData: [],
};

const meReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ME:
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};

export default meReducer;
