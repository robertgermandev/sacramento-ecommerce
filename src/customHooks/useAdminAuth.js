import { useEffect } from "react";
import { useSelector } from "react-redux";
import { checkUserRole } from "../Utils";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../redux/User/selectors";

const useAdminAuth = (props) => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkUserRole(currentUser)) {
      navigate("/login");
    }
  }, [currentUser]);

  return currentUser;
};

export default useAdminAuth;
