"use client"

import * as z from "zod"

export const formSchema  = z.object({
    firstName: z.string().min(1, { message: 'First name can\'t be empty' }).max(30, { message: 'First name can\'t exceed 30 characters' }),
    lastName: z.string().min(1, { message: 'Last name can\'t be empty' }).max(30, { message: 'Last name can\'t exceed 30 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string()
      
  })
  .refine((data : any) => data.confirmPassword === data.password, {
    message: 'Passwords do not match',
    path: ["confirmPassword"] // path of the error

  });
  
  