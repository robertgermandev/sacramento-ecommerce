import cartTypes from "./types";
import {
  handleAddToCart,
  handleReduceCartQuantity,
  handleRemoveCartItem,
} from "./utils";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: handleAddToCart({
          prevCartItems: state.cartItems,
          nextCartItem: action.payload,
        }),
      };
    case cartTypes.REDUCE_CART_QUANTITY:
      return {
        ...state,
        cartItems: handleReduceCartQuantity({
          prevCartItems: state.cartItems,
          cartItemToReduce: action.payload,
        }),
      };
    case cartTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: handleRemoveCartItem({
          prevCartItems: state.cartItems,
          cartItemToRemove: action.payload,
        }),
      };
    case cartTypes.CLEAR_CART:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default cartReducer;
