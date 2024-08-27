import { createSelector } from "reselect";

const selectProduct = (state) => state.productsData;

export const selectProductData = createSelector(
  [selectProduct],
  (productsData) => productsData.product
);

export const selectProductsData = createSelector(
  [selectProduct],
  (productsData) => productsData.products
);
