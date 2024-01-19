import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ShortenPara from "./ShortenPara";
import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const getProductsFromTMDBapi = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=1344e062639dff0545ba31f3c5040030`
    );
    setProducts(data.results);
  };

  useEffect(() => {
    getProductsFromTMDBapi();
  }, []);
  return (
    <>
      <h1 className="bg-black font-bold text-center pt-10 text-4xl text-white">
        Movie DB
      </h1>
      <p className="bg-black pl-16">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <NavLink to={`/favMovies`}>
            Favourite Movies
          </NavLink>
        </button>
      </p>
      <div className="bg-black text-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h3 className="text-2xl font-bold tracking-tight text-white-900">
            List of moives
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={
                      `https://image.tmdb.org/t/p/w185` + product.poster_path
                    }
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <NavLink to={`/movie/${product.id}`}>
                    <div>
                      <h3 className="text-base text-gray">
                        <a>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.original_title}
                        </a>
                      </h3>
                      <ShortenPara para={product.overview} wordLimit={40} />
                    </div>
                  </NavLink>
                  <p className="text-sm font-medium text-gray-600">
                    {product.release_date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      
      </div>
    </>
  );
};

export default Dashboard;
