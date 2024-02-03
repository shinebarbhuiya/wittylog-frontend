import MasonryCard from '@/components/MasonryCard'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Entries from '@/components/Entries';
import { CalendarDaysIcon } from 'lucide-react';
import TodayDate from '@/lib/today-data';


const EntriesPage = async () => {

  // const session = await getServerSession(authOptions)



  // console.log(session?.me?.id);

  // const userId = session?.me?.id;
  // const access_token = session?.access;



  return (
    <div className='h-full w-full'>
      <div className='flex items-center justify-start '>
                {/* <h1 className='font-bold text-3xl '>Welcome! {session.user?.first_name}. What's up in your mind?</h1> */}
                <div className='flex items-center justify-between w-full pb-8'>
                    <div>
                        <span className='text-2xl font-semibold  '>📓 Entries ✍️</span>
                    </div>
                    <div className='hidden md:flex items-center justify-center gap-2 font-bold'>
                        <CalendarDaysIcon size={20} className='font-bold' />
                        <TodayDate />
                    </div>
                </div>
                
            </div>
      <Entries /> 

      
     
    </div>


  )
}

export default EntriesPage