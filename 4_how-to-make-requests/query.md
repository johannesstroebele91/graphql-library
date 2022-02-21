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
