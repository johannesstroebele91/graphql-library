# Basics

It is possible to start a subscription

- even in a user is not authenticated via the server
- which is a major security issue
- which is why the subscription should be protected

Normally, for queries you would

- just get access to the context
- and check via function if the necessary userId is present

However, this context from the server

- e.g. `chat/server/server.js` via expressJwt()
- uses an HTTP header
- which is of course not accessible for WebSockets

The token that is passed

- in the WebSocket connection
- needs to be extracted in other via

# HowTo

One solution is

- to pass an additional connection parameter
- to the context funcion

Then check for a valid connection via

- `connection`
- `connection.context`
- `connection.context.accessToken`

Afterwards, verfiy via the `jsonwebtoken` package

- if there is an access token, and
- return the id from the decoded token
- using the `.sub` property

Example `chat/server/server.js`

```javascript
function context({ req, connection }) {
  if (req && req.user) {
    return { userId: req.user.sub };
  }
  if (connection && connection.context && connection.context.accessToken) {
    const decodedToken = jwt.verify(connection.context.accessToken, jwtSecret);
    return { userId: decodedToken.sub };
  }
  return {};
}
```
