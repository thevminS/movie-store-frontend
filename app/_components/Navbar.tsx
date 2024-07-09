'use client';


import Link from 'next/link'
import React from 'react'
import { logout } from '../lib/actions';

function Navbar() {

  return (
    <nav className='flex flex-row justify-between top-0 left-0 w-full h-16 bg-[#a51717] text-slate-300 text-lg font-bold mb-6 pt-4 pl-20 pr-20'>
        <div>
          <Link href="/">Home</Link>
        </div>
        <div className='flex gap-10'>

          <Link href="/user">User</Link>
          <div onClick={()=>{logout();}} className='cursor-pointer' role='link'>Logout</div>
        </div>
          
    </nav>
  )
}

export default Navbar
