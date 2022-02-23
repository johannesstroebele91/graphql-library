# Basics

The http headers

- need to be set dynamically in frontend
- in order to authenticate a request
- if the user is logged in

# Example using Apollo Client

Authentication for a mutation can be added

- by passing parameters to ApolloLink
  - operation: GraphQL query or mutation
  - forward: function to chain multiple steps together
- Important: "authLink" property needs to be stated before "link"!)

The parameters important to the apollo client are:

- "link": to connect to the server entpoint
- "cache": to use in memory cache

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

# Example without Apollo Client (fetch() function)

The request.headers need to be

- conditionally changed
- if the user is logged in
- as shown in `job-board/client/src/requests.js`
- and the logic for isLoggedIn() and getAccessToken() added

```javascript
async function graphqlRequest(query, variables = {}) {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };
  if (isLoggedIn()) {
    request.headers["authorization"] = "Bearer " + getAccessToken();
  }
  // ...
}
```
