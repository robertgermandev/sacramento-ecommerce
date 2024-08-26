import React from "react";
import Button from "../../forms/Button/index";

const Product = ({ productThumbnail, productName, productPrice }) => {
  if (!productThumbnail || !productName || typeof productPrice === "undefined")
    return null;

  const configAddToCartButton = {
    type: "button",
  };

  return (
    <div className="product">
      <div className="thumb">
        <img src={productThumbnail} alt={productName} />
      </div>
      <div className="details">
        <ul>
          <li>
            <span className="name">{productName}</span>
          </li>
          <li>
            <span className="price">€{productPrice}</span>
          </li>
          <li>
            <div className="addToCartBtn">
              <Button {...configAddToCartButton}>Add to cart</Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
