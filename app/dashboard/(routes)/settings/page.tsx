"use client"
import React, { useEffect, useState } from 'react'
import { signOut, useSession } from "next-auth/react";

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { formSchema } from './schema';
import { useForm } from 'react-hook-form';

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
import { Input } from "@/components/ui/input"
import { CalendarDaysIcon, Loader2 } from 'lucide-react';
import TodayDate from '@/lib/today-data';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const SettingsPage = () => {


  const { toast } = useToast();

  const router = useRouter();
  // const [session] = useSession();

  const { data: session, status, update } = useSession();

  const access_token = session?.access;

  const [pageLoading, setPageLoading] = useState(true)



  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
  });




  useEffect(() => {



    form.reset({ firstName: formData.first_name, lastName: formData.last_name }) // Reset the form when formData changes


    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get(`${process.env.BACKEND_URL}/auth/users/me/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
          },
        });
        setFormData(response.data);
        setPageLoading(false)
        // console.log(formData);



      } catch (error) {
        console.log(error)
      }
    }

    fetchData();

  }, [session, formData.first_name, formData.last_name])


  // console.log(formData.first_name);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: formData.first_name,
      lastName: formData.last_name,
    },
  });




  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {


      const response: AxiosResponse = await axios.put(`${process.env.BACKEND_URL}/account/user/update/`, {
        first_name: values.firstName,
        last_name: values.lastName
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
      });

      console.log(response.data)

      if (response?.status === 200) {
        toast({
          variant: "success",
          title: "Success",
          description: "Account updated successfully.",

        })
      }

      router.refresh();




    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",

      })
    }


    console.log(values);
  };





  if (pageLoading) {
    return <div className='min-h-screen-navbar flex items-center justify-center h'>
      <Loader2 className="animate-spin h-12 w-12 text-gray-500" />

    </div>;
  }

  const isLoading = form.formState.isSubmitting;




  return (
    <div>
      <div className='flex items-center justify-between w-full pb-8'>
        <div>
          <span className='text-2xl font-semibold flex items-center gap-1'>Settings <span className='text-lg'>⚙️</span></span>
        </div>
        <div className='hidden md:flex items-center justify-center gap-2 font-bold'>
          <CalendarDaysIcon size={20} className='font-bold' />
          <TodayDate />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Button className='w-full ' type="submit">Update</Button> */}
          <Button className='w-full mt-4 text-lg font-semibold hover:bg-green-600/60 transition ' type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
            Update
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SettingsPage