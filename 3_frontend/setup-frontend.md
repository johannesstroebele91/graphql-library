# How to setup

1. Create client folder
2. Setup initial React project `npx create-react-app client --use-npm`
3. Setup code for React app (see client folder)
4. Install Apollo client `npm i @apollo/client`
5. Setup apollo client see example below
6. For writing queries or mutations, see `make-queries.md`

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
