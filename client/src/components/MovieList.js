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
  const { loading, data: movies, error } = useQuery(GET_MOVIES_QUERY);
  console.log(movies);
  return (
    <ul>
      <li>Movie List</li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
}
