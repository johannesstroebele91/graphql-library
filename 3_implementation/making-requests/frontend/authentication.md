TODO

# Basics

It is important to

- hide the GraphQL API from the outside
- to probibit unautorized users
- from adding jobs without login

# How Login Works

Users are autorized

- by login into the app
- with the "valid" credentials

This is done by during the login process by

- extracting the email and password from the login request
- checking if these credentials are stored in the database

This can lead to two scenarios:

1. reject with a 401 Unauthorized and throws an error
2. accept with an 200 OK and sends back an access token generated with JWT

The decoded JWT payload is

- available on the request via the user property.
- so it can be checked on the user property of the request (req.user)
- if the user is authenticated

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
