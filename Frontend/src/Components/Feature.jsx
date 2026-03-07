import React from "react";

const Feature = () => {
  return (
    <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-6">
      <div>
        <h4 className="font-semibold text-slate-800">End-to-End Encrypted</h4>
        <p className="text-sm text-slate-500">We cannot read your messages.</p>
      </div>

      <div>
        <h4 className="font-semibold text-slate-800">Zero-Trace Delete</h4>
        <p className="text-sm text-slate-500">
          Messages are permanently deleted after viewing.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-slate-800">Auto Expiration</h4>
        <p className="text-sm text-slate-500">
          Links expire automatically if unused.
        </p>
      </div>
    </div>
  );
};

export default Feature;
