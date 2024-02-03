import React from 'react'
import { Button } from './ui/button'
import Logout from './Logout'
import Link from 'next/link'
import { CatIcon, PlusIcon } from 'lucide-react'

const DesktopNavbar = () => {
  return (
    <div className='py-3 ml-72 bg-[#7cdacb] shadow-md fixed right-0 left-0  z-[90] '>
        <div className='flex items-center justify-between px-5'>
            <div className='flex items-center justify-center gap-1 text-xl font-bold'>
                <CatIcon className='font-bold' />
                <span className=''>Meow! </span>
            </div>
            <div>
            <Link href='/dashboard/entries/new'><Button className='flex items-center justify-center gap-1 bg-[#111827]'>Create Entry<PlusIcon className='w-5 h-5' /></Button></Link>
            </div>

        </div>
    </div>
  )
}

export default DesktopNavbar