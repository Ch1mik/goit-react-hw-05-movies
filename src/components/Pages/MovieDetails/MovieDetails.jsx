import Reviews from "./Reviews/Reviews"
import Cast from "./Cast/Cast"
import { useState, useEffect, Suspense } from 'react';
import { getMovieDetails } from "components/API/getMovies"; 
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import ListMoviesDetails from "./ListMoviesDetails";

export default function MoviesDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const location = useLocation();
  const backLink = location?.state?.from ?? '/';

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
      <Link to={backLink}>Go back</Link>
      {movie && <ListMoviesDetails genres={genres} movie={movie} />}
      <section>
        <h3>Additional information</h3>
        <div >
          <Reviews />
          <Cast />
        </div>
      </section>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
}