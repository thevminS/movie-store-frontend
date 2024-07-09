"use client";

import { BACKEND_API_URL } from '@/config';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import MovieWidget from '../_components/MovieWidget';
import { validateAuthToken } from '../_utils/forntEndRefresh';
import { useRouter } from 'next/navigation';

const cookies = new Cookies(null, { path: '/' });

type MovieWidgetDetails = {
  id: number,
  name: string,
  description: string,
  rating: string,
  coverImageLink: string
}

export default function HomeConstainer() {

  const router = useRouter()
  const [movieList,setMovieList] = useState<MovieWidgetDetails[] | null>(null);

  useEffect(()=>{
    
    const fetchMovieDetails = async() => {
      const res = await validateAuthToken();
      if(!res){
        router.push("/auth/login");
      }
      const token = cookies.get("token");
      
      const response = await fetch(`${BACKEND_API_URL}/movies`,{ 
          cache: 'no-store',
          headers : {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          } 
        }
      )
      if(response.status == 302){
        const data = await response.json();
        console.log(response);
        setMovieList(data);
      }
    }

    fetchMovieDetails().catch(error => {
      console.error('Error fetching movie details:', error);
    });

  },[]);

  useEffect(()=>{
    console.log(movieList);
  },[movieList])

  return (
    <div>
         <div className='flex flex-col space-y-6 pl-20 pr-20'>
          <div className='flex w-full justify-between'>
          <div className='text-4xl font-semibold'>
             Movies
           </div>
        
        </div>

       <div className='flex flex-row space-x-20'>
          {
          movieList?.map((movie:MovieWidgetDetails)=>(
            <MovieWidget key={movie.id} movie={movie}/>
          ))
        }
      </div>
    </div>
    </div>
  );
}






