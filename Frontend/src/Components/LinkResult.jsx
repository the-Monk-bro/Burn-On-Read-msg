import React, { useState } from "react";

const LinkResult = ({ secretLink }) => {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(secretLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto border my-8 border-blue-200 bg-blue-50 rounded-xl p-6 flex flex-col gap-4 animate-all duration-700 ease-out transform motion-safe:animate-[bounce_0.5s_ease-in-out_1] shadow-lg">
      <h3 className="font-bold text-lg text-blue-900">✨ Your secret link is ready</h3>

      <p className="text-sm text-slate-600">
        Copy this link and send it to the recipient. It will work once.
      </p>

      <div className="flex gap-2">
        <input
          value={secretLink}
          readOnly
          className="flex-1 border border-blue-200 rounded-lg px-3 py-2 text-sm bg-white text-blue-700 font-mono focus:outline-none"
        />

        <button
          onClick={copyLink}
          className={`${
            copied ? "bg-green-600" : "bg-blue-700"
          } text-white px-6 rounded-lg transition-colors duration-300 font-medium`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default LinkResult;
