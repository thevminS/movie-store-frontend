'use client';

import Link from 'next/link';
import React, { useState } from 'react'


function MovieWidget({movie}: any) {
    const {id,name,description,rating,coverImageLink} = movie;

  const [isMouseEntered, setIsMouseEntered] = useState<boolean>(false);

  const tailwindClasses = isMouseEntered ? "border-8 border-[#a51717] rounded-sm relative h-[386px]":"border-8 border-white rounded-sm relative h-[386px]"

  return(
    <>
      <div className='w-[260px]'>
        <Link href={`/movies/${id}`}>
            <div className={tailwindClasses} onMouseEnter={() => setIsMouseEntered(true)} onMouseLeave={() => setIsMouseEntered(false)}>
            <img src={coverImageLink}
                alt={name}
                width="260"
            />
            { isMouseEntered &&
                <div className='w-[244px] absolute left-0 top-0 h-full bg-[#000000c4] z-10 flex-col realtive'>
                <div className='w-full font-bold text-center text-5xl p-[20px]'>
                    {rating}
                </div>
                <div className='max-h-[200px] h-[200px] text-wrap overflow-hidden font-semibold pl-5 pr-5 text-[#6e6e6e]'>
                    {description}
                </div>
                <div className='text-center font-bold text-2xl pt-3'>
                    Read More
                </div>
                </div>
            }
            </div>
        </Link>
        <div className='text-white font-bold text-2xl pt-4'>
          {name}
        </div>

      </div>
    </>
  )
}

export default MovieWidget
