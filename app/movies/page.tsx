"use client";

import { BACKEND_API_URL } from '@/config';
import Home from '../_components/Home';
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
      
      console.log(" -----At Movies------");
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
          {/* <div>
             <SearchMovie/>
           </div> */}
        
        </div>

       <div className='flex flex-row space-x-20'>
          {
          movieList?.map((movie:MovieWidgetDetails, id: number)=>(
            <MovieWidget key={id} movie={movie}/>
          ))
        }
      </div>
    </div>
    </div>
  );
}

// import SearchMovie from '@/app/_components/SearchMovie';
// import { BACKEND_API_URL } from '@/config';
// import { getCookie, setCookie } from 'cookies-next';
// import { cookies } from 'next/headers';


// type MovieWidgetDetails = {
//   id: number,
//   name: string,
//   description: string,
//   rating: string,
//   coverImageLink: string
// }

// async function getMovies(){
//   const token = getCookie("token",{cookies});
//   // console.log(token);

//   const response = await fetch(`${BACKEND_API_URL}/movies`,
//     { 
//       cache: 'no-store',
//       headers : {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       } 
//     }
//   )
//   if(response.status == 302){
//     const data = response.json();
//     console.log(response);
//     console.log("object")
//     return data as MovieWidgetDetails[];
//   }

  
// }

// export default async function Home() {
//   const movieList = await getMovies();

  
//   console.log(movieList);
//   return (
//     <div>
//       <div className='flex flex-col space-y-6 pl-20 pr-20'>
//       <div className='flex w-full justify-between'>
//         <div className='text-4xl font-semibold'>
//           Movies
//         </div>
//         <div>
//           <SearchMovie/>
//         </div>
        
//       </div>

//       <div className='flex flex-row space-x-20'>
//         {
//           movieList?.map((movie:MovieWidgetDetails, id: number)=>(
//             <MovieWidget key={id} movie={movie}/>
//           ))
//         }
//       </div>
//     </div>
//     </div>
    
//   );
// }

// function MovieWidget({movie}: any){
//   const {id,name,description,rating,coverImageLink} = movie;
//   return(
//     <>
//       <div className='w-[260px]'>
//         <div className='border-8 border-white rounded-sm relative h-[386px]'>
//           <img src={coverImageLink}
//             alt={name}
//             width="260"
//           />
//           <div className='w-[244px] absolute left-0 top-0 h-full bg-[#000000c4] z-10 flex-col realtive'>
//             <div className='w-full font-bold text-center text-5xl p-[20px]'>
//               {rating}
//             </div>
//             <div className='max-h-[200px] h-[200px] text-wrap overflow-hidden font-semibold pl-5 pr-5 text-[#6e6e6e]'>
//               {description}
//             </div>
//             <div className='text-center font-bold text-2xl pt-3'>
//                 Read More
//             </div>
//           </div>
//         </div>
//         <div className='text-white font-bold text-2xl pt-4'>
//           {name}
//         </div>

//       </div>
//     </>
//   )
// }







