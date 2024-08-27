import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkUserRole } from "../../Utils";
import { selectCurrentUser } from "../../redux/User/selectors";

const AdminToolbar = (props) => {
  const currentUser = useSelector(selectCurrentUser);

  const isAdmin = checkUserRole(currentUser);

  if (!isAdmin) return null;

  return (
    <div className="adminToolbar">
      <ul>
        <li>
          <Link to="/admin">My admin</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminToolbar;
