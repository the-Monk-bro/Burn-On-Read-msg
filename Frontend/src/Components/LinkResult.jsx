import React from "react";

const LinkResult = () => {
    const secretLink="http://localhost:8000"
    if(!secretLink) return null;
    const copyLink = () => {
      navigator.clipboard.writeText(secretLink);
    }
    
  return (
    <div className="w-full max-w-2xl mx-auto border my-8 border-blue-200 bg-blue-50 rounded-xl p-6 flex flex-col gap-4">
      <h3 className="font-bold text-lg">Your secret link is ready</h3>

      <p className="text-sm text-slate-600">
        Copy this link and send it to the recipient. It will work once.
      </p>
      <div className="flex gap-2">
        <input
          value={secretLink}
          readOnly
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
        />

        <button
          onClick={copyLink}
          className="bg-blue-700 text-white px-4 rounded-lg"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default LinkResult;
