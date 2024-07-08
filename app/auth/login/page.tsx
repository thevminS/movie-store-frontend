'use client'

import PopupError from '@/app/_components/PopupError'
import { authenticate } from '@/app/lib/actions'
import Link from 'next/link'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'

function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
            {errorMessage && <PopupError message={errorMessage}/>}
      <div className='w-[400px] p-10 h-[450px] bg-white text-slate-950 rounded-lg flex flex-col'>
        <div className='font-bold text-3xl pb-6 '>Login</div>
        <form action={dispatch} className='flex flex-col space-y-10'>
          <input type="email" name="email" placeholder="Email" required className="border-2 border-gray-950 p-3"/>
          <input type="password" name="password" placeholder="Password" required  className="border-2 border-gray-950 p-3"/>
          <LoginButton/>
        </form>
        <div className='text-center mt-5'>
          <p>Don't have an account? <Link href="/auth/register" className='underline text-green-600'>Register Now</Link></p>
        </div>
      </div>
    </div>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()
 
  const handleClick = (event:any) => {
    if (pending) {
      event.preventDefault()
    }
  }
 
  return (
    <button aria-disabled={pending} type="submit" onClick={handleClick} className='bg-zinc-700 text-slate-200 p-3 font-semibold'>
      Login
    </button>
  )
}

export default LoginPage
