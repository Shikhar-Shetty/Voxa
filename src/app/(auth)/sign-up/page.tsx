"use client"
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SignUpFormSchema } from '../../../../schemas/AuthSchemas'
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from "zod";
import axios from "axios"
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
import Link from 'next/link';

const SignUp = () => {
  const router = useRouter();
  
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      password: "",
      email: ""
    }
  })


  const onSubmit: SubmitHandler<z.infer<typeof SignUpFormSchema>> = async(values) => {
    console.log(values);
    try {
      const res = await axios.post("/api/sign-up", values)
      console.log("Success:", res);
      router.push("/sign-in");
    } catch (error) {
      console.error("Error Signup", error);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center '>
      <div className='w-md max-w-md p-8 rounded-2xl '>
        <h2 className='mb-4 text-2xl font-bold text-center'>SignUp</h2>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="JohnDoe" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johnDoe@gmail.com" {...field} />
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
          <div>Already have an Account? {" "}
            <Link href={"/sign-in"} className='text-blue-400'>Sign In</Link>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      </div>
    </div>
  )
}

export default SignUp;