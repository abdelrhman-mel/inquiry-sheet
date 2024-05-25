import { useState } from "react";
import cityData from "../data/CityData";
import { useSelector } from "react-redux";

const Inquiry = () => {
  //get the currentuser
  const { currentUser } = useSelector((state) => state.user);
  //loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  //form state
  const [selectedCity, setSelectedCity] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [bedrooms, setBedrooms] = useState([]);
  const [selectedBedroom, setSelectedBedroom] = useState("");
  const [floors, setFloors] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [vacant, setVacant] = useState(false);
  const [budget, setBudget] = useState("");
  const [views, setViews] = useState("");
  const [comments, setComments] = useState("");

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
    const city = cityData.find((city) => city.city === selectedCity);
    setProjects(city ? city.projects : []);
    setSelectedProject("");
    setTypes([]);
    setSelectedType("");
    setBedrooms([]);
    setSelectedBedroom("");
    setFloors([]);
    setSelectedFloor("");
  };

  const handleProjectChange = (event) => {
    const selectedProject = event.target.value;
    setSelectedProject(selectedProject);
    const project = projects.find(
      (project) => project.project === selectedProject
    );
    setTypes(project ? project.types : []);
    setSelectedType("");
    setBedrooms([]);
    setSelectedBedroom("");
    setFloors([]);
    setSelectedFloor("");
  };

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedType(selectedType);
    const type = types.find((type) => type.type === selectedType);
    setBedrooms(type ? type.bedrooms : []);
    setFloors(type ? type.floors : []);
    setSelectedBedroom("");
    setSelectedFloor("");
  };

  const handleBedroomChange = (event) => {
    setSelectedBedroom(event.target.value);
  };

  const handleFloorChange = (event) => {
    setSelectedFloor(event.target.value);
  };

  const handleVacantChange = (event) => {
    setVacant(event.target.checked);
  };

  const handleBudgetChange = (event) => {
    let value = event.target.value;
    // Remove leading zeros
    value = value.replace(/^0+/, "");
    // Allow only numbers
    value = value.replace(/\D/g, "");
    value = value === "" ? "" : parseInt(value);
    setBudget(value);
  };

  const handleViewsChange = (event) => {
    setViews(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      fullName: currentUser.rest.fullName,
      phoneNumber: currentUser.rest.phoneNumber,
      city: selectedCity,
      project: selectedProject,
      type: selectedType,
      bedrooms: selectedBedroom,
      floor: selectedFloor,
      vacant: vacant,
      budget: budget,
      views: views,
      comments: comments,
    };
    console.log("Form Data Submitted:", formData);
    // Add your form submission logic here, such as an API call
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cookies: {
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      //if success
      setSuccess(true);
      // Reload the page to clear the form
      alert("Your inquiry has been submitted successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError(error.message || "An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
      <h1 className="text-3xl text-center font-semibold mb-7">Inquiry</h1>
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            City:
          </label>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            required
            className="block w-full bg-white border border-gray-300 rounded py-2 px-3 shadow leading-tight focus:outline-none focus:ring transition duration-300 ease-in-out"
          >
            <option value="">Select a city</option>
            {cityData.map((city, index) => (
              <option key={index} value={city.city}>
                {city.city}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Project:
          </label>
          <select
            value={selectedProject}
            onChange={handleProjectChange}
            disabled={!selectedCity}
            className="block w-full bg-white border border-gray-300 rounded py-2 px-3 shadow leading-tight focus:outline-none focus:ring transition duration-300 ease-in-out"
          >
            <option value="">Select a project</option>
            {projects.map((project, index) => (
              <option key={index} value={project.project}>
                {project.project}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Type:
          </label>
          <select
            value={selectedType}
            onChange={handleTypeChange}
            disabled={!selectedProject}
            className="block w-full bg-white border border-gray-300 rounded py-2 px-3 shadow leading-tight focus:outline-none focus:ring transition duration-300 ease-in-out"
          >
            <option value="">Select a type</option>
            {types.map((type, index) => (
              <option key={index} value={type.type}>
                {type.type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Bedrooms:
          </label>
          <select
            value={selectedBedroom}
            onChange={handleBedroomChange}
            required
            className="block w-full bg-white border border-gray-300 rounded py-2 px-3 shadow leading-tight focus:outline-none focus:ring transition duration-300 ease-in-out"
          >
            <option value="">Select number of bedrooms</option>
            {selectedType
              ? bedrooms.map((bedroom, index) => (
                  <option key={index} value={bedroom}>
                    {bedroom}
                  </option>
                ))
              : [...Array(6).keys()].map((i) => (
                  <option key={i} value={`${i + 1} BR`}>{`${i + 1} BR`}</option>
                ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Floor:
          </label>
          <select
            value={selectedFloor}
            onChange={handleFloorChange}
            disabled={!selectedType}
            className="block w-full bg-white border border-gray-300 rounded py-2 px-3 shadow leading-tight focus:outline-none focus:ring transition duration-300 ease-in-out"
          >
            <option value="">Select a floor</option>
            {floors.map((floor, index) => (
              <option key={index} value={floor}>
                {floor}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 text-sm font-bold mr-2">
            Vacant:
          </label>
          <input
            type="checkbox"
            checked={vacant}
            onChange={handleVacantChange}
            className="form-checkbox h-5 w-5 text-indigo-600 transition duration-300 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Budget (AED):
          </label>
          <input
            type="text"
            value={budget}
            onChange={handleBudgetChange}
            required
            className="block w-full bg-white border border-gray-300 rounded py-2 px-3 shadow leading-tight focus:outline-none focus:ring transition duration-300 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Views:
          </label>
          <input
            type="text"
            value={views}
            onChange={handleViewsChange}
            className="block w-full bg-white border border-gray-300 rounded py-2 px-3 shadow leading-tight focus:outline-none focus:ring transition duration-300 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Comments:
          </label>
          <textarea
            value={comments}
            onChange={handleCommentsChange}
            rows="4"
            className="block w-full bg-white border border-gray-300 rounded py-2 px-3 shadow leading-tight focus:outline-none focus:ring transition duration-300 ease-in-out"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
        {error && <p className="text-center text-red-500">{error}</p>}
        {success && (
          <p className="text-center text-green-500">
            Your inquiry has been submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default Inquiry;
