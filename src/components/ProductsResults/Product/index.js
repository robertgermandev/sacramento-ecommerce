import React from "react";
import Button from "../../forms/Button/index";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/Cart/actions";

const Product = (product) => {
  const dispatch = useDispatch();
  const { documentID, productThumbnail, productName, productPrice } = product;
  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;

  const configAddToCartButton = {
    type: "button",
  };

  const handleAddToCart = (product) => {
    if (!product) return;

    dispatch(addProduct(product));
  };

  return (
    <div className="product">
      <div className="thumb">
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>
      <div className="details">
        <ul>
          <li>
            <Link to={`/product/${documentID}`}>
              <span className="name">{productName}</span>
            </Link>
          </li>
          <li>
            <span className="price">€{productPrice}</span>
          </li>
          <li>
            <div className="addToCartBtn">
              <Button
                {...configAddToCartButton}
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
