import React from 'react'
import MobileSidebar from './MobileSidebar'
import Link from 'next/link'
import { CalendarDaysIcon } from 'lucide-react'
import TodayDate from '@/lib/today-data'

const MobileNavbar = () => {
  return (
    <div className='flex items-center justify-between px-3 py-2 w-full bg-gray-200'>
        
        <Link className='flex  items-center justify-center' href='/dashboard'>
                <div className=' '>
                    <span className='font-medium text-2xl'><span className='text-red-500 font-bold ml-1 md:ml-0.5 text-3xl'>X</span></span>

                    {/* <span className='text-sm font-light text-gray-100'> - Make life awesome</span> */}
                </div>
                
        </Link>
        {/* <TodayDate  />   */}
        
        <div className='font-semibold text-gray-800 text-sm md:hidden'>
            <TodayDate />  
                         
        </div>

        <div>
          <MobileSidebar />
        </div>
        
    </div>
  )
}

export default MobileNavbar