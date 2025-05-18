"use client";
import React from 'react'
import { ModeToggle } from './Toggle-Theme';
import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { signOut } from 'next-auth/react';


const Header = () => {
  return (
    <div className='p-3 flex justify-between'>
      <div className='flex flex-row'>
        <div className="avatar">
          <div className="w-8 bg-white rounded-full">
            <Link href={"/dashboard"}>
              <Image width={80} height={80} src={"/blog-icon.png"} alt='no' />
            </Link>
          </div>
        </div>
        <p className='pl-2 pt-1 text-xl font-semibold'>Voxa</p>
      </div>
      <div className='flex gap-2'>
        <Link href={"/dashboard"}>
          <div className="
              text-center 
              border border-gray-800
              rounded-3xl 
              transition-colors bg-transparent duration-300 
              hover:bg-white hover:text-black 
              dark:hover:bg-neutral-900 dark:hover:text-white
            "
          >
            <p className='px-3 py-1'>Home</p>
          </div>
        </Link>
        <Link href={"/myposts"}>
          <div className="
              text-center 
              border border-gray-800 
              rounded-3xl 
               duration-300 
              hover:bg-white hover:text-black 
              dark:hover:bg-neutral-900 dark:hover:text-white
            "
          >
            <p className='px-3 py-1'>My Posts</p>
          </div>
        </Link>
      </div>
      <div className='flex justify-center gap-3'>
        <div className='pt-1 '>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar> 
            </DropdownMenuTrigger>            
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div onClick={()=> signOut()}>Sign Out</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
        <ModeToggle />
      </div>
      
    </div>
  )
}

export default Header
