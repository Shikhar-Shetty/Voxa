/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import prisma from "../lib/prisma";

export const addPost = async (id: string, posts: any, image: string) => {
    try {
        const newPost = await prisma.post.create({
            data: {
                ...posts,
                image,
                authorId: id,
            },
            include: {
                author: true
            }
        })
        console.log(newPost);
        return newPost;
    } catch (error) {
        console.log("Error:", error);
        throw new Error("The post was not added");
    }
}

export const updatePost = async (postId: number, userId: string, title: string, description: string) => {
    try {
        const userPost = await prisma.post.findFirst({
            where: {
                id: postId,
                authorId: userId
            }
        });

        console.log(userPost);
        if (!userPost) {
            throw new Error("Error Fetching User Post");
        }
        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                title,
                description
            }
        })
        console.log(updatedPost);
        return updatedPost;
    } catch (error) {
        console.log("Error updating Post", error);
        throw new Error("Error updating the post");
    }
}

export const deletePost = async (postId: number, userId: string) => {
    try {
        const userPost = await prisma.post.findFirst({
            where: {
                id: postId,
                authorId: userId
            }
        })
        if (!userPost) {
            console.log("No Post found");
            throw new Error("Invalid Post, cannot delete");
        }
        const deletedPost = await prisma.post.delete({
            where: {
                id: postId
            }
        })
        console.log(deletedPost);
        return deletedPost;
    } catch (error) {
        console.log("Error Removing Post", error);
        throw new Error("Error Deleting the Post");
    }
}

export const getAllUserPosts = async (userId: string) => {
    try {
        const userPosts = await prisma.post.findMany({
            where: {
                authorId: userId
            },
            include: {
                author: true
            }
        });
        console.log(userPosts);
        return userPosts;
    } catch (error) {
        console.log("Error Fetching User Posts", error);
        throw new Error("Error Fetching the User Posts");
    }
}

export const getAllPosts = async () => {
    try {
        const allPosts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                author: {
                    select: {
                        id: true,
                        email: true,
                        username: true, 
                    }
                }
            }
        });
        console.log(allPosts);
        return allPosts;
    } catch (error) {
        console.log("Error Displaying", error);
        throw new Error("Error Fetching all Posts");
    }
}