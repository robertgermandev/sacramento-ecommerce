import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { checkUserRole } from "../Utils";
import { useNavigate } from "react-router-dom";

const selectUser = (state) => state.user;

const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

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
