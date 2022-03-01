import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ADD_MOVIE_MUTATION, GET_DIRECTORS_QUERY, GET_MOVIES_QUERY } from "../queries/queries";

export default function AddMovie() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [directorId, setDirectorId] = useState("");

  // Bind the query to the AddMovie component via useQuery()
  // which is a hook that triggers a rerender the component each time the data updates
  const { loading, data: { directors } = {}, error } = useQuery(GET_DIRECTORS_QUERY);

  const [addMovie] = useMutation(ADD_MOVIE_MUTATION);

  const handleSubmit = (event) => {
    // Normal refresh behaviour needs to be prevented
    event.preventDefault();

    // Executes the mutation based on
    // the update the state
    // which is again based on the values that were inputed into the form fields
    // PS `name: name` can be written as `name`
    // PS refetchQueries enables to refetch the changed movies
    addMovie({ variables: { name, genre, directorId }, refetchQueries: [{ query: GET_MOVIES_QUERY }] });
  };

  const renderDirectors = () => {
    if (loading) return <option disabled> Data is loading ...</option>;
    if (error) return <option disabled>Something went wrong</option>;
    return (
      <>
        {directors.map((director) => {
          return (
            <option key={director.id} value={director.id}>
              {director.name}
            </option>
          );
        })}
      </>
    );
  };

  return (
    <form
      className="offset-md-9 offset-sm-6 col-sm-6 col-md-3 bg-white p-3 fixed-bottom"
      id="add-movie"
      onSubmit={handleSubmit}
      style={{
        background: "#FFFFFF",
        borderRadius: "3px",
        padding: "12px",
        margin: "12px",
      }}
    >
      <h3>Add movie</h3>
      <div className="form-group">
        <label htmlFor="movie-name">Movie Name:</label>
        <input className="form-control mt-1" id="movie-name" name="movie-name" type="text" onChange={(event) => setName(event.target.value)} />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="genre">Genre:</label>
        <input className="form-control mt-1" id="genre" name="genre" type="text" onChange={(event) => setGenre(event.target.value)} />
      </div>
      <div className="d-flex flex-column mt-2">
        <label htmlFor="director"> Director: </label>
        <select className="custom-select py-2" id="director" name="director" onChange={(event) => setDirectorId(event.target.value)}>
          <option>Select a Director</option>
          {renderDirectors()}
        </select>
      </div>
      <div className="d-flex form-group mt-3 justify-content-center">
        <button className="btn btn-primary px-4" type="submit">
          Add New Movie
        </button>
      </div>
    </form>
  );
}
