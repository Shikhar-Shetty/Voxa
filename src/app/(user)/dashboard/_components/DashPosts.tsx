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


/*
const posts = [
  {
    id: 1,
    title: "Mastering TypeScript with Prisma",
    description: "A complete guide to using Prisma with TypeScript in full-stack apps.",
    createdAt: new Date("2025-05-01T10:00:00Z"),
    updatedAt: new Date("2025-05-01T10:00:00Z"),
    authorId: "user_abc123",
    author: {
      id: "user_abc123",
      name: "Alice",
      email: "alice@example.com",
    }
  },
  {
    id: 2,
    title: "Building a Blog API with Next.js and PostgreSQL",
    description: "Learn how to set up a production-ready blog API using Next.js, Prisma, and PostgreSQL.",
    createdAt: new Date("2025-05-10T14:30:00Z"),
    updatedAt: new Date("2025-05-10T16:00:00Z"),
    authorId: "user_xyz789",
    author: {
      id: "user_xyz789",
      name: "Bob",
      email: "bob@example.com",
    }
  },
    {
    id: 3,
    title: "Building a Blog API with Next.js and PostgreSQL",
    description: "Learn how to set up a production-ready blog API using Next.js, Prisma, and PostgreSQL.",
    createdAt: new Date("2025-05-10T14:30:00Z"),
    updatedAt: new Date("2025-05-10T16:00:00Z"),
    authorId: "user_xyz789",
    author: {
      id: "user_xyz789",
      name: "Bob",
      email: "bob@example.com",
    }
  },
    {
    id: 4,
    title: "Building a Blog API with Next.js and PostgreSQL",
    description: "Learn how to set up a production-ready blog API using Next.js, Prisma, and PostgreSQL.",
    createdAt: new Date("2025-05-10T14:30:00Z"),
    updatedAt: new Date("2025-05-10T16:00:00Z"),
    authorId: "user_xyz789",
    author: {
      id: "user_xyz789",
      name: "Bob",
      email: "bob@example.com",
    }
  }
];
*/

function DashPosts({posts}:{posts: any[]}) {
  return (
    <div className='flex w-full flex-col items-center justify-between py-3'>
      {
        posts.map((post: any) => (
            <div key={post.id} className='flex flex-col justify-center md:w-3xl w-md px-5 max-w-3xl py-5'>
                <Card>
                    <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>{post.description}</CardDescription>
                    </CardHeader>
                        <div>
                            <Image width={200} height={200} src="/blog-icon.png" alt="Nope"/>
                        </div>
                    <CardContent>
                        {post.createdAt.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }).replace(/ /g, "-")}
                    </CardContent>
                    <CardFooter>
                        <p>~ {post.author.username}</p>
                    </CardFooter>
                </Card>

            </div>
        ))
      }
    </div>
  )
}

export default DashPosts
