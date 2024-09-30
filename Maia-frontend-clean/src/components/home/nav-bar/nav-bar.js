import React from 'react';
import Profile from "@/components/home/nav-bar/profile";

function NavBar () {
  return (
    <div className="w-screen h-fit bg-accent py-3 px-5 flex flex-row justify-between overflow-y-auto">
      <div className="flex flex-row gap-x-1">
        <img src="/images/logo_wo_bg.png" alt="Logo" className='w-7 h-auto'/>
        <div className="font-black text-white text-xl pl-1 font-open-sans">
            Maia
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <Profile />
      </div>
    </div>
  )
}

export default NavBar;