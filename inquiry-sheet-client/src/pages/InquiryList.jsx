import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const InquiryList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    fetchInquiries();
  }, []);
  return (
    <div>
      <h1 className=" text-center">Inquiry</h1>
      {loading && <p>Loading...</p>}
      {inquiries.map((inquiry) => (
        <div key={inquiry.id} className="border p-3 my-3 rounded-lg">
          <h3>{inquiry.title}</h3>
          <p>{inquiry.content}</p>
        </div>
      ))}
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default InquiryList;
