import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "../../redux/Orders/actions";
import { selectCurrentUser } from "../../redux/User/selectors";
import { selectOrdersData } from "../../redux/Orders/selectors";
import "./styles.scss";
import OrderHistory from "../../components/OrderHistory";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const orderHistory = useSelector(selectOrdersData);
  
  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, []);

  return (
    <div>
      <h1>Order history</h1>
      <OrderHistory orders={orderHistory} />
    </div>
  );
};

export default Dashboard;
