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


// export default async function RegisterPage() {
//     const session = await getServerSession();
//     if (session) {
//         redirect('/');
//     }
//     return <Form />;
// }




const RegisterPage = () => {

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


    const onSubmit = (values : z.infer<typeof formSchema>) => {
        console.log(values)
    }






  return (
    <div className='bg-red-200'>
        <h1 className='text-3xl font-bold py-3 text-center'>Register</h1>
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your first name" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your first name
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    


                </form>
            </Form>
        </div>
        
    </div>
  )
}

export default RegisterPage