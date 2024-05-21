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
      <h1>Inquiry</h1>
      <p>
        {currentUser.rest.role === "listing" ? "authorized" : "unauthorized"}
      </p>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InquiryList;
