import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const UserCheck = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Navigate to={"/"} /> : <Outlet />;
};

export default UserCheck;
