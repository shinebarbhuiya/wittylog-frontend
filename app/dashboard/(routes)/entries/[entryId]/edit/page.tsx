"use client"

import { useParams, useRouter } from 'next/navigation'


import React, { useEffect, useState } from 'react'

// import React, { useEffect, useRef } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { formSchema } from "./constants"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from 'lucide-react';

import axios, { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';

const page = ({ params }: { params: { entryId: string } }) => {

  const router = useRouter();

  const { data: session, status } = useSession();
  const userId = session?.me?.id;
  const access_token = session?.access;

  console.log(access_token)

  const [formData, setFormData] = useState([])

  const [pageLoading, setPageLoading] = useState(true)




  useEffect(() => {
    form.reset({ entry: formData }) // Reset the form when formData changes
    //Send API call to retrive the data here. 


    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get(`${process.env.BACKEND_URL}/entries/${params.entryId}/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
          },
        });

        // console.log(response);

        // console.log(response.status);


        if (response.status === 404) {
          console.log("hey boi,, some error .. like 404 or somethin")

          router.push("/dashboard/entries");

        }

        if (response.status !== 200) {

          router.push("/dashboard/entries");
        }

        setFormData(response.data.content);
        console.log(response.data.content);
        setPageLoading(false)

      } catch (error) {
        console.error("Error making request:", error);
      }
    }



    fetchData()

  }, [session, formData])





  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entry: formData,
    }
  })



  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {

    try {
      const response: AxiosResponse = await axios.post(`${process.env.BACKEND_URL}/entries/`, {
        content: data.entry,
        author: userId
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
      });



      router.push(`/dashboard/entries/${response.data.id}/edit`);
      console.log(response.data.id);
    } catch (error) {
      console.log(error);
    }



    console.log(data.entry)
  }


  const onDelete = async () => {

    try {
      const response: AxiosResponse = await axios.delete(`${process.env.BACKEND_URL}/entries/${params.entryId}/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
      });

      router.push("/dashboard/entries")

    } catch (error) {
      console.log(error)
    }
  }
      


  if (pageLoading) {
    return <div className='min-h-screen-navbar flex items-center justify-center h'>
      <Loader2 className="animate-spin h-12 w-12 text-gray-500" />

    </div>;
  }







  return (



    <div className='h-full w-full md:mt-12'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="entry"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Entry</FormLabel> */}
                <FormControl className="">
                  <Textarea className="bg-[#F6F9FC] p-6 bg-[#111827]/10 text-md text-black/80   focus-visible:ring-transparent" placeholder="Write your entry here 🪄" rows={29} {...field} />
                </FormControl>
                {/* <FormDescription>
                              Write your entry here
                          </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}

          />

          <div className='flex items-center justify-center gap-3'>
            <Button className='w-full  text-lg font-semibold hover:bg-green-600/60 transition ' type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
              {isLoading ? "Please wait" : null}
              {!isLoading ? "Update Entry 📝" : null}

            </Button>

            <Button className='w-full  text-lg font-semibold bg-red-500 hover:bg-green-600/60 transition ' type="submit" onClick={() => router.push("/dashboard/entries")} disabled={isLoading}>
              {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
              {isLoading ? "Please wait" : null}
              {!isLoading ? "Delete Entry ⚠️" : null}

            </Button>

          </div>

          

        </form>

      </Form>

    </div>
  )
}


export default page;




