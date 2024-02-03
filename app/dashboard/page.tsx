"use client"

import React from 'react'

import { signOut, useSession } from "next-auth/react";
import { Calendar, CalendarDaysIcon, CalendarIcon, PlusIcon } from 'lucide-react';
import TodayDate from '@/lib/today-data';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import EmojiSection from '@/components/EmojiSection';
import Entries from '@/components/Entries';


const DashboardHomePage = () => {
    const { data: session, status } = useSession({ required: true });

    // print(session)

    console.log(session)


    if (status == "loading") {
        return "Loading . . .";
    }

    return (
        <div className='h-full text-gray-800 '>
            <div className='flex items-center justify-start '>
                {/* <h1 className='font-bold text-3xl '>Welcome! {session.user?.first_name}. What's up in your mind?</h1> */}
                <div className='flex items-center justify-between w-full '>
                    <div>
                        <span className='text-2xl font-semibold  '>Hello {session.me?.first_name}, Welcome! 👋</span>
                    </div>
                    <div className='hidden md:flex items-center justify-center gap-2 font-bold'>
                        <CalendarDaysIcon size={20} className='font-bold' />
                        <TodayDate />
                    </div>
                </div>
                
            </div>

            <div className='flex flex-col items-center justify-start gap-3 mt-6 md:flex-row'>
                {/* <Button variant='outline' className='bg-purple-400 px-6 py-2 rounded-md cursor-pointer'>
                    Create a new entry
                </Button> */}
                <Link href='dashboard/entries/new' className='w-full md:w-auto'>
                   
                <div className='bg-[#585A79] flex w-full md:w-auto  items-center justify-between  p-3  rounded-md cursor-pointer  text-white/95 hover:bg-[#585A79]/90 transition'>
                    <div className='flex flex-col '>
                        <h2 className='text-md md:text-lg font-medium md:mr-28 '>Create a new entry</h2>
                        <p className='text-sm'>Start from stratch</p>
                    </div>
                    <PlusIcon size={20} className='font-bold mx-7' />
                </div>
                </Link>
                

                <Link href='dashboard/chat' className='w-full md:w-auto'>
                <div className='bg-[#585A79] w-full md:w-auto    flex items-center justify-between  p-3  rounded-md cursor-pointer  text-white/95 hover:bg-[#585A79]/90 transition'>
                    <div className='flex flex-col '>
                        <h2 className='text-md md:text-lg font-medium md:mr-28'>Let AI write for you</h2>
                        <p className='text-sm'>Just share the key points</p>
                    </div>
                    <PlusIcon size={20} className='font-bold mx-7' />
                </div>
                </Link>




            </div>
            
            {/* <div className='py-8'>
                
            <h2 className='text-lg font-medium pb-4'> Your Entries</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 '>
                
                
            <div className='rounded-r-lg flex flex-col items-center justify-center text-gray-100 h-80 shadow-lg cursor-pointer  bg-gradient-to-r from-blue-400 to-emerald-400'>
                    <p className='text-xl font-bold  '>March</p>
                    <p className='text-sm '>23 Entries</p>
                </div>

                <div className='rounded-r-lg flex flex-col items-center justify-start h-80 shadow-lg cursor-pointer  bg-[#DED0B6] text-black/80'>
                    <div className='overflow-hidden mb-5 md:mb-5 text-center'>
                    <p className='text-lg p-3 font-bold  '>Saturday, Dec 30th, 2023</p>
                    <Separator />
                    <p className='text-sm p-4  overflow-hidden  	'>Today was a day filled with both challenges and moments of joy. In the morning, I faced a daunting task at work that required careful problem-solving and collaboration with colleagues. Despite the initial stress, we were able to overcome the obstacles, and the successful resolution brought a sense of accomplishment.

During my lunch break, I took a short walk in the nearby park. The crisp winter air and the rustle of leaves beneath my feet provided a refreshing break and a chance to clear my mind. Nature has a remarkable way of offering solace and perspective.

</p>

                    </div>
                    
                </div>
                <div className='rounded-r-lg flex flex-col items-center justify-center h-80 shadow-lg cursor-pointer  bg-orange-500/20'>
                    <p className='text-xl font-bold  '>March</p>
                    <p className='text-sm '>23 Entries</p>
                </div>
                <div className='rounded-r-lg flex flex-col items-center justify-center h-80 shadow-lg cursor-pointer  bg-orange-500/20'>
                    <p className='text-xl font-bold  '>March</p>
                    <p className='text-sm '>23 Entries</p>
                </div>
               
            </div>

            </div> */}
            <div className='py-8 text-gray-800'>
                <h2 className='text-xl font-bold pb-4'> Your Entries 👇 </h2>
                
                <Entries />
            </div>
            
            
            



            {/* <EmojiSection /> */}

        </div>
    )
}

export default DashboardHomePage