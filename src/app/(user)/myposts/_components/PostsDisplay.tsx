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
import { addPost, deletePost, updatePost } from '../../../../../actions/posts';
import UploadForm from '../../../../components/UploadForm';


interface UserPosts{
    title: string;
    id: number;
    description: string;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    author:{
        username: string
    }
};

function PostsDisplay({posts, userId}:{posts:UserPosts[]; userId: string}) {
    const [editModeId, setEditModeId] = useState<number | null>(null);
    const [showAddPost, setShowAddPost] = useState(false);
    const [post, setPost] = useState<UserPosts[]>(posts);
    const [currentPost, setCurrentPost] = useState({
        title: "",
        description: "",
    });
    const [image, setImage] = useState<string>("");


    const handleAdd = async(id: string, newPost:{title:string, description: string}, image: string) => {
        try {
            const res = await addPost(id, newPost, image);

        const formattedPost: UserPosts = {
            ...res,
            author: {
                username: res.author.username,
            },
            image,
        };

        setPost(prev => [...prev, formattedPost]);  
        setCurrentPost({title: "", description: ""})
        
        } catch (error) {
            console.log("Error While adding the Post");
        }
    };

    const handleEdit = async(postId: number,id: string,  updatedPost: {title: string, description: string}) => {
        try {
            const res = await updatePost(postId, id, updatedPost.title, updatedPost.description);
            setPost(prev =>
                prev.map(p => p.id === postId ? { ...p, ...updatedPost, updatedAt: new Date() } : p)
            );
            console.log(res);
        setCurrentPost({ title: "", description: "" });
        } catch (error) {
            console.log("Error updating Post", error);
            throw new Error("Error while Updating the Post");
        }
    }

    const handleDelete = async(id: number, userId: string) => {
        try {
            await deletePost(id, userId);
            setPost(prev => prev.filter(p => p.id !== id)); 
        } catch (error) {
            console.log("Error deleting Post", error);
            throw new Error("Error while deleting the Post");
        }
    }

    return (
        <div className='flex flex-col w-full items-center '>
            <div className="flex flex-row w-full max-w-3xl rounded-md p-4 bg-white text-black dark:text-white dark:bg-neutral-900 justify-between">
                <div>User Posts</div>

                <div onClick={() => {
                    setShowAddPost(true);
                    setEditModeId(null);
                }} className='border cursor-pointer rounded-sm'>
                    <Plus className='dark:text-gray-200 text-black'/>
                </div>
            </div>

            {showAddPost && (
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
                                            value={currentPost.title}
                                            onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                                            className="bg-neutral-800 text-white p-2 mb-3 rounded w-full"
                                        />
                                        <Label htmlFor="text">Post Description</Label>
                                        <Textarea
                                            id="text"
                                            placeholder='Description'
                                            value={currentPost.description}
                                            onChange={(e) => setCurrentPost({...currentPost, description: e.target.value})}
                                            className="bg-neutral-800 text-white p-2 rounded w-full"
                                        />
                                        <UploadForm setImage={setImage}/>
                                        <div className='flex justify-between'>
                                            <button
                                                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white cursor-pointer rounded"
                                                onClick={() => {
                                                    handleAdd(userId, currentPost, image);
                                                    setShowAddPost(false)
                                                }}
                                            >
                                                Save
                                            </button>
                                            <button onClick={() => {
                                                setShowAddPost(false)
                                                setCurrentPost({ title: "", description: "" });
                                                }} className='bg-red-600 px-3 rounded hover:bg-red-700 text-white cursor-pointer'>Cancel</button>
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
                    post.map((post: UserPosts) => (
                        <div key={post.id} className='flex flex-col justify-center w-full max-w-3xl py-5'>
                            <Card>
                                <div className='items-center flex flex-row'>
                                    <div className='flex flex-col w-full'>
                                        <CardHeader>
                                            {editModeId === post.id ? (
                                                <div className="space-y-2">
                                                    <input
                                                        value={currentPost.title}
                                                        onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                                                        className="bg-neutral-800 text-white p-2 rounded w-full"
                                                    />
                                                    <textarea
                                                        value={currentPost.description}
                                                        onChange={(e) => setCurrentPost({...currentPost, description: e.target.value})}
                                                        className="bg-neutral-800 text-white p-2 rounded w-full"
                                                    />
                                                    <div className='flex justify-between'>
                                                        <button
                                                            className="px-3 py-1 bg-green-600 text-white cursor-pointer rounded"
                                                            onClick={() => {
                                                                handleEdit(post.id, userId, currentPost)
                                                                setEditModeId(null)
                                                            }}
                                                        >
                                                            Save
                                                        </button>
                                                        <button onClick={() => {
                                                            setEditModeId(null)
                                                            setCurrentPost({ title: "", description: "" })
                                                        }} className='bg-red-600 px-3 rounded hover:bg-red-700 cursor-pointer text-white'>Cancel</button>
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
                                            <div
                                                onClick={() => {handleDelete(post.id, userId)                                                }}
                                                className='text-red-900 cursor-pointer'>
                                                <Trash2 className='w-6' />
                                            </div>
                                            <div onClick={() => {
                                                setEditModeId(post.id)
                                                setCurrentPost({
                                                    title: post.title,
                                                    description: post.description
                                                });
                                                setShowAddPost(false);

                                            }} className='px-5 cursor-pointer'>
                                                <Pencil className='w-5' />
                                            </div>
                                        </div>
                                    )}

                                </div>

                                <div className='px-5'>
                                    <Image width={200} height={200} src={`${post.image}`} className='rounded-sm' alt={post.title || "Blog Image"}
                                        onError={(e) => (e.currentTarget.style.display = "none")} unoptimized/>
                                </div>
                                <CardContent>
                                    {post.createdAt.toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    }).replace(/ /g, "-")}
                                </CardContent>
                                <CardFooter>
                                    <p className='border rounded-lg p-2'>~ {post.author.username || "Unknown Author"}</p>
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
