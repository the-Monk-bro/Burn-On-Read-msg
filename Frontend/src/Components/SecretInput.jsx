import React, { useState } from "react";

const SecretInput = ({ setGeneratedLink }) => {
  const [message, setMessage] = useState("");

  const handleGenerate = async () => {
    if (!message.trim()) return alert("Please enter a message!");

    try{
      const res = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({msg: message})
      });

      const result = await res.json();

      //const uniqueId = Math.random().toString(36).substring(2, 9);
      //const newUrl = `${window.location.origin}/secret/${uniqueId}`;

      setGeneratedLink(result.link);

    } catch (error){
      console.error("Error fetching secret:", error)
    }

  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col gap-4">
      <span className="font-semibold text-xl text-slate-700">Secret Content</span>

      <textarea
        className="border border-slate-200 rounded-lg p-4 min-h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Paste secret message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      
      <div className="flex justify-between text-sm text-slate-500">
        <span>Burn after reading</span>
        <span>Expires in 1 hour</span>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full bg-blue-600 text-white font-semibold h-12 rounded-lg hover:bg-blue-700 transition-all active:scale-95"
      >
        Generate Secret Link
      </button>
    </div>
  );
};

export default SecretInput;
