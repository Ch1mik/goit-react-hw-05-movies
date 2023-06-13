import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieReviews } from "components/API/getMovies";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [showReviews, setShowReviews] = useState(false);
    const { movieId } = useParams();

    const handleShowReviews = async () => {
        try {
            const movieReviews = await getMovieReviews(movieId);
            setReviews(movieReviews.results);
            setShowReviews(true)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Link
                to={`/movies/${movieId}/reviews`}
                onClick={handleShowReviews}
            >Reviews</Link>
            {showReviews && (
                <div>
                    {reviews.length > 0 ? (
                        <ul>
                            {reviews.map(review => (
                                <li key={review.id}>
                                    <p>Author: {review.author}</p>
                                    <p>{review.content}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews available</p>
                    )}
                </div>
            )}
        </>
    );
}

export default Reviews