# How to setup

1. Create client folder
2. Install react `npx create-react-app client --use-npm`
3. Setup code for React app e.g. `chat/job-board/`
4. Install apollo client library `npm i @apollo/client`
   - For older versions of Apollo Client (`npm install apollo-boost`)
   - migrate to 3.0 that were installed via `explanation below`
5. Setup an apollo client instance via `explanation below`
6. Install graphql package to pharse queries `npm install graphql`
7. Setup GraphQL queries `chat-app/client/src/graphql/queries.js`
8. Optional: setup WebSockets for subscriptions via `explanation below`
9. Write requests via `making requests with or without hooks`

# Detailed explanation

5. Setup an apollo client instance

```javascript
const httpUrl = "http://localhost:9000/graphql";

const httpLink = ApolloLink.from([
  new ApolloLink((operation, forward) => {
    const token = getAccessToken();
    if (token) {
      operation.setContext({ headers: { authorization: `Bearer ${token}` } });
    }
    return forward(operation);
  }),
  new HttpLink({ uri: httpUrl }),
]);

// By default, fetchPolicy would use the cache, which is better!
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
  defaultOptions: { query: { fetchPolicy: "no-cache" } },
});

export default client;
```

4. Setup or migrate to Apollo Client 3.0

Install the new version `npm i @apollo/client` which leads to

- not many new changes,
- just that practically all packages from apollo for the client
- are now available via `@apollo/client` and its subfolders

Examples:

- `import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core';` // NOT `apollo-boost`
- `import { WebSocketLink } from '@apollo/client/link/w';` // NOT `apollo-link-ws`
- `import { useQuery, useMutation, useSubscription } from '@apollo/client';` // NOT `@apollo/react-hooks`

The fully upgraded code

- for the two apps
- can be found as follows:
  - Chat app: https://github.com/uptoskill/graphql-chat/commit/037e2cc2510315c6ab50572cb1433c2c3d219e18
  - Job Board: https://github.com/uptoskill/graphql-job-board/commit/e5a9b597583fff29c885a42c049a83ed2e1186c0

# 8. setup WebSockets for subscriptions

## 8.1. Install necessary packages

- `npm install apollo-link-ws`
- `npm install subscription-transport-ws`
- `npm i graphql`

## 8.2. Prepare WebSocketLink for Apollo Client

Create a new WebSocketLink

- by define a valid WebSockets uri
- with not http but ws as the protocol
- PS lazy: so the subscription is not triggered always when starting the app
- PS reconnect: reconnects if subscription aborts by accident

Example `chat/client/src/graphql/client.js`

```javascript
const httpUrl = "http://localhost:9000/graphql";
const wsUrl = "ws://localhost:9000/graphql";

const httpLink = ApolloLink.from([
  new ApolloLink((operation, forward) => {
    const token = getAccessToken();
    if (token) {
      operation.setContext({ headers: { authorization: `Bearer ${token}` } });
    }
    return forward(operation);
  }),
  new HttpLink({ uri: httpUrl }),
]);

const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: { lazy: true, reconnect: true },
});
```

## 8.2. Use WebSocketLink in Apollo Client

Example `chat/client/src/graphql/client.js`

The split function enables to

- use a link conditionally
- leveraging a function `isSubscription`

The function isSubscription return `true`

- which means the wsLink for the subscription is used
- in case the definiton operation is a subscription

```javascript
function isSubscription(operation) {
  const definition = getMainDefinition(operation.query);
  return (
    definition.kind === "OperationDefinition" &&
    definition.operation === "subscription"
  );
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: split(isSubscription, wsLink, httpLink),
  defaultOptions: { query: { fetchPolicy: "no-cache" } },
});
```
