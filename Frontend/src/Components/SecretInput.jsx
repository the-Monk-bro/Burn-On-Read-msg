import React, { useState } from "react";

const SecretInput = ({ setGeneratedLink }) => {

  const [message, setMessage] = useState("");
  const [secretType, setSecretType] = useState("text");
  const [selectedFile, setSelectedFile] = useState(null);
  
  
  function toBase64URL(uint8) {
  let base64 = btoa(String.fromCharCode(...uint8))

  return base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
  }

  const handleGenerate = async () => {
    if (secretType === "text" && !message.trim()) {
      return alert("Please enter a message!");
    }
    if (secretType === "file" && !selectedFile) {
      return alert("Please choose a file!");
    }

    const key = crypto.getRandomValues(new Uint8Array(32));
    const iv = crypto.getRandomValues(new Uint8Array(12));

    let encoded;
    if (secretType === "text") {
      encoded = new TextEncoder().encode(message);
    } else {
      const fileBuffer = await selectedFile.arrayBuffer();
      encoded = new Uint8Array(fileBuffer);
    }

    const cryptoKey = await crypto.subtle.importKey(
      "raw", key , "AES-GCM", false, ["encrypt"]
    )
    const ciphertext  = await crypto.subtle.encrypt(
      {name:"AES-GCM", iv:iv}, cryptoKey, encoded
    )

    const ciphertextArray = Array.from(new Uint8Array(ciphertext));
    const ivArray = Array.from(iv);
    try{
      const res = await fetch(`${import.meta.env.VITE_API_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ciphertext: ciphertextArray,
          iv: ivArray,
          secretType,
          fileName: secretType === "file" ? selectedFile.name : null,
          mimeType: secretType === "file" ? selectedFile.type || "application/octet-stream" : null,
          fileSize: secretType === "file" ? selectedFile.size : null
        })
      });

      const result = await res.json();
      if (!res.ok || result.err) {
        throw new Error(result?.desc || "Failed to generate secret link.");
      }

      setGeneratedLink(`${result.link}#${toBase64URL(key)}`);
      setMessage("");
      setSelectedFile(null);

    } catch (error){
      console.error("Error creating secret:", error);
      alert(error.message || "Cannot connect to the server. Server maybe down.");
    }

  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col gap-4">
      <span className="font-semibold text-xl text-slate-700">Secret Content</span>

      <div className="flex gap-2 bg-slate-100 rounded-lg p-1">
        <button
          onClick={() => setSecretType("text")}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${secretType === "text" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"}`}
        >
          Text
        </button>
        <button
          onClick={() => setSecretType("file")}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${secretType === "file" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"}`}
        >
          File
        </button>
      </div>

      {secretType === "text" ? (
        <textarea
          className="border border-slate-200 rounded-lg p-4 min-h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste secret message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      ) : (
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 file:font-medium hover:file:bg-blue-100"
          />
          {selectedFile && (
            <p className="text-sm text-slate-600 mt-3">
              Selected: <span className="font-medium">{selectedFile.name}</span> ({Math.ceil(selectedFile.size / 1024)} KB)
            </p>
          )}
        </div>
      )}
      
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
