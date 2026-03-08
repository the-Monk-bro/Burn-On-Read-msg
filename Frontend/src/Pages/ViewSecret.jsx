import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewSecret = () => {
  const { id } = useParams(); 
  const [secret, setSecret] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg,setErrMsg] = useState("");
  const [errDesc, setErrDesc] = useState("");

  const handleReveal = async () => {
    setIsLoading(true);
    
    try {

      const res = await fetch(`http://localhost:3000/secret/${id}`);
      const result = await res.json();

      if (result.err){
        setIsError(true);
        setErrMsg(result.msg);
        setErrDesc(result.desc);
      }
  
      setTimeout(() => {
        setSecret(result.msg);
        setIsRevealed(true);
        setIsLoading(false);
      }, 800);

    } catch (error) {
      console.error("Error fetching secret:", error);
      setIsExploded(true);
      setIsLoading(false);
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
                <p className="text-slate-700 whitespace-pre-wrap font-mono text-lg">
                  {secret}
                </p>
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