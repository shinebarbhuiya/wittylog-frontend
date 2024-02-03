

import * as z from "zod";


export const formSchema = z.object({
    firstName : z.string().min(1, {
        message : "First name can't be empty! 🚫"
    }),
    lastName : z.string().min(1, {
        message : "Last name can't be empty! 🚫"
    }),
})