//import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const InquiryList = () => {
  //const { currentUser } = useSelector((state) => state.user);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingInquiry, setEditingInquiry] = useState(null);
  const [refNum, setRefNum] = useState("");
  const [listingAgentName, setListingAgentName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cookies: {
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

  const handleEditClick = async (inquiry) => {
    setEditingInquiry(inquiry.id);
    setRefNum(inquiry.refNum);
    setListingAgentName(inquiry.listingAgentName);
    setFeedback(inquiry.feedback);
    //make the API call to update the inquiry
    try {
      const response = await fetch(`/api/inquiry/${inquiry.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        cookies: {
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          refNum: inquiry.refNum,
          listingAgentName: inquiry.listingAgentName,
          feedback: inquiry.feedback,
        }),
      });
      const data = await response.json();
      console.log("Inquiry updated:", data);
    } catch (error) {
      console.error("Error updating inquiry:", error);
      setError("Error updating inquiry");
    }
  };

  const handleCancelClick = () => {
    setEditingInquiry(null);
    setRefNum("");
    setListingAgentName("");
    setFeedback("");
  };

  const handleSubmit = async (id) => {
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refNum,
          listingAgentName,
          feedback,
        }),
      });
      const data = await response.json();
      console.log("Inquiry updated:", data);
      setEditingInquiry(null);
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
      {loading && <div className="text-center">Loading...</div>}
      <h2 className="text-2xl font-bold mb-6">Inquiries</h2>
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
            <tr key={inquiry.id}>
              <td className="py-2 px-4 border-b">{inquiry.fullName}</td>
              <td className="py-2 px-4 border-b">{inquiry.phoneNumber}</td>
              <td className="py-2 px-4 border-b">
                {inquiry.city}, {inquiry.project}, {inquiry.type},{" "}
                {inquiry.bedrooms}, {inquiry.vacant ? "Vacant" : ""},{" "}
                {inquiry.budget}, {inquiry.views}
              </td>
              <td className="py-2 px-4 border-b">{inquiry.comments}</td>
              <td className="py-2 px-4 border-b">
                {editingInquiry === inquiry.id ? (
                  <input
                    type="text"
                    value={refNum}
                    onChange={(e) => setRefNum(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  inquiry.refNum
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingInquiry === inquiry.id ? (
                  <input
                    type="text"
                    value={listingAgentName}
                    onChange={(e) => setListingAgentName(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  inquiry.listingAgentName
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingInquiry === inquiry.id ? (
                  <input
                    type="text"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  inquiry.feedback
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingInquiry === inquiry.id ? (
                  <>
                    <button
                      onClick={() => handleSubmit(inquiry.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded ml-2 transition duration-300 ease-in-out"
                    >
                      Cancel
                    </button>
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
