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
  // PS Destructuring the destructured data object can be done with `{}` around movies
  const { loading, data: { movies } = {}, error } = useQuery(GET_MOVIES_QUERY);

  if (error) return <p>Error while requesting data</p>;

  if (loading) return <p>Data is loading ...</p>;

  const renderMovies = () => {
    return movies.map((movie) => {
      return (
        <div
          key={movie.id}
          style={{
            display: "inline-block",
            minWidth: "300px",
            background: "#FFFFFF",
            borderRadius: "6px",
            padding: "6px",
            margin: "6px",
          }}
        >
          <h3>{movie.name}</h3>
          <p>{movie.genre}</p>
        </div>
      );
    });
  };

  return <>{renderMovies()}</>;
}
