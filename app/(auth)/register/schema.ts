"use client"

import * as z from "zod"

export const formSchema  = z.object({
    firstName: z.string().min(3, { message: 'First name must be at least 3 characters long' }).max(30, { message: 'First name cannot exceed 30 characters' }),
    lastName: z.string().min(3, { message: 'Last name must be at least 3 characters long' }).max(30, { message: 'Last name cannot exceed 30 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string().min(6, { message: 'Confirmation password must be at least 6 characters long' })
      .refine((data : any) => data.confirmPassword === data.password, {
        message: 'Passwords do not match',
      }),
  });
  
  