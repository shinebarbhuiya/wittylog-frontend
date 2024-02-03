"use client";

// import { getServerSession } from 'next-auth';
// import Form from './form';
// import { redirect } from 'next/navigation';


import { formSchema } from './schema';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { signIn, useSession } from 'next-auth/react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import {  Loader2, MountainSnowIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';


// export default async function RegisterPage() {
//     const session = await getServerSession();
//     if (session) {
//         redirect('/');
//     }
//     return <Form />;
// }




const LoginPage = () => {

  const { data : session } = useSession();

  const router = useRouter();

    // Use useEffect to handle the redirect
  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);
  

  const { toast } = useToast()

  

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl');
  console.log(callbackUrl);
  // Redirect to the callback URL or a default route
  // router.push(callbackUrl || '/dashboard/entries/new');

  const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            email : "",
            password : "",
        }
    })


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        const response = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        });
    
        console.log(values.email);
        console.log({ response });
    
        if (response?.ok) {
          toast({
            variant: "success",
            title: "Login Success!",
            description: "Welcome to WittyLog! You are now logged in.",
            
          })
          router.push(callbackUrl || '/dashboard');
          
        }

        if (response?.error) {
          toast({
            variant: "destructive",
            title: "Opps! Please try again!",
            description: "Password or username is incorrect!",
            
          })
        }


      } catch (error) {
        toast({
          variant: "destructive",
          title: "Sign in error",
          description: "There were some error on our side! Please try again!",
          
        })
        // Handle the error as needed
        console.error('An error occurred during sign-in:', error);

      }
    };



  const isLoading = form.formState.isSubmitting;



  return (
    <div className='bg-gray-100/10 rounded-md p-6 w-full md:w-1/2 border-2 border-gray-300  shadow-sm flex flex-col ' >
        <div className='flex flex-col items-center mb-8 text-gray-800 '>

            <MountainSnowIcon className='w-10 h-10 my-2' />
            <h1 className='text-2xl font-bold  text-center '>Login To Your Account</h1>
            <p className='text-sm text-center bg-green-200 rounded-md px-2 py-1 mt-1 '>Welcome back, Kabote missed you!</p>
        </div>
        <Separator />
        
        
        <div className='w-full mt-8'>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}  className="w-full flex flex-col gap-3 ">
                    

                   
                    <FormField
                        
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm py-0'>Email</FormLabel>
                                <FormControl >
                                    <Input type="email" className='' placeholder="Enter your email" {...field} />
                                </FormControl>
                                
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm py-0'>Password</FormLabel>
                                <FormControl >
                                    <Input type="password" className='' placeholder="Enter your password" {...field} />
                                </FormControl>
                                
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    
                    

                    
                    <Button className='w-full mt-4 text-lg font-semibold hover:bg-green-600/60 transition ' type="submit" disabled={isLoading}>
                        {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
                        Login
                    </Button>

                </form>
                <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                    or
                </div>
                <p className='text-center text-sm text-gray-600 mt-2'>
                 New to Kabote? <Link href="/register" className='text-blue-600 font-semibold '>Register</Link>
                </p>
            </Form>
        </div>
        
    </div>
  )
}

export default LoginPage