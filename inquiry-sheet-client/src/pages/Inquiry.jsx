import { useState } from "react";

const Inquiry = () => {
  const [error, setError] = useState(null);
  return (
    <div>
      <h1>Inquiry</h1>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default Inquiry;
