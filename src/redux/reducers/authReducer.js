import { LOGIN } from "../actions";
import { LOGOUT } from "../actions";

const initialState = {
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  console.log("Action type:", action.type);
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
