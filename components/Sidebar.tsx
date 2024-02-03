"use client"

import { Bot, Fan, File, Settings } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Separator } from './ui/separator'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import Logout from './Logout'

import { Lexend_Deca} from 'next/font/google'


const marhey = Lexend_Deca({ weight: ['400', '500', '600', '700'], subsets: ['latin'] })


const routes = [
    {
        label: "Home",
        icon: Fan,
        href: "/dashboard",

    },
    {
        label: "Chat",
        icon: Bot,
        href: "/dashboard/chat",

    },
    {
        label: "Entries",
        icon: File,
        href: "/dashboard/entries",

    },
    {
        label: "Settings",
        icon: Settings,
        href: "/dashboard/settings",

    },
]


const Sidebar = () => {

    const pathname = usePathname();

    return (
        <div className='px-2 relative flex flex-col bg-[#111827] h-full text-white'>
            <Link className='flex py-5 items-center justify-start px-4' href='/dashboard'>
                <div className=' '>
                    <span className={cn(marhey.className, 'font-semibold text-2xl')}>Witty<span className='text-[#24a591] font-bold ml-0.5 '>Log</span></span>

                    {/* <span className='text-sm font-light text-gray-100'> - Make life awesome</span> */}
                </div>
                
            </Link>


            {/* <Separator className='w-full' /> */}

            
            


            <div className='flex flex-col  py-8 items-center   gap-2'>
                
                {routes.map((route) => (
                    <Link key={route.href} href={route.href} className={cn('flex items-center justify-start p-3 w-full gap-3 cursor-pointer   rounded-md hover:font-black    hover:bg-white/70 hover:text-black transition', { 'font-black bg-white/70 text-black': pathname === route.href })}>
                        <route.icon size={26} />
                        <span className='text-xl '>{route.label}</span>
                    </Link>
                ))}
            </div>
            <div className='flex items-center justify-center absolute bottom-10 right-6 left-6 '>
                <Button  className='w-full px-6 py-2 rounded-md cursor-pointer border-none bg-[#bb5559] hover:bg-[#c46e71] transition'>
                    <Logout />
                </Button>
            </div>
        </div>
    )
}

export default Sidebar