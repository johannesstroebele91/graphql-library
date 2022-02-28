# Relevance

If no authentication is present

- anybody can start a subscription
- using the graphql playground
- because no authentication headers are passed
- PS http headers would not work with WebSockets

# Authentication via Apollo Client

The authentication information

- cannot be send via HTTP header
- but are passed via connectionParams of the WebSocketLink,
- which can contain any property, such as the accessToken
- PS will eventualle be send as the payload object

Example: `chat/client/src/graphql/client.js`

```javascript
...
const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
    lazy: true,
    reconnect: true,
    connectionParams: { accessToken: getAccessToken() },
  },
});
...
```

# Fixing accessToken being null before login

This solution leads to the problem

- that the accessToken might be null
- because the WebSocketLink is created
- as soon as the application is loaded
  - so it only works if the user was already logged in
  - NOT if the user needs is logged out when the application is loaded

The solution is to

- call the getAccessToken()
- not as soon as the application is loaded
- but only when the connection starts
- by turning the connectionParams into function
- that returns an object

Example: `chat/client/src/graphql/client.js`

```javascript
...
const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
    lazy: true,
    reconnect: true,
    connectionParams: () => ({ accessToken: getAccessToken() }),
  },
});
...
```
