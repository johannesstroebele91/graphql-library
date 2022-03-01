- [1. Schema](#1-schema)
- [2. Enable WebSockets for Apollo Server](#2-enable-websockets-for-apollo-server)
- [3. Add Subscription for resolvers](#3-add-subscription-for-resolvers)
- [4. Handle trigger subscription via mutation](#4-handle-trigger-subscription-via-mutation)
- [5. Testing with GraphQL playground](#5-testing-with-graphql-playground)

# 1. Schema

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

# 2. Enable WebSockets for Apollo Server

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

# 3. Add Subscription for resolvers

Instead of just one value returned for queries, a subscription

- needs to be able to return multiple values
- which is made possible by the asyncIterator() from PubSub

Example: `chat-app/server/resolvers.js`

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

# 4. Handle trigger subscription via mutation

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

Example: `chat-app/server/resolvers.js`

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

# 5. Testing with GraphQL playground

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
