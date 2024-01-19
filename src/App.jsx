import Dashboard from "./components/Dashboard"
import { Routes, Route } from "react-router-dom"
import MovieDetails from "./components/MovieDetails"
import FavMovies from "./components/FavMovies"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/movie/:id" element={<MovieDetails/>} />
        <Route path="/favMovies" element={<FavMovies/>} />
      </Routes>   
    </>
  )
}

export default App
