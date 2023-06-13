import { getTrendingMovies } from "components/API/getMovies"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";
// import { Link } from "../../SharedLayout.styled";

const Home = () => { 
    const [movies, setMovies] = useState([]);
    const location = useLocation();
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const trendingMovies = await getTrendingMovies();
                setMovies(trendingMovies.results)
            } catch (error) {
                console.log(error);
            }
        };
        fetchMovies()
    }, []);
    return ( 
        <>
            <h1>Tranding today</h1>
            <ul>
                {movies.map(el => (
                    <li key={el.id}>
                        <Link state={{
                                from: location.pathname,
                                search: null,
                        }}
                            to={`/movies/${el.id}`}>
                            {el.title || el.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Home