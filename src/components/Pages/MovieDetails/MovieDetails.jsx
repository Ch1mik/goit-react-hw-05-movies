import Reviews from "./Reviews/Reviews"
import Cast from "./Cast/Cast"
import { useState, useEffect, Suspense } from 'react';
import { getMovieDetails } from "components/API/getMovies"; 
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import ListMoviesDetails from "./ListMoviesDetails";

export default function MoviesDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      try {
        const movieDetails = await getMovieDetails(movieId);
        setMovie(movieDetails);
        setGenres(movieDetails.genres);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [movieId]);

  return (
    <>
      {loading && <h3>Loading movies....</h3>}
      <button onClick={() => {navigate(-1)}}>Go back</button>
      {movie && <ListMoviesDetails genres={genres} movie={movie} />}
      <section>
        <h3>Additional information</h3>
        <ul >
          <li><Reviews /></li>
          <li><Cast /></li>
        </ul>
      </section>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
}