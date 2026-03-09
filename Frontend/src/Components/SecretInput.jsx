import React, { useState } from "react";

const SecretInput = ({ setGeneratedLink }) => {

  const [message, setMessage] = useState("");
  
  
  function toBase64URL(uint8) {
  let base64 = btoa(String.fromCharCode(...uint8))

  return base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
  }

  const handleGenerate = async () => {
    if (!message.trim()) return alert("Please enter a message!");

    //Encrypting the message
    const key = crypto.getRandomValues(new Uint8Array(32));
    const iv =crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(message);

    const cryptoKey = await crypto.subtle.importKey(
      "raw", key , "AES-GCM", false, ["encrypt"]
    )
    const ciphertext  = await crypto.subtle.encrypt(
      {name:"AES-GCM", iv:iv}, cryptoKey, encoded
    )

    const ciphertextArray = Array.from(new Uint8Array(ciphertext));
    const ivArray = Array.from(iv);
    //......................................

    try{
      const res = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ciphertext: ciphertextArray, iv: ivArray})
      });

      const result = await res.json();

      setGeneratedLink(`${result.link}#${toBase64URL(key)}`);

    } catch (error){
      console.error("Error creating secret:", error);
      alert("Cannot connect to the server. Server maybe down.");
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
        <span>Expires in 24 hours</span>
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
