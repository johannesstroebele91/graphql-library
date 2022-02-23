# How to setup

1. Create client folder
2. Install react for the project `npx create-react-app client --use-npm`
3. Setup code for React app (see client folder)
4. Install Apollo client `npm i @apollo/client`
5. Setup apollo client see example below
6. For writing queries or mutations, see `make-queries.md`
7. Install apollo client library and a few related modules `npm install apollo-boost`
8. Install graphql package for the frontend to prase queries (GraphQL request over HTTP) `npm install graphql`
9. Create an apollo client instance with the functions: `job-board/client/src/requests.js`
   1. "link" parameter: to connect to the server entpoint
   2. "cache" parameter: to use in memory cache
10. Adapt requests for the client object `job-board/client/src/requests.js`
11. Convert the query from a string into a structured object that can be understoof by Apollo Client using gql `job-board/client/src/queries.js`
12. Authenticate requests using ApolloLink `job-board/client/src/requests.js`
13. Handle Apollo cache edge cases through client.query() these parameters: `job-board/client/src/requests.js`
    1. fetchPolicy (e.g. "no-cache")
    2. update, which is called after a mutation

# Example setup apollo client without hooks `job-board/client/src/requests.js`:

```javascript
const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    operation.setContext({
      headers: { authorization: "Bearer " + getAccessToken() },
    });
  }

  return forward(operation);
});
const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: endpointURL })]),
  cache: new InMemoryCache({}),
});
```
