import React from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white'>
       <div className="flex items-center gap-3 text-blue-600">

        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100">
            <img src="https://play-lh.googleusercontent.com/XMNpURmHQBTyDuJ2FVAMF39nwIZPsi1eydYg8HyExXVHWD_qZ2mmhF5MGijqo_ox3g" alt="logo" />
        </div>

        <h2 className="text-xl font-bold text-black">
          SecretShare
        </h2>

      </div>
    </div>
  )
}

export default Navbar
