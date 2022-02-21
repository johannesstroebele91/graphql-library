TODO: fix later

# 1. Backend

## 1.1.

## 1.2.

# 2. Frontend

## 2.1. React component via useQuery hook `movies-management-system/client/src/components/MovieDetails.js`

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

## 2.2.
