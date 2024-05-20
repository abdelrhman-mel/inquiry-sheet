import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      if (res.ok) {
        dispatch(signOut());
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 container ">
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-2xl flex flex-wrap">
            <img
              className="h-9 w-9"
              src="../../public/ad-real-estate-logo-only-new-2.png"
            />
          </h1>
        </Link>
        <ul className="flex gap-12 items-center flex-row">
          <Link to="/">
            <li className="sm:inline text-slate-700 hover:text-slate-400 transition-colors duration-300 font-semibold">
              Home
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <li className="sm:inline text-slate-700 hover:text-slate-400 transition-colors duration-300 font-semibold">
                Profile
              </li>
            ) : (
              <li className="sm:inline text-slate-700 hover:text-slate-400 transition-colors duration-300 font-semibold">
                Sign In
              </li>
            )}
          </Link>
          {currentUser && (
            <li
              onClick={handleSignOut}
              className="sm:inline text-slate-700 hover:text-slate-400 transition-colors duration-300 font-semibold cursor-pointer"
            >
              Sign Out
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
