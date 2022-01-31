import { gql, useQuery } from "@apollo/client";
import React from "react";

// Create the query in backticks ``
const GET_MOVIES_QUERY = gql`
  {
    movies {
      name
      genre
      id
    }
  }
`;

export default function MovieList() {
  // Bind the query to the MovieList component via useQuery()
  // which is a hook that triggers a rerender the component each time the data updates
  const { loading, data, error } = useQuery(GET_MOVIES_QUERY);

  if (error) return <p>Error while requesting data</p>;

  if (loading) return <p>Data is loading ...</p>;

  const renderMovies = () => {
    return data.movies.map((movie) => {
      return (
        <div key={movie.id}>
          <h3>{movie.name}</h3>
          <p>{movie.genre}</p>
        </div>
      );
    });
  };

  return <>{renderMovies()}</>;
}
