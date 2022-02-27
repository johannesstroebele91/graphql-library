- [1. Basics](#1-basics)
- [2. How it works via WebSockets](#2-how-it-works-via-websockets)
  - [2.1. When not to use](#21-when-not-to-use)
  - [2.2. When to use](#22-when-to-use)
- [2. Backend](#2-backend)
  - [2.1. Schema](#21-schema)
  - [2.2. Enable WebSockets for Apollo Server](#22-enable-websockets-for-apollo-server)
  - [2.3. Resolvers](#23-resolvers)
  - [2.4. Testing with GraphQL playground](#24-testing-with-graphql-playground)
- [3. Frontend](#3-frontend)
  - [3.1. requests.js](#31-requestsjs)
  - [3.2. React component](#32-react-component)

# 1. Basics

Like queries,

- subscriptions enable to
- fetch data from a server

Unlike queries,

- subscriptions are long-lasting operations
- that can change their result over time

This is because a query is a one-time operation where

- you send one request and
- you receive one response back

In contrast, with a subscription

- you send one request but
- might receive multiple responses

# 2. How it works via WebSockets

Subscriptions can maintain

- an active connection to your GraphQL server
- enabling the server to push updates
- to the subscription's result

Clients need to communicate with the server

- NOT via the http protocal
- but WebSocket

WebSockts make it possible to

- open a two-way interactive communication session
- bweteeen the client and the server

This API enables to

- send messages to a server
- and receive and event-driven response
- (so not a periodic polling required)

## 2.1. When not to use

Subscriptions can be used for

- notifying your client in real time
- about changes to back-end data,
- such as the creation of a new object
- or updates to an important field

HOWEVER, th following methods should be used

- to stay up to date with your backend
- because they are less costly than subscriptions:
  - periodic polling with queries,
  - re-execute queries on demand (e.g. button click)

## 2.2. When to use

Repeatedly polling for

- small, incremental changes to large objects is expensive
- when most of its fields rarely change
- Instead fetch the object's initial state with a query AND
- AN the server can proactively push updates to individual fields

Low-latency, real-time updates,

- such as chat application's client
- where the user wants to receive new messages
- as soon as they're available

# 2. Backend

## 2.1. Schema

A subscribtion is added by

- adding a field (naming convention that describing an event)
- with a return type

```graphql
type Subscription {
  messageAdded: Message
}

type Message {
  id: ID!
  from: String
  text: String
}
```

## 2.2. Enable WebSockets for Apollo Server

Explicitly create a http server instance

- which enables to tell the apollo server
- to install subscription handler on the http server
- PS by default express creates an http server,
  - but it cannot be modified
  - which is why an http server instance is created manually

```javascript
const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => console.log(`Server started on port ${port}`));
```

## 2.3. Resolvers

Instead of just one value returned for queries, a subscription

- needs to be able to return multiple values
- which is made possible by the asyncIterator() from PubSub

```javascript
const { PubSub } = require("graphql-subscriptions");

// Create an instance for publish and subscribe
const pubSub = new PubSub();
const MESSAGE_ADDED = "MESSAGE_ADDED";

const Subscription = {
  messageAdded: {
    subscribe: () => pubSub.asyncIterator(MESSAGE_ADDED),
  },
};
```

The clients that have subscribed

- need to be notified
- that a new entry was created

The name needs to match

- the name of the subscription
- e.g. messageAdded

Both the `pubSub.publish()` and `pubSub.asyncIterator()` function

- need to use the same type
- which is why it is outsourced
- e.g. MESSAGE_ADDED

```javascript
const Mutation = {
  addMessage: (_root, { input }, { userId }) => {
    requireAuth(userId);
    const messageId = db.messages.create({ from: userId, text: input.text });

    // notify clients that have subscribed that a new entry was created
    const message = db.messages.get(messageId);
    pubSub.publish(MESSAGE_ADDED, { messageAdded: message });

    // save data to the database
    return message;
  },
};
```

## 2.4. Testing with GraphQL playground

```graphql
subscription {
  messageAdded {
    id
    from
    text
  }
}
```

This shows that multiple responses can be send via subscription

```javascript
// 12 secs ago
{
  "data": {
    "messageAdded": {
      "id": "HkKsJrYe9",
      "from": "bob",
      "text": "hi there"
    }
  }
}
// 0 sec ago
{
  "data": {
    "messageAdded": {
      "id": "HyB3yHFxq",
      "from": "bob",
      "text": "asd"
    }
  }
}
```

# 3. Frontend

## 3.1. requests.js

```javascript
subscription {
  messageAdded {
    id
    from
    text
  }
}

```

## 3.2. React component

```javascript

```
