const ListMoviesDetails = ({ genres, movie }) => {
    const { original_title, vote_average, overview, poster_path } = movie;
  return (
    <section>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={original_title}
        />
      </div>
      <div>
        <h2>{original_title}</h2>
        <p>User Score: {Math.round(vote_average * 10)}%</p>
        {movie && (
          <div>
            <h3>Genres</h3>
            <ul>
              {genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h3>Overview</h3>
          <p>{overview}</p>
        </div>
      </div>
    </section>
  );
};

export default ListMoviesDetails;
