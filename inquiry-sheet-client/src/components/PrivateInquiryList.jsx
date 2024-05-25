import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateInquiryList = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser.rest.role === "listing" ? (
    <Outlet />
  ) : (
    (alert("You are not authorized to view this page."),
    (<Navigate to={"/"} />))
  );
};

export default PrivateInquiryList;
