"use client"

import React, { useEffect, useState } from 'react'
import MasonryCard from './MasonryCard'
import { useSession } from 'next-auth/react'
import axios, { AxiosResponse } from 'axios';
import { Bird, GaugeCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

const Entries = () => {
    const { data: session } = useSession()

    const id = session?.me?.id
    const access_token = session?.access

    const [entries, setEntries] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response: AxiosResponse = await axios.get(process.env.BACKEND_URL + "/entries/", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${access_token}`,
                    },
                });

                setEntries(response.data);
                setLoading(false)

                console.log(response.data);

            } catch (error) {
                console.log(error)
            }
        }

        fetchData()

    }, [session])



  

    return (
        <>
            {loading ?
                <div className='min-h-screen-navbar flex items-center justify-center h'>
                    <Loader2 className="animate-spin h-12 w-12 text-gray-400" />

                </div>

                :
                <>
                    {entries.length === 0 ? (
                    <div className='min-h-96 flex flex-col items-center justify-center gap-2 text-gray-600'>
                        <GaugeCircle className="animate-spin h-10 w-10 mb-4" />
                        <p className='text-xl'>Create entries to get started! </p>
                        <Link href="/dashboard/entries/new"><Button className=' px-10 py-2 rounded-md cursor-pointer text-md'>Create</Button></Link>
                    </div>) : (
                    <div className=''>
                        <div className='p'>
                            {/* <div className='columns-1 sm:columns-2 lg:columns-3 h-full gap-3 space-y-4'> */}
                            <div className='columns-1 gap-3 lg:gap-6 sm:columns-2 lg:columns-3 xl:columns-3 [&>div:not(:first-child)]:mt-5 lg:[&>div:not(:first-child)]:mt-8' >

                                {entries.map((entryItem: any) => (
                                    <div key={entryItem.id}>
                                        <Link href={`/dashboard/entries/${entryItem.id}/edit`}>
                                            <div className='p-8 rounded-3xl border border-gray-100 bg-emerald-200/60 shadow-lg'>
                                                <div className='flex flex-col gap-4'>
                                                    <h3 className='font-semibold text-gray-800'>{entryItem.title}</h3>
                                                    <p className='text-gray-700 font-md'>{entryItem.content}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}


                            </div>

                        </div>
                    </div>

                    )}


                    {/* {entries.map((entryItem: any) => (
                        <MasonryCard key={entryItem.id} title={entryItem.title} content={entryItem.content} />
                    ))} */}
                </>

            }


        </>
    );
}

export default Entries