"use client"

import * as z from "zod"


export const formSchema = z.object({
    entry: z.string().min(1, {
        message: "Entry can't be empty! 🚫"

    })
})