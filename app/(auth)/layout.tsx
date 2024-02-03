import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex items-center justify-center  h-screen px-3 py-4 bg-[#F6F9FC]'>
        {children}
    </div>
  )
}

export default AuthLayout