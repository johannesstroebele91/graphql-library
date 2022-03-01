- [1. Backend](#1-backend)
  - [1.1. Schema](#11-schema)
  - [1.2. Enable WebSockets for Apollo Server](#12-enable-websockets-for-apollo-server)
  - [1.3. Resolvers](#13-resolvers)
  - [1.4. Testing with GraphQL playground](#14-testing-with-graphql-playground)
- [2. Frontend](#2-frontend)
  - [2.1. Install necessary packages](#21-install-necessary-packages)
  - [Enhance Apollo Client to work with WebSockets](#enhance-apollo-client-to-work-with-websockets)
  - [2.1. Write query for subscription](#21-write-query-for-subscription)
  - [2.2. Add call of subscription in React component](#22-add-call-of-subscription-in-react-component)
  - [2.3. Write request that uses query](#23-write-request-that-uses-query)
  - [2.4. Handle that the subscription is also stopped at some point](#24-handle-that-the-subscription-is-also-stopped-at-some-point)

# 1. Backend

## 1.1. Schema

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

## 1.2. Enable WebSockets for Apollo Server

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

## 1.3. Resolvers

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

## 1.4. Testing with GraphQL playground

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

# 2. Frontend

## 2.1. Install necessary packages

- `npm install apollo-link-ws`
- `npm install subscription-transport-ws`
- `npm i graphql`

## Enhance Apollo Client to work with WebSockets

Add support for web sockets to the client

Example `chat/client/src/graphql/client.js`:

Create a new WebSocketLink

- by define a valid WebSockets uri
- with not http but ws as the protocol
- PS lazy: so the subscription is not triggered always when starting the app
- PS reconnect: reconnects if subscription aborts by accident

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

## 2.1. Write query for subscription

Example: `chat/client/src/graphql/queries.js`

```javascript
const messageAddSubscription = gql`
  subscription {
    messageAdded {
      id
      from
      text
    }
  }
`;
```

## 2.2. Add call of subscription in React component

First think about

- how the subscription should be used
- in the Rect component

In this case it is

- when the data is gotten from the server
- for the first time
- in e.g. useEffect() or componentDidMount() function

Example: `chat/client/src/Chat.js`

```javascript
class Chat extends Component {
  state = { messages: [] };

  async componentDidMount() {
    const messages = await getMessages();
    this.setState({ messages });
    onMessageAdded((message) => {
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }
  ...
}
```

## 2.3. Write request that uses query

Based on how the subscription

- is used in the React component
- the actual request needs to be defined

Start the subscription by

- calling the client.subscribe()
- which returns an obserable which multiple fields
  - in this case, only the `data` field of the result is used
  - the field `messageAdded` has the subfield `messageAdded`
  - due to the name `messageAdded` of the subscription shown above

The `handleMessage()` callback comes from

- is the passed function parameter
- of the onMessageAdded call in the React component

-

```javascript
export async function onMessageAdded(handleMessage) {
  const observable = client.subscribe({ query: messageAddSubscription });
  observable.subscribe(({ data }) => handleMessage(data.messageAdded));
}
```

## 2.4. Handle that the subscription is also stopped at some point

Frist return the observable instead of just executing it

Example: `chat/client/src/graphql/queries.js`

```javascript
export async function onMessageAdded(handleMessage) {
  const observable = client.subscribe({ query: messageAddSubscription });
  return observable.subscribe(({ data }) => handleMessage(data.messageAdded));
}
```

Then handle the cancelation of a unecessary subscription

- so in case the user ends the session via an e.g. log out
- by creating a reference to the active subscription and
- canceling it in the `componentWillUnmount()`
- if the subscription is inactive

Example: `chat/client/src/Chat.js`

```javascript
class Chat extends Component {
  state = { messages: [] };
  subscription = null;

  async componentDidMount() {
    const messages = await getMessages();
    this.setState({ messages });
    this.subscription = onMessageAdded((message) => {
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }
  // Is executed if a user e.g. logs out
  componentWillUnmount() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  ...
}
```
