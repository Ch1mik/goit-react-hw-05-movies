import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getMovieCredits } from "components/API/getMovies";

const Cast = () => {
     const [cast, setCast] = useState([]);
     const { movieId } = useParams();
     const [showCast, setShowCast] = useState(false);

     const handleShowCast = async () => {
          try {
               const movieCast = await getMovieCredits(movieId);
               setCast(movieCast.cast);
               setShowCast(true);
          } catch (error) {
               console.log(error);
          }
     }
     return (
          <>
               <Link
                    to={`/movies/${movieId}/cast`}
                    onClick={handleShowCast}
               >Cast
               </Link>
               <div>
                    {showCast && (
                         <div>
                              {cast.length > 0 ? (<ul>
                                   {cast.map(person => person.profile_path && (
                                        <li key={person.id}>
                                             <img
                                                  src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                                                  alt={person.name}
                                             />
                                             <div>
                                                  <p>{person.name}</p>
                                                  <p>Character: {person.character}</p>
                                             </div>
                                        </li>
                                   )
                                   )}
                              </ul>) : (
                                   <p>No cast information available</p>
                              )}
                         </div>
                    )}
               </div>
          </>
     );
};

export default Cast