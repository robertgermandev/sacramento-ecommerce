import ordersTypes from "./types";

const initialState = {
  orderHistory: [],
  orderDetails: {},
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ordersTypes.SET_USER_ORDER_HISOTRY:
      return {
        ...state,
        orderHistory: action.payload,
      };
    case ordersTypes.SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
      };
    default:
      return state;
  }
};

export default ordersReducer;
