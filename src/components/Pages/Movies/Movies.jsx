import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { searchMoviesByKeyWord } from "components/API/getMovies";
// import { Link } from "../../SharedLayout.styled";

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      const searchQuery = new URLSearchParams(location.search).get("query");
      if (searchQuery) {
        try {
          const response = await searchMoviesByKeyWord(searchQuery);
          setSearchResult(response.results);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchSearchResults();
  }, [location.search]);

  const handleSearchSubmit = e => {
    e.preventDefault();
    navigate(`/movie?query=${searchQuery}`);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResult.map(movie => (
          <li key={movie.id}>
            <Link
              state={{
                from: location.pathname,
                search: location.search,
              }}
              to={`/movies/${movie.id}`}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
