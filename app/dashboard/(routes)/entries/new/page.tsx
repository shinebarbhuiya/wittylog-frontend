"use client"


import React, { useEffect, useRef } from 'react';

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

import axios, { AxiosResponse} from 'axios';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';




const EntryPage = () => {

    const router = useRouter();

    const { data : session, status } = useSession();
    const userId = session?.me?.id;
    const access_token = session?.access;





    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            entry: "",
        }
    })


    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {

        try {

            console.log(process.env);

            const response: AxiosResponse = await axios.post(process.env.BACKEND_URL + "/entries/" , {
              content : data.entry,
              author : userId
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


        // const response = await axios({
        //     method: "POST",
        //     url: process.env.NEXTAUTH_BACKEND_URL + "api/entries/",
        //     data: {
        //         content : data.entry,
        //         author : userId
        //     },
        //   });

        
        
        
        console.log(data.entry)
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

                    {/* {(!isLoading) ?
                        (
                            <Button disabled={isLoading} type='submit' className="w-full text-md font-bold">Make Entry 📝</Button>
                        ) :

                        (
                            <Button className='w-full text-md font-bold' disabled>

                                Please Wait
                                <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                            </Button>
                        )



                    } */}

                    <Button className='w-full mt-4 text-lg font-semibold hover:bg-green-600/60 transition ' type="submit" disabled={isLoading}>
                        {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
                        {isLoading ? "Please Wait" : null}
                        {!isLoading ? "Make Entry 📝" : null}
                        
                    </Button>







                </form>

            </Form>

        </div>
    )
}

export default EntryPage