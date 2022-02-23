# # 1. Backend

## 1.1. Schema

For the subscriptions

- in type Subscription
- use a name that describes an event!!!

```graphql
type Subscription {
  messageAdded: Message
}

type Message {
  id: ID!
  from: String
  text: String
}

input MessageInput {
  text: String
}
```

## 1.2. Enable WebSockets for Apollo Server

Explicitly create a http server instance

- instead by letting it be created implicitly by express app
- which enables to tell the apollo server
- to install subscription handler on the http server

```javascript
const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => console.log(`Server started on port ${port}`));
```

## 1.3. Resolvers

```javascript

```

# 2. Frontend

## 2.1. requests.js

```javascript
subscription {
  messageAdded {
    id
    from
    text
  }
}

```

## 2.2. React component

```javascript

```
