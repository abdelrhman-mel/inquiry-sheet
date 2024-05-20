import { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    //TODO update user profile
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-6">
        Profile Information
      </h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          className="border p-3 rounded-lg ease-in-out transition-all duration-300 hover:shadow-md my-2"
          id="username"
          onChange={handleChange}
          value={formData.username || currentUser.rest.fullName}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-3 rounded-lg ease-in-out transition-all duration-300 hover:shadow-md my-2"
          id="email"
          value={formData.email || currentUser.rest.email}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="border p-3 rounded-lg ease-in-out transition-all duration-300 hover:shadow-md my-2"
          id="phoneNumber"
          onChange={handleChange}
          value={formData.phoneNumber || currentUser.rest.phoneNumber}
        />
        <input
          type="password"
          placeholder="New Password"
          onChange={handleChange}
          className="border p-3 rounded-lg ease-in-out transition-all duration-300 hover:shadow-md my-2"
          id="password"
        />
        <button className=" bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
