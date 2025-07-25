import React from 'react'
import DashPosts from './_components/DashPosts';
import { getAllPosts } from '../../../../actions/posts';


export const dynamic = "force-dynamic";


async function page() {
  const posts = await getAllPosts();
  return (
    <div>
      <DashPosts posts={posts}/>
    </div>
  )
}

export default page
