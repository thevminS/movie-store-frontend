'use client'

import PopupError from '@/app/_components/PopupError'
import { register } from '@/app/lib/actions'
import Link from 'next/link'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'

function RegisterPage() {

  const [errorMessage, dispatch] = useFormState(register, undefined)

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      {errorMessage && <PopupError message={errorMessage}/>}
      <div className='w-[500px] p-10 bg-white text-slate-950 rounded-lg flex flex-col'>
        <div className='font-bold text-3xl pb-6'>Register</div>
        <form action={dispatch} className='flex flex-col space-y-10'>
          <input type="text" name="name" placeholder="Name" required className="border-2 border-gray-950 p-3"/>
          <input type="email" name="email" placeholder="Email" required className="border-2 border-gray-950 p-3"/>
          <input type="password" name="password" placeholder="Password" required  className="border-2 border-gray-950 p-3"/>
          <input type="text" name="profileImageUrl" placeholder="Image URL" className="border-2 border-gray-950 p-3"/>
          <RegisterButton/>
        </form>
        <div className='text-center mt-5'>
          <p>Already have an account? <Link href="/auth/login" className='underline text-green-600'>Login</Link></p>
        </div>
       
      </div>
    </div>
  )
}

function RegisterButton() {
  const { pending } = useFormStatus()
 
  const handleClick = (event:any) => {
    if (pending) {
      event.preventDefault()
    }
  }
 
  return (
    <button aria-disabled={pending} type="submit" onClick={handleClick} className='bg-zinc-700 text-slate-200 p-3 font-semibold'>
      Register
    </button>
  )
}

export default RegisterPage;
