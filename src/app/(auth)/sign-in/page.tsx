"use client"
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SignInFormSchema } from '../../../../schemas/AuthSchemas'
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from "zod";
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const SignIn = () => {
  const router = useRouter();
  
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      identifier: "",
      password: ""
    }
  })


  const onSubmit: SubmitHandler<z.infer<typeof SignInFormSchema>> = async(values) => {
    const res = await signIn("credentials", {
      redirect: false,
      identifier: values.identifier,
      password: values.password
    })    
      if (res?.ok) {
        router.push("/dashboard"); 
      } else {
        console.error("Invalid credentials");
      }
  }

  return (
    <div className='min-h-screen flex items-center justify-center '>
      <div className='w-md max-w-md p-8 rounded-2xl '>
        <h2 className='mb-4 text-2xl font-bold text-center'>Sign In</h2>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username/Email</FormLabel>
                <FormControl>
                  <Input placeholder="JohnDoe" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} />
                </FormControl>
                <FormDescription>
                  
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      </div>
    </div>
  )
}

export default SignIn;