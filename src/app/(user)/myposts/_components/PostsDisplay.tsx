/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from 'react'
import { Pencil } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { Plus } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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


function PostsDisplay() {
    const [editModeId, setEditModeId] = useState<number | null>(null);
    const [addPost, setAddPost] = useState(false);
    const [post, setPost] = useState(posts);

    const handleAdd = (newPost) => {

    };

    const handleEdit = (id, updatedPost) => {

    }

    const handleDelete = (id) => {

    }

    return (
        <div className='flex flex-col w-full  items-center '>
            <div className="flex flex-row w-full max-w-3xl rounded-md p-4 bg-neutral-900 justify-between">
                <div>User Posts</div>

                <div onClick={() => {
                    setAddPost(true);
                    setEditModeId(null);
                }} className='border cursor-pointer rounded-sm'>
                    <Plus />
                </div>
            </div>

            {addPost && (
                <div className='flex flex-col justify-center w-full max-w-3xl py-5'>
                    <Card>
                        <div className='items-center flex flex-row'>
                            <div className='flex flex-col w-full'>
                                <CardHeader>
                                    <div className="space-y-2">
                                        <Label htmlFor='title'>Title</Label>
                                        <Input
                                        id="title"
                                            placeholder='Title'
                                            defaultValue={" "}
                                            className="bg-neutral-800 text-white p-2 mb-3 rounded w-full"
                                        />
                                        <Label htmlFor="text">Post Description</Label>
                                        <Textarea
                                            id="text"
                                            placeholder='Title'
                                            defaultValue={" "}
                                            className="bg-neutral-800 text-white p-2 rounded w-full"
                                        />
                                        <div className='flex justify-between'>
                                            <button
                                                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white cursor-pointer rounded"
                                                onClick={() => setAddPost(false)}
                                            >
                                                Save
                                            </button>
                                            <button onClick={() => setAddPost(false)} className='bg-red-600 px-3 rounded hover:bg-red-700 text-white cursor-pointer'>Cancel</button>
                                        </div>

                                    </div>
                                </CardHeader>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
            <div className='flex w-full flex-col justify-center items-center'>
                {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    posts.map((post: any) => (
                        <div key={post.id} className='flex flex-col justify-center w-full max-w-3xl py-5'>
                            <Card>
                                <div className='items-center flex flex-row'>
                                    <div className='flex flex-col w-full'>
                                        <CardHeader>
                                            {editModeId === post.id ? (
                                                <div className="space-y-2">
                                                    <input
                                                        defaultValue={post.title}
                                                        className="bg-neutral-800 text-white p-2 rounded w-full"
                                                    />
                                                    <textarea
                                                        defaultValue={post.description}
                                                        className="bg-neutral-800 text-white p-2 rounded w-full"
                                                    />
                                                    <div className='flex justify-between'>
                                                        <button
                                                            className="px-3 py-1 bg-green-600 text-white cursor-pointer rounded"
                                                            onClick={() => {
                                                                setEditModeId(null)
                                                            }}
                                                        >
                                                            Save
                                                        </button>
                                                        <button onClick={() => setEditModeId(null)} className='bg-red-600 px-3 rounded hover:bg-red-700 cursor-pointer text-white'>Cancel</button>
                                                    </div>

                                                </div>
                                            ) : (
                                                <>
                                                    <CardTitle>{post.title}</CardTitle>
                                                    <CardDescription>{post.description}</CardDescription>
                                                </>
                                            )}
                                        </CardHeader>
                                    </div>
                                    {editModeId === post.id ? (
                                        <div></div>
                                    ) : (
                                        <div className='flex'>
                                            <div className='text-red-900 cursor-pointer'>
                                                <Trash2 className='w-6' />
                                            </div>
                                            <div onClick={() => {
                                                setEditModeId(post.id)
                                                setAddPost(false)
                                            }} className='px-5 cursor-pointer'>
                                                <Pencil className='w-5' />
                                            </div>
                                        </div>
                                    )}

                                </div>

                                <div>
                                    <Image width={200} height={200} src="/blog-icon.png" alt="Nope" />
                                </div>
                                <CardContent>
                                    {post.createdAt.toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    }).replace(/ /g, "-")}
                                </CardContent>
                                <CardFooter>
                                    <p>~ {post.author.name}</p>
                                </CardFooter>
                            </Card>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PostsDisplay
