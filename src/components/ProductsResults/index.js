import React, { useEffect } from "react";
import "./styles.scss";
import { fetchProductsStart } from "../../redux/Products/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import Product from "./Product";
import FormSelect from "./../forms/FormSelect";
import { useNavigate, useParams } from "react-router-dom";
import LoadMore from "../LoadMore";

const selectProducts = (state) => state.productsData;

const selectProductsData = createSelector(
  [selectProducts],
  (productsData) => productsData.products
);

const ProductsResults = ({}) => {
  const products = useSelector(selectProductsData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filterType } = useParams();

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    navigate(`/search/${nextFilter}`);
  };

  if (!Array.isArray(products?.data)) return null;

  if (products?.data.length < 1) {
    return (
      <div className="products">
        <p>No search results.</p>
      </div>
    );
  }

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Sailing boats",
        value: "sailing-boats",
      },
      {
        name: "Yachts",
        value: "yachts",
      },
    ],
    handleChange: handleFilter,
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMoreBtn = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="products">
      <h1>Browse products</h1>
      <FormSelect {...configFilters} />
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
            ...product,
          };

          return <Product {...configProduct} />;
        })}
      </div>
      {!isLastPage && <LoadMore {...configLoadMoreBtn} />}
    </div>
  );
};

export default ProductsResults;
