"use client"

import {z} from "zod";

export const SignUpFormSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(6, {message: "Password must of atleast 6 characters"})
    .regex(/[a-z]/,{message: "Password must contain atleast one character"})
    .regex(/[0-9]/, {message: "Password must contain atleast one number"}),
    email: z.string().min(1,{message: "Email is required"}).email({message: "Invalid email address"})
})

export const SignInFormSchema = z.object({
    identifier: z.string().min(3,{message: "Enter a valid Email or Username"}),
    password: z.string().min(6, {message: "Password must of atleast 6 characters"})
})