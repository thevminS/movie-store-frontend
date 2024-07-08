import SearchMovie from "./SearchMovie";

type MovieWidgetDetails = {
    id: number,
    name: string,
    description: string,
    rating: string,
    coverImageLink: string
}

export default async function Home({movieList} : any) {
    // const movieList = await getMovies();
  
    
    console.log(movieList);
    return (
      <div>
        <div className='flex flex-col space-y-6 pl-20 pr-20'>
        <div className='flex w-full justify-between'>
          <div className='text-4xl font-semibold'>
            Movies
          </div>
          <div>
            <SearchMovie/>
          </div>
          
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
  
  function MovieWidget({movie}: any){
    const {id,name,description,rating,coverImageLink} = movie;
    return(
      <>
        <div className='w-[260px]'>
          <div className='border-8 border-white rounded-sm relative h-[386px]'>
            <img src={coverImageLink}
              alt={name}
              width="260"
            />
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
          </div>
          <div className='text-white font-bold text-2xl pt-4'>
            {name}
          </div>
  
        </div>
      </>
    )
  }