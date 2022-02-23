# How to setup

1. Create client folder
2. Install react for the project `npx create-react-app client --use-npm`
3. Setup code for React app (see client folder)
4. Install Apollo client `npm i @apollo/client`
5. Setup apollo client see example below
6. For writing queries or mutations, see `make-queries.md`
7. Install apollo client library and a few related modules `npm install apollo-boost`
8. Install graphql package for the frontend to prase queries (GraphQL request over HTTP) `npm install graphql`
9. Create an apollo client instance
   - Example: `job-board/client/src/requests.js`
   - parameters: link to connect to the server entpoint, cache to use in memory cache
10. Adapt requests for the client object (e.g. `job-board/client/src/requests.js`)
11. Convert the query from a string into a structured object that can be understoof by Apollo Client using gql (e.g. `job-board/client/src/queries.js`)

# Example setup apollo client for React `movies-management-system/client/src/App.js`:

```javascript
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <h1 style={{ textAlign: "center" }}>Movies Watch List</h1>
      <MovieList />
      <AddMovie />
    </ApolloProvider>
  );
}
```
