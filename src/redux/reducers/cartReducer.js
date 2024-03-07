import { GET_CART_PRODUCTS } from "../actions";
import { ADD_TO_CART } from "../actions";

const initialState = {
  cartProducts: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload],
      };

    case GET_CART_PRODUCTS:
      return {
        ...state,
        cartProducts: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
