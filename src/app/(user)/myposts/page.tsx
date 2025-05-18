import React from 'react'
import PostsDisplay from './_components/PostsDisplay';
import { getAllUserPosts } from '../../../../actions/posts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

async function page() {
  const user = await getServerSession(authOptions)
  console.log(user);
  if(!user) throw new Error("Error Fetching User");
  const userId = user?.user?.id;
  const userPosts = await getAllUserPosts(user.user.id);
  
  return (
    <div className='p-8 justify-center flex'>
      <PostsDisplay posts={userPosts} userId={userId}/>
    </div>
  )
}

export default page
