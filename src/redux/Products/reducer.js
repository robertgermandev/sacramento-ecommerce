import productsTypes from "./types";
import productTypes from "./types";

const initialState = {
  products: [],
  product: {},
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case productTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case productsTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
