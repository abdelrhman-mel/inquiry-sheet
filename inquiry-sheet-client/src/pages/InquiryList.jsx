//import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const InquiryList = () => {
  //const { currentUser } = useSelector((state) => state.user);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({
    refNum: "",
    listingAgentName: "",
    feedback: "",
  });
  const [error, setError] = useState("");

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cookie: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      console.log(data);
      setLoading(false);
      setError(null);
      setInquiries(data);
    } catch (error) {
      console.log(error);
      setError(error.message || "An error occurred. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleEditClick = (inquiry) => {
    setEditingRow(inquiry._id);
    setFormData({
      refNum: inquiry.refNum,
      listingAgentName: inquiry.listingAgentName,
      feedback: inquiry.feedback,
    });
  };

  const handleCancelClick = () => {
    setEditingRow(null);
    setFormData({
      refNum: "",
      listingAgentName: "",
      feedback: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (id) => {
    try {
      const response = await fetch(`/api/inquiry/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        cookie: {
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Inquiry updated:", data);
      setEditingRow(null);
      fetchInquiries(); // Refresh the inquiries
      //save the specidied inquiry place on the screen
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error updating inquiry:", error);
      setError("Error updating inquiry");
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Inquiries</h2>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Full Name</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Details</th>
            <th className="py-2 px-4 border-b">Comments</th>
            <th className="py-2 px-4 border-b">Reference Number</th>
            <th className="py-2 px-4 border-b">Listing Agent Name</th>
            <th className="py-2 px-4 border-b">Feedback</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr
              key={inquiry._id}
              className="hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              <td className="py-2 px-4 border-b">{inquiry.fullName}</td>
              <td className="py-2 px-4 border-b">{inquiry.phoneNumber}</td>
              <td className="py-2 px-4 border-b">
                {inquiry.city}, {inquiry.project}, {inquiry.type},{" "}
                {inquiry.bedrooms}, {inquiry.vacant ? "Vacant" : ""},{" "}
                {inquiry.budget}, {inquiry.views}
              </td>
              <td className="py-2 px-4 border-b">{inquiry.comments}</td>
              <td className="py-2 px-4 border-b">
                {editingRow === inquiry._id ? (
                  <input
                    type="text"
                    name="refNum"
                    value={formData.refNum}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  inquiry.refNum
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingRow === inquiry._id ? (
                  <input
                    type="text"
                    name="listingAgentName"
                    value={formData.listingAgentName}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  inquiry.listingAgentName
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingRow === inquiry._id ? (
                  <input
                    type="text"
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  inquiry.feedback
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingRow === inquiry._id ? (
                  <>
                    <div className="flex flex-row">
                      <button
                        onClick={() => handleSubmit(inquiry._id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-1 rounded transition duration-300 ease-in-out text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-1 rounded ml-1 transition duration-300 ease-in-out text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => handleEditClick(inquiry)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InquiryList;
