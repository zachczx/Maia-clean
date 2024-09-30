import React from 'react';

function Header () {
  return (
    <div className='flex justify-center'>
      <div className="flex flex-col gap-x-2">
        <img src="/images/logo.png" alt="Logo" className='w-20 mx-auto' />
        <p className="font-black text-3xl font-open-sans text-center">
          Nice to meet you, I&apos;m <span className='text-accent'>Maia</span>.
        </p>
      </div>
    </div>
  )
}

export default Header;