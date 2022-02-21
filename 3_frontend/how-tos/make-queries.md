- [Basics](#basics)
- [1. Examples using Apollo Client hooks `movies-management-system/client/src/components/MovieDetails.js`](#1-examples-using-apollo-client-hooks-movies-management-systemclientsrccomponentsmoviedetailsjs)
- [2. Examples using Vanilla JS fetch() function](#2-examples-using-vanilla-js-fetch-function)
- [2.1. Request movies `movies-management-system/client/src/queries/queries.js`](#21-request-movies-movies-management-systemclientsrcqueriesqueriesjs)
- [2.2. Request a single using variables `movies-management-system/client/src/queries/queries.js`](#22-request-a-single-using-variables-movies-management-systemclientsrcqueriesqueriesjs)
- [2.3. Request a single movie hardcoded (no example)](#23-request-a-single-movie-hardcoded-no-example)

# Basics

GraphQL enables to

- requests all documents (e.g. movies)
- only one document hardcoded (e.g. movie)
- only one document using a variable (e.g. movie)

# 1. Examples using Apollo Client hooks `movies-management-system/client/src/components/MovieDetails.js`

useQuery hook for requesting data

```javascript
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
        <div>
          <h3>Selected Movie Details</h3>
          <p>Genre: {movie.genre}</p>
          <p>Director: {movie.director.name}</p>
        </div>
      )}
    </>
  );
}
```

useMutation for changing data

# 2. Examples using Vanilla JS fetch() function

# 2.1. Request movies `movies-management-system/client/src/queries/queries.js`

```graphql
{
  movies {
    name
    genre
    director {
      name
    }
  }
}
```

Response

```json
{
  "data": {
    "movies": [
      {
        "name": "Joker",
        "genre": "Drama",
        "director": {
          "name": "Philips"
        }
      },
      {
        "name": "La La land",
        "genre": "Musical",
        "director": {
          "name": "Anderson"
        }
      }
    ]
  }
}
```

# 2.2. Request a single using variables `movies-management-system/client/src/queries/queries.js`

```graphql
query JobQuery($id: ID!) {
  job(id: $id) {
    id
    title
  }
}
```

Response

```json
{
  "data": {
    "job": {
      "id": "trefdcvxse",
      "title": "Full Stack Developer"
    }
  }
}
```

# 2.3. Request a single movie hardcoded (no example)

```graphql
{
  movie(id: 1) {
    name
    genre
    director {
      name
    }
  }
}
```

Response

```json
{
  "data": {
    "movie": {
      "name": "Joker",
      "genre": "Drama",
      "director": {
        "name": "Philips"
      }
    }
  }
}
```
