import React from "react";
import "./styles.scss";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../redux/Cart/selectors";
import Button from "../forms/Button";
import Item from "./Item";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../Utils";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const navigate = useNavigate();

  const handleContinueShoppingNav = () => {
    navigate("/search");
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>

      <div className="cart">
        {cartItems.length > 0 ? (
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <table
                  className="checkoutHeader"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    <tr>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Remove</th>
                    </tr>
                  </tbody>
                </table>
              </tr>

              <tr>
                <table border="0" cellPadding="0" cellSpacing="0">
                  <tbody>
                    {cartItems.map((item, idx) => {
                      return (
                        <tr key={idx}>
                          <td>
                            <Item {...item} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </tr>

              <tr>
                <table
                  align="right"
                  border="0"
                  cellSpacing="0"
                  cellPadding="10"
                >
                  <tr align="right">
                    <td>
                      <h3>Total: €{formatPrice(total)}</h3>
                    </td>
                  </tr>
                  <tr>
                    <table border="0" cellPadding="10" cellSpacing="0">
                      <tbody>
                        <tr>
                          <td>
                            <Button onClick={() => handleContinueShoppingNav()}>
                              Continue shopping
                            </Button>
                          </td>
                          <td>
                            <Button onClick={() => navigate("/payment")}>
                              Checkout
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </tr>
                </table>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>You cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
