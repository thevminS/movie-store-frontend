"use client"

import ReviewForm from '@/app/_components/ReviewForm';
import { validateAuthToken } from '@/app/_utils/forntEndRefresh';
import { getYouTubeId } from '@/app/_utils/utils';
import { BACKEND_API_URL } from '@/config';
import { YouTubeEmbed } from '@next/third-parties/google';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';

type MovieDetails = {
    id: number,
    name: string,
    description: string,
    rating: string,
    director: string,
    language: string,
    releaseDate: string,
    coverImageLink: string,
    tailorLink: string,
    reviews: Review[]

}

type Review = {
    id : number,
    review: string,
    owner: {
        id: number,
        name: string,
        profileImageUrl: string,
    }
}

const cookies = new Cookies(null, { path: '/' });


function MoviePage({params}: any) {
    const router = useRouter();

    const [movieDetails,setMovieDetails] = useState<MovieDetails | null>(null);
    const youtubeId = getYouTubeId(movieDetails?.tailorLink || "") || "";
    const movieId = params.id;

    useEffect(()=>{
    
        const fetchMovieDetails = async() => {
            const res = await validateAuthToken();
            if(!res){
                router.push("/auth/login");
            }
            // console.log(" -----At Movies------");
            const token = cookies.get("token");
            
            const response = await fetch(`${BACKEND_API_URL}/movies/${movieId}`,{ 
                cache: 'no-store',
                headers : {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                } 
                }
            )
            if(response.status == 302){
                const data = await response.json();
                // console.log();
                setMovieDetails(data as MovieDetails);
            }
        }
    
        fetchMovieDetails().catch(error => {
          console.error('Error fetching movie details:', error);
        });
    
    },[]);

    useEffect(()=>{
        console.log("useEffect",movieDetails)
    },[movieDetails])

    return (
        <div className=' w-full h-full overflow-hidden pb-10 pl-20 pr-20 flex pt-5 font-semibold text-lg'>
            <div className='w-2/3 overflow-auto h-[80vh] gap-y-10 flex flex-col pr-10'>
                <div className='font-bold text-5xl'>
                    {movieDetails?.name}
                </div>
                <div>
                    {movieDetails?.description}
                </div>
                <hr/>
                <div className='font-bold text-2xl'>
                    Reviews
                    <div className='mt-4'>
                        <ReviewForm movieId={movieId}/>
                    </div>
                    <ReviewList movieDetails = {movieDetails}/>
                </div>
                 
            </div>
            <div className='w-1/3 m-10 h-full border-4 border-solid border-gray-300 rounded-md p-5'>
                <div className='flex space-x-3'>
                    <div className=''>
                        Tailor : 
                    </div>
                    <YouTubeEmbed videoid={youtubeId} width={400} />
                </div>
                <TopicAndDataContainer topic="Release Date :" value={movieDetails?.releaseDate}/>
                <TopicAndDataContainer topic="Director :" value={movieDetails?.director}/>
                <TopicAndDataContainer topic="Language :" value={movieDetails?.language}/>
                <TopicAndDataContainer topic="Rating :" value={movieDetails?.rating}/>
            </div>
        </div>
    )
}

export default MoviePage;

const TopicAndDataContainer = ({topic, value}: any) => {
    return(
        <div className='flex space-x-3 mt-5'>
            <div>
                {topic} 
            </div>
            <div className='font-normal'>
                {value}
            </div>
        </div>
    );
}

const ReviewList = ({movieDetails}: any) => {
    return(
        <div className='mt-3'>
            {movieDetails && movieDetails.reviews?.map((review: Review)=>(
                <div key={review.id} className='p-[10px]'>
                    <div className='text-sm font-light'>

                        {`"${review.review}"`}
                    </div>
                    <div className='text-sm font-normal pt-1'>
                        <div>
                            {`-- ${review.owner.name}`}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}




// async function getMovie(id:number){
//     const authorization =await getMyHeader();

//     const response = await fetch(`${BACKEND_API_URL}/movies/${id}`,
//       { 
//         cache: 'no-store',
//         headers : {authorization} 
//     }
//     )
//     const data = await response.json();
//     console.log(data)
//     return data as MovieDetails;
    
//   }
