- [1. Write subscription](#1-write-subscription)
- [2. Think abt how the subscription should be used](#2-think-abt-how-the-subscription-should-be-used)
- [3. Write request that uses query](#3-write-request-that-uses-query)
- [4. Handle that the subscription is also stopped at some point](#4-handle-that-the-subscription-is-also-stopped-at-some-point)

_For explanation how to setup WebSockets, look into the `setup-frontend` file_

# 1. Write subscription

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

# 2. Think abt how the subscription should be used

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

# 3. Write request that uses query

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

```javascript
export async function onMessageAdded(handleMessage) {
  const observable = client.subscribe({ query: messageAddSubscription });
  observable.subscribe(({ data }) => handleMessage(data.messageAdded));
}
```

# 4. Handle that the subscription is also stopped at some point

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
