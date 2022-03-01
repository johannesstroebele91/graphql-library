import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import AddMovie from "./components/AddMovie";
import MovieList from "./components/MovieList";

// Setup Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql", // endpoint for requests
  cache: new InMemoryCache(), // used for caching query results
});

function App() {
  return (
    // ApolloProvider with the client property
    // enables to get the data from the GraphQL endpoint
    // and inject the received data to all components that are children of the ApolloProvider wrapper
    // by dynamically injecting the data via `client={client}`
    <ApolloProvider client={client}>
      <h1 style={{ textAlign: "center" }}>Movies Watch List</h1>
      <MovieList />
      <AddMovie />
    </ApolloProvider>
  );
}

export default App;
