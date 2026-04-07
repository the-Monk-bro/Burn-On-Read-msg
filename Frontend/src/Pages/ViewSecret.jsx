import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewSecret = () => {
  
  const { id } = useParams(); 
  const [secret, setSecret] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [decryptedType, setDecryptedType] = useState("text");
  const [fileMeta, setFileMeta] = useState({ fileName: "", mimeType: "", fileSize: 0 });
  const [downloadUrl, setDownloadUrl] = useState("");
  
  const [isError, setIsError] = useState(false);
  const [errMsg,setErrMsg] = useState("");
  const [errDesc, setErrDesc] = useState("");

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  function fromBase64URL(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/")
  while (str.length % 4) {
    str += "="
  }
  const binary = atob(str)
  return Uint8Array.from(binary, c => c.charCodeAt(0))
  }

  const handleReveal = async () => {
    setIsLoading(true);
    
    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/secret/${id}`);
      const result = await res.json();

      if (result.err){
        setIsError(true);
        setErrMsg(result.msg);
        setErrDesc(result.desc);
        setIsLoading(false);
        return;
      }

      
      else{
        const key = window.location.hash.substring(1);
        if (!key) {
          throw new Error("Missing decryption key in URL.");
        }

        const cryptoKey = await crypto.subtle.importKey(
          "raw", fromBase64URL(key) , "AES-GCM", false, ["decrypt"]
        );

        const ciphertext = new Uint8Array(result.ciphertext);
        const iv = new Uint8Array(result.iv);
        const deciphertext = await crypto.subtle.decrypt(
          {name:"AES-GCM", iv}, cryptoKey, ciphertext
        );

        const decryptedBytes = new Uint8Array(deciphertext);
        const incomingType = result.secretType || "text";

        setTimeout(() => {
          setDecryptedType(incomingType);
          if (incomingType === "file") {
            const mimeType = result.mimeType || "application/octet-stream";
            const blob = new Blob([decryptedBytes], { type: mimeType });
            const objectUrl = URL.createObjectURL(blob);
            setDownloadUrl(objectUrl);
            setFileMeta({
              fileName: result.fileName || "secret-file",
              mimeType,
              fileSize: result.fileSize || decryptedBytes.length
            });
            setSecret(null);
          } else {
            const decoded = new TextDecoder().decode(deciphertext);
            setSecret(decoded);
          }
          setIsRevealed(true);
          setIsLoading(false);
        }, 800);
      }

    } catch (error) {
      console.error("Error fetching secret:", error);
      setIsError(true);
      setErrMsg("Unable to decrypt secret");
      setErrDesc("The link may be incomplete, invalid, or already used.");
      setIsLoading(false);
      setIsRevealed(false);
    }
  };

  
  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800">{errMsg}</h2>
          <p className="text-slate-600">{errDesc}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
        
        {!isRevealed ? (
          <div className="space-y-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-800">You have a secret message</h2>
            <p className="text-slate-500 max-w-sm mx-auto">
              Warning: You can only view this message once. It will be permanently destroyed immediately after reading.
            </p>
            <button
              onClick={handleReveal}
              disabled={isLoading}
              className="mt-6 w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:bg-blue-400"
            >
              {isLoading ? 'Decrypting...' : 'Click to Reveal Secret'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Secret Message</h2>
            
            <div className={`transition-all duration-1000 ease-out transform ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="p-6 bg-slate-100 rounded-lg text-left border border-slate-200 shadow-inner">
                {decryptedType === "file" ? (
                  <div className="space-y-4">
                    <p className="text-slate-700 text-sm">
                      File: <span className="font-semibold">{fileMeta.fileName}</span> ({Math.ceil((fileMeta.fileSize || 0) / 1024)} KB)
                    </p>

                    {fileMeta.mimeType?.startsWith("image/") && downloadUrl && (
                      <img src={downloadUrl} alt={fileMeta.fileName} className="max-h-96 mx-auto rounded-md border border-slate-200" />
                    )}

                    {fileMeta.mimeType?.startsWith("video/") && downloadUrl && (
                      <video src={downloadUrl} controls className="max-h-96 w-full rounded-md border border-slate-200" />
                    )}

                    {fileMeta.mimeType?.startsWith("audio/") && downloadUrl && (
                      <audio src={downloadUrl} controls className="w-full" />
                    )}

                    <a
                      href={downloadUrl}
                      download={fileMeta.fileName}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Download File
                    </a>
                  </div>
                ) : (
                  <p className="text-slate-700 whitespace-pre-wrap font-mono text-lg">
                    {secret}
                  </p>
                )}
              </div>
            </div>

            <p className="text-sm text-red-500 font-medium mt-8 animate-pulse">
              This message has now been permanently deleted from the database.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ViewSecret;
