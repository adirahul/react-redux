import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { StarIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToFav } from '../feature/movieDB/movieDBSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MovieDetails = () => {
  const {id} = useParams();
  const [product, setProduct] = useState({});
  const favs = useSelector(state => state.favs);
  const dispatch = useDispatch();
  const getSingleMovieData = async() => {
    try {
      // e.preventDefault();
      const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=1344e062639dff0545ba31f3c5040030`);
      setProduct(data);
    } catch (error) {
      console.log('Error in getting product', error);
    }
  }
  useEffect(() => {
    getSingleMovieData();
  }, [id]);
  
  const favhandler = () => {
    dispatch(addToFav(id));
    localStorage.setItem("favArray", JSON.stringify(favs));
    
    // toast("Default Notification !");

    toast.success("Movie added to favourites !", {
      position: toast.POSITION.TOP_CENTER
    });
  } 
  return (
    <>
      <div className="bg-white">
      <div className="pt-6">
        

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={`https://image.tmdb.org/t/p/w500`+ product.poster_path}
              alt={product.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500`+ product.poster_path}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500`+ product.poster_path}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={`https://image.tmdb.org/t/p/w500`+ product.poster_path}
              alt={product.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-1 lg:grid-rows-[auto,auto,3fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
         
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="text-3xl tracking-tight text-gray-900">{product.original_title}</p>
            {/* Reviews */}
            <div className="mt-6">
              <h3 >Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        Math.floor(product.vote_average / 2) > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{Math.floor(product.vote_average / 2)} out of 5 stars</p>
               
              </div>
            </div>

              <div className='mt-10'>
                <h3 className="text-sm font-medium text-gray-900">Genres</h3>

                {product.genres ? (
                  product.genres.map((item) => (
                    <span key={item.id} className="inline-flex items-center mr-2 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {item.name}
                    </span>
                  ))
                ) : (
                  <span>Loading genres...</span>
                )}
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.overview}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Production Companies</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.production_companies?.map((t) => (
                    <li key={t.id} className="text-gray-400">
                      <span className="text-gray-600">{t.name}</span>
                      <span ml-3>
                        <img 
                        src={`https://image.tmdb.org/t/p/w185`+ t.logo_path} 
                        alt={t.name} 
                        style={{ width: '90px', height: '25px' }} 
                        />
                        </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Revenue:</h2>

              <span>
                <p className="text-sm text-gray-600">{product.revenue}</p>
              </span>
            </div>
            </div>
          </div>
          {/* <button className='bg-blue-500 px-4 py-2 text-white rounded-md'>Add to watchlist</button>
          <h2 className="text-sm font-medium text-gray-900">Add review</h2> */}
        </div>
      </div>
      
          <div className="px-20">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={favhandler}
            >
              Add To Favourite
            </button>
          </div>
          <ToastContainer autoClose={2000}/>
          <div className="mt-6 px-20">
            <h3 className='mb-3 '>Add Your Review</h3>
            <textarea className='border border-gray-600 rounded-md p-2'  placeholder='Add your review here...'  cols="60" rows="8"></textarea>
          </div>
    </div>
    </>
  )
}

export default MovieDetails