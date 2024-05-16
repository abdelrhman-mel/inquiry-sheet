import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
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
            <li className="hidden sm:inline text-slate-700 hover:text-slate-400 transition-colors duration-300 font-semibold">
              Home
            </li>
          </Link>
          <Link to="/inquiry">
            {currentUser ? (
              <img
                className="h-9 w-9 rounded-full object-cover"
                src={currentUser.rest.avatar}
                alt="Iquiry"
              ></img>
            ) : (
              <li className="text-slate-700 hover:text-slate-400 transition-colors duration-300">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
