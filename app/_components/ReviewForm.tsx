"use client"

import React, { useEffect, useReducer } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { createReview } from '../lib/actions'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';

const cookies = new Cookies(null, { path: '/' });

function ReviewForm({movieId}: any) {
    const router = useRouter();
    const user = cookies.get("user");
    const [errorMessage, dispatch] = useFormState(createReview, undefined);
    console.log({movieId});

    useEffect(()=>{
      if(errorMessage == "logout"){
        router.push("auth/login");
      }else if(errorMessage == "refresh"){
        router.refresh();
      }
    },[errorMessage])

    return (
         <div className='w-full'>
            <div className='w-full text-base font-normal'>
            <form action={dispatch} className='flex flex-col space-y-5'>
                <input type="textarea" name="review" placeholder="Add Your Thoughts" required className="border-1 p-2 ml-1 text-sm text-slate-50 bg-[#afafaf65]"/>
                <input type="number" name="movieId" readOnly hidden value={movieId} className="border-2 border-gray-950 p-3"/>
                <div className='flex justify-end'>
                    <CreateButton/>
                </div>   
            </form>
            </div>
        </div>

    )
}

function CreateButton() {
    const { pending } = useFormStatus()
   
    const handleClick = (event:any) => {
      if (pending) {
        event.preventDefault()
      }
    }
   
    return (
      <button aria-disabled={pending} type="submit" onClick={handleClick} className='bg-slate-700 text-slate-200 p-1 font-semibold w-[100px] rounded-lg text-base mr-6'>
        Create
      </button>
    )
  }

export default ReviewForm
