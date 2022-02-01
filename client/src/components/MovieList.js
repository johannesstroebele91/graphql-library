import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_MOVIES_QUERY } from "../queries/queries";
import MovieDetails from "./MovieDetails";

export default function MovieList() {
  // Bind the query to the MovieList component via useQuery()
  // which is a hook that triggers a rerender the component each time the data updates
  // PS Destructuring the destructured data object can be done with `{}` around movies
  const { loading, data: { movies } = {}, error } = useQuery(GET_MOVIES_QUERY);

  const [selectedMovieId, setSelectedMovieId] = useState(null);
  if (error) return <p>Error while requesting data</p>;

  if (loading) return <p>Data is loading ...</p>;

  const renderMovies = () => {
    return movies.map((movie) => {
      return (
        <div
          key={movie.id}
          onClick={() => setSelectedMovieId(movie.id)}
          style={{
            display: "inline-block",
            minWidth: "240px",
            background: "#FFFFFF",
            borderRadius: "3px",
            padding: "12px",
            margin: "12px",
            cursor: "pointer",
          }}
        >
          <h3>{movie.name}</h3>
        </div>
      );
    });
  };

  return (
    <>
      {renderMovies()}
      <MovieDetails selectedMovieId={selectedMovieId} />
    </>
  );
}
