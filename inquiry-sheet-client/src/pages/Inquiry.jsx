import { useSelector } from "react-redux";
const Inquiry = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <h1>Inquiry</h1>
      <p>{currentUser ? currentUser.rest.email : "No user logged in"}</p>
    </div>
  );
};

export default Inquiry;
