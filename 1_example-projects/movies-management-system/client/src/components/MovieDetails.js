import { useQuery } from "@apollo/client";
import { GET_MOVIE_QUERY } from "../queries/queries";

export default function MovieDetails(props) {
  const {
    loading,
    data: { movie } = {},
    error,
  } = useQuery(GET_MOVIE_QUERY, {
    variables: { id: props.selectedMovieId },
  });

  if (error) return <p>There is an error for the query ...</p>;
  if (loading) return <p>Data is loading ...</p>;

  return (
    <>
      {movie && (
        <div
          style={{
            minWidth: "240px",
            background: "#FFFFFF",
            borderRadius: "3px",
            padding: "12px",
            margin: "12px",
          }}
        >
          <h3>Selected Movie Details</h3>
          <p>Genre: {movie.genre}</p>
          <p>Director: {movie.director.name}</p>
          <p>All movies by {movie.director.name}:</p>
          <ul>
            {movie.director.movies.map((movie) => (
              <li key={movie.id}>{movie.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
