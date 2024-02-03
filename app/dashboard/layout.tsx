
import DesktopNavbar from '@/components/DesktopNavbar'
import MobileNavbar from '@/components/MobileNavbar'
import MobileSidebar from '@/components/MobileSidebar'
import Sidebar from '@/components/Sidebar'
import React from 'react'





const DashboardLayout = async ({children}: {children: React.ReactNode}) => {

   

  return (
    <div className='h-full relative  bg-[#F6F9FC]'>
        <div className=' hidden h-full md:flex w-72 flex-col  fixed inset-y-0 bg-[#111827]  z-[90]'>

            <Sidebar />
        </div>
        <div className='md:hidden'>
          <MobileNavbar  />
        </div>
        <div className='hidden md:block'>
          <DesktopNavbar />
        </div>
        <main className='md:ml-72 p-4 md:p-8 pt-6 md:mt-0    ' style={{ minHeight: 'calc(100vh - 4rem)' }}>
            
            {/* <MobileSidebar /> */}
            {children}
        </main>
        
    </div>
  )
}

export default DashboardLayout