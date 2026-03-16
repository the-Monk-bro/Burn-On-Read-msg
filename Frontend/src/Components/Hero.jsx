import React from "react";

const Hero = () => {
  return (
    <div className="text-center mt-12 mb-8">
      <h1 className="text-4xl font-bold text-slate-900">
        Send a Secret Message
      </h1>
       <h4 className="text-slate-500 text-xl mt-3 max-w-xl mx-auto">
        Your message will be encrypted and 
        <span className="text-blue-600 font-semibold"> permanently deleted </span>
        after being read once.
      </h4>
    </div>
  );
};

export default Hero;
