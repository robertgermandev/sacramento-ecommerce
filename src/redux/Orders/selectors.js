import { createSelector } from "reselect";

const selectOrders = (state) => state.ordersData;

export const selectOrdersData = createSelector(
  [selectOrders],
  (ordersData) => ordersData.orderHistory.data
);

export const selectOrderDetails = createSelector(
  [selectOrders],
  (ordersData) => ordersData.orderDetails
);
