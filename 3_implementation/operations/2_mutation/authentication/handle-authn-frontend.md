- [Basics](#basics)
- [Background](#background)
- [Two approaches to authn (fetch vs useMutation)](#two-approaches-to-authn-fetch-vs-usemutation)
  - [1) Approach: fetch()](#1-approach-fetch)
    - [Setting up Apollo Client](#setting-up-apollo-client)
    - [Using `request.headers` of fetch()](#using-requestheaders-of-fetch)
  - [2) Approach: useMutation()](#2-approach-usemutation)

# Basics

Mutations should only be callable

- when the respective user
- is authorized

# Background

Users are autorized

- by login into the app
- with the "valid" credentials

This is done by

- extracting the email and password from the login request
- checking if these credentials are stored in the database

This is done using http headers, which need to be

- set dynamically in frontend
- in order to authenticate a request
- if the user is logged in

This can lead to two scenarios:

1. reject with a 401 Unauthorized and throws an error
2. accept with an 200 OK and sends back an access token generated with JWT

The decoded JWT payload is

- available on the request via the user property.
- so it can be checked on the user property of the request (req.user)
- if the user is authenticated

# Two approaches to authn (fetch vs useMutation)

Both methods need jwt setup correctly in the backend!!!

## 1) Approach: fetch()

### Setting up Apollo Client

Authentication for a mutation can be added

- by passing parameters to ApolloLink
  - operation: GraphQL query or mutation
  - forward: function to chain multiple steps together
- Important: "authLink" property needs to be stated before "link"!)

The parameters important to the apollo client are:

- "link": to connect to the server entpoint
- "cache": to use in memory cache

Example: `job-board/client/src/requests.js`

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

### Using `request.headers` of fetch()

In the fetch() function

- the request.headers need to be
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

## 2) Approach: useMutation()

_Ref: https://www.apollographql.com/docs/tutorial/mutations/_

The client should

- provide the user's token
- with each GraphQL operation
- it sends to our server

Only the apollo client instance

- needs to be setup correctly
- to define a default set of headers

```javascript
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql",
  headers: {
    authorization: localStorage.getItem("token") || "",
  },
});
```
