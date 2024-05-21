import { useState } from "react";

const Inquiry = () => {
  const [error, setError] = useState(null);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-center">Add an Inquiry</h1>
    </div>
  );
};

export default Inquiry;
