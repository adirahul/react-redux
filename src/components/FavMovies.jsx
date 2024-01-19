import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import ShortenPara from './ShortenPara';
import axios from 'axios';
const FavMovies = () => {
    const [favMovies, setFavMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const sfavs = localStorage.getItem('favArray');
          const favs = JSON.parse(sfavs);
          const favIds = favs.map((f) => f.id);
    
          // Use Promise.all to wait for all requests to complete
          const moviePromises = favIds.map(async (favId) => {
            const { data } = await axios.get(
              `https://api.themoviedb.org/3/movie/${favId}?api_key=1344e062639dff0545ba31f3c5040030`
            );
            return data;
          });
    
          // Wait for all promises to resolve
          const moviesData = await Promise.all(moviePromises);
    
          // Update state after all requests are complete
          setFavMovies(moviesData);
        };
    
        fetchData();    
    }, []);
  return (
    <>
        <div className="bg-black text-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h3 className="text-2xl font-bold tracking-tight text-white-900">
            Favourite Movies
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {favMovies.map((movie) => (
              <div key={movie.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={
                      `https://image.tmdb.org/t/p/w185` + movie.poster_path
                    }
                    alt={movie.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <NavLink to={`/movie/${movie.id}`}>
                    <div>
                      <h3 className="text-base text-gray">
                        <a>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {movie.original_title}
                        </a>
                      </h3>
                      <ShortenPara para={movie.overview} wordLimit={40} />
                    </div>
                  </NavLink>
                  <p className="text-sm font-medium text-gray-600">
                    {movie.release_date}
                  </p>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>
    </>
  )
}

export default FavMovies