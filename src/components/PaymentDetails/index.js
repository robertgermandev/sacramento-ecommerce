import React, { useState, useEffect } from "react";
import "./styles.scss";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import { CountryDropdown } from "react-country-region-selector";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { apiInstance } from "../../Utils";
import {
  selectCartTotal,
  selectCartItemsCount,
  selectCartItems,
} from "../../redux/Cart/selectors";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/Cart/actions";
import { useNavigate } from "react-router-dom";
import { saveOrderHistory } from "../../redux/Orders/actions";

const initialAddressState = {
  line1: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const cartTotal = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemsCount);
  const cartItems = useSelector(selectCartItems);
  const elements = useElements();
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [cardOwnerName, setCardOwnerName] = useState("");

  useEffect(() => {
    if (itemCount < 1) {
      navigate("/dashboard");
    }
  }, [itemCount]);

  const handleShippingDetails = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBillingDetails = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement("card");

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !cardOwnerName
    )
      return;

    apiInstance
      .post("/payments/create", {
        amount: cartTotal * 100,
        shipping: {
          name: recipientName,
          address: {
            ...shippingAddress,
          },
        },
      })
      .then(({ data: clientSecret }) => {
        stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
              name: cardOwnerName,
              address: {
                ...billingAddress,
              },
            },
          })
          .then(({ paymentMethod }) => {
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              })
              .then(({ paymentIntent }) => {
                const configOrder = {
                  orderTotal: cartTotal,
                  orderItems: cartItems.map((item) => {
                    const {
                      documentID,
                      productName,
                      productThumbnail,
                      productPrice,
                      quantity,
                    } = item;

                    return {
                      documentID,
                      productName,
                      productThumbnail,
                      productPrice,
                      quantity,
                    };
                  }),
                };
                dispatch(saveOrderHistory(configOrder));
              });
          });
      });
  };

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="paymentDetails">
      <form onSubmit={handleFormSubmit}>
        <div className="group">
          <h2>Shipping address</h2>
          <FormInput
            required
            label="Recipient name"
            type="text"
            value={recipientName}
            name="recipientName"
            handleChange={(e) => setRecipientName(e.target.value)}
          />
          <FormInput
            required
            label="Street"
            type="text"
            value={shippingAddress.line1}
            name="line1"
            handleChange={(e) => handleShippingDetails(e)}
          />
          <FormInput
            required
            label="City"
            type="text"
            value={shippingAddress.city}
            name="city"
            handleChange={(e) => handleShippingDetails(e)}
          />
          <FormInput
            required
            label="County"
            type="text"
            value={shippingAddress.state}
            name="state"
            handleChange={(e) => handleShippingDetails(e)}
          />
          <FormInput
            required
            label="Postal code"
            type="text"
            value={shippingAddress.postal_code}
            name="postal_code"
            handleChange={(e) => handleShippingDetails(e)}
          />
          <div className="formRow checkout-input">
            <CountryDropdown
              required
              onChange={(value) =>
                handleShippingDetails({
                  target: {
                    name: "country",
                    value: value,
                  },
                })
              }
              valueType="short"
              value={shippingAddress.country}
            />
          </div>
        </div>

        <div className="group">
          <h2>Billing address</h2>
          <FormInput
            required
            label="Name of the card owner"
            type="text"
            value={cardOwnerName}
            name="cardOwnerName"
            handleChange={(e) => setCardOwnerName(e.target.value)}
          />
          <FormInput
            required
            label="Street"
            type="text"
            value={billingAddress.line1}
            name="line1"
            handleChange={(e) => handleBillingDetails(e)}
          />
          <FormInput
            required
            label="City"
            type="text"
            value={billingAddress.city}
            name="city"
            handleChange={(e) => handleBillingDetails(e)}
          />
          <FormInput
            required
            label="County"
            type="text"
            value={billingAddress.state}
            name="state"
            handleChange={(e) => handleBillingDetails(e)}
          />
          <FormInput
            required
            label="Postal code"
            type="text"
            value={billingAddress.postal_code}
            name="postal_code"
            handleChange={(e) => handleBillingDetails(e)}
          />
          <div className="formRow checkout-input">
            <CountryDropdown
              required
              valueType="short"
              value={billingAddress.country}
              onChange={(value) =>
                handleBillingDetails({
                  target: {
                    name: "country",
                    value: value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="group">
          <h2>Card details</h2>
          <CardElement options={configCardElement} />
        </div>
        <Button type="submit">Pay now</Button>
      </form>
    </div>
  );
};

export default PaymentDetails;
