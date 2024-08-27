import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetailsStart } from "../../redux/Orders/actions";
import { selectOrderDetails } from "../../redux/Orders/selectors";
import OrderDetails from "../../components/OrderDetails";

const Order = () => {
  const dispatch = useDispatch();
  const { orderID } = useParams();
  const orderDetails = useSelector(selectOrderDetails);
  const { orderTotal } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetailsStart(orderID));
  }, []);

  return (
    <div>
      <h1>Order ID: #{orderID}</h1>
      <OrderDetails order={orderDetails} />
      <h3>Total: €{orderTotal}</h3>
    </div>
  );
};

export default Order;
