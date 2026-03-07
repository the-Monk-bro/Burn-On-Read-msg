import React, { useState } from "react";
import { CiLock } from "react-icons/ci";
import { FaLock } from "react-icons/fa";

const SecretInput = () => {
  const [message, setMessage] = useState("");
  const handleCHange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto  bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col gap-4">
      <span className="font-semibold text-xl text-slate-700">
        Secret Content
      </span>

      <textarea
        className="border border-slate-200 rounded-lg p-4 min-h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Paste secret meassage here..."
        value={message}
        onChange={handleCHange}
      />
      <div className="flex justify-between text-sm text-slate-500">
        <span>Burn after reading</span>

        <span>Expires in 1 hour</span>
      </div>
      <button
        
        className="w-full bg-blue-600 text-white font-semibold h-12 rounded-lg hover:bg-blue-700"
      >
        Generate Secret Link
      </button>

    </div>
  );
};

export default SecretInput;
