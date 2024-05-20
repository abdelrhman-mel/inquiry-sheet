import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center">
        Profile Information
      </h1>
      <form className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg my-2"
          id="username"
          value={currentUser.rest.fullName}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg my-2"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg my-2"
          id="password"
        />
        <button className=" bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
