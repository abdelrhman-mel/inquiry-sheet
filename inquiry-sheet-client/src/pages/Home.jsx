import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Welcome to Inquiry Sheet
      </h1>
      <div className="flex flex-col gap-4 items-center">
        <Link to="/inquiry">
          <button className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-3 ease-in-out transition-all duration-300 hover:shadow-md">
            Inquire Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
