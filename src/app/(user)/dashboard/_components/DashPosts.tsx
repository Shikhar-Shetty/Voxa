/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import  Image  from 'next/image';


function DashPosts({posts}:{posts: any[]}) {
  return (
    <div className='flex w-full flex-col items-center justify-between py-3'>
      {
        posts.map((post: any) => (
            <div key={post.id} className='flex items-center md:items-stretch flex-col justify-center md:w-3xl  md:px-5 max-w-3xl py-5'>
                <Card className='px-6 md:px-0'>
                    <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>{post.description}</CardDescription>
                    </CardHeader>
                        <div className='rounded px-5'>
                            <Image width={270} height={250} src={post.image} className='rounded-sm transition duration-300 md:w-[250px]' alt="Nope" unoptimized/>
                        </div>
                    <CardContent>
                        {post.createdAt.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }).replace(/ /g, "-")}
                    </CardContent>
                    <CardFooter>
                        <p className='border rounded-lg p-2'>~ {post.author.username}</p>
                    </CardFooter>
                </Card>

            </div>
        ))
      }
    </div>
  )
}

export default DashPosts
