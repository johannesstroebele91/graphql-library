import { gql } from "@apollo/client";

// Create the query in backticks ``
export const GET_MOVIES_QUERY = gql`
  {
    movies {
      name
      genre
      id
    }
  }
`;

export const GET_DIRECTORS_QUERY = gql`
  {
    directors {
      name
      age
      id
    }
  }
`;
