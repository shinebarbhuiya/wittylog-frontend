"use client";

// import { getServerSession } from 'next-auth';
// import Form from './form';
// import { redirect } from 'next/navigation';


import { formSchema } from './schema';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"


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
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Loader2, MountainIcon, MountainSnowIcon } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';


// export default async function RegisterPage() {
//     const session = await getServerSession();
//     if (session) {
//         redirect('/');
//     }
//     return <Form />;
// }




const RegisterPage = () => {

    const { data : session } = useSession();

    if (session) {
        redirect('/dashboard');
    }

    const { toast } = useToast()

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            firstName : "",
            lastName : "",
            email : "",
            password : "",
            confirmPassword : ""
        }
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}/auth/users/` , {
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                password: values.password,
            });
    
            console.log(response.data);
    
            if (!response?.data) {
                throw new Error('Registration failed');
            }
    
            router.push('/login');
            console.log(values);
        } catch (error : any) {
            if (axios.isAxiosError(error) && error.response) {
                // If it's an Axios error and the response is available
                const responseData = error.response.data;
                console.error('Error:', responseData);

               
    
                // Access specific error messages, for example, email errors
                if (responseData.email) {
                    console.log('Email errors:', responseData.email);

                    toast({
                        variant: "destructive",
                        title: "Try to change email",
                        description: responseData.email,
                        // action: <ToastAction altText="Try again">Try again</ToastAction>,
                      })

                }
            } else {
                console.error('Error:', error.message);
            }
    
            router.push('/register');
            router.refresh();
        }
    };

    const isLoading = form.formState.isSubmitting;





  return (
    <div className='bg-gray-100/10 rounded-md p-6 w-full md:w-1/2 border-2 border-gray-300  shadow-sm flex flex-col ' >
        <div className='flex flex-col items-center mb-8 text-gray-800 '>

            <MountainSnowIcon className='w-10 h-10 my-2' />
            <h1 className='text-2xl font-bold  text-center '>Create Your Account</h1>
            <p className='text-sm text-center bg-green-200 rounded-md px-2 py-1 '>Welcome to Kabote, please register your account</p>
        </div>
        <Separator />
        
        
        <div className='w-full mt-8'>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}  className="w-full flex flex-col gap-3 ">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm '>First name</FormLabel>
                                <FormControl >
                                    <Input className='' placeholder="Enter first name" {...field} />
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
                                <FormLabel className='text-sm py-0'>Last name </FormLabel>
                                <FormControl >
                                    <Input className='' placeholder="Enter last name" {...field} />
                                </FormControl>
                                
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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

                    
                    <FormField
                        
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=''>Confirm Password</FormLabel>
                                <FormControl >
                                    
                                    <Input type="password" className='' placeholder="Confirm your password" {...field} />
                                </FormControl>
                                
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* {(isLoading) ? (
                        <Button className='w-full mt-4 text-lg font-semibold hover:bg-green-600/60 transition ' type="submit" disabled={true}>Register</Button>
                    ): (
                        <Button className='w-full mt-4 text-lg font-semibold hover:bg-green-600/60 transition ' type="submit" >Register</Button>
                    )} */}
                
                    
                    <Button className='w-full mt-4 text-lg font-semibold hover:bg-green-600/60 transition ' type="submit" disabled={isLoading}>
                        {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
                        Register
                    </Button>
                    

                </form>
                <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                    or
                </div>
                <p className='text-center text-sm text-gray-600 mt-2'>
                    Already have an account? <Link href="/login" className='text-blue-600 font-semibold '>Login</Link>
                </p>
            </Form>
        </div>
        
    </div>
  )
}

export default RegisterPage