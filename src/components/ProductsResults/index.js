import React, { useEffect } from "react";
import "./styles.scss";
import { fetchProductsStart } from "../../redux/Products/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import Product from "./Product";

const selectProducts = (state) => state.productsData;

const selectProductsData = createSelector(
  [selectProducts],
  (productsData) => productsData.products
);

const ProductsResults = ({}) => {
  const products = useSelector(selectProductsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  if (!Array.isArray(products?.data)) return null;

  if (products?.data.length < 1) {
    return (
      <div className="products">
        <p>No search results.</p>
      </div>
    );
  }

  return (
    <div className="products">
      <h1>Browse products</h1>
      <div className="productsResults">
        {products?.data.map((product, idx) => {
          const { productThumbnail, productName, productPrice } = product;

          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;

          const configProduct = {
            productThumbnail,
            productName,
            productPrice,
          };

          return <Product {...configProduct} />;
        })}
      </div>
    </div>
  );
};

export default ProductsResults;
