- [Basics](#basics)
- [Multiple ways](#multiple-ways)
  - [1. For simply displaying the lastest data](#1-for-simply-displaying-the-lastest-data)
  - [2. For working with all data](#2-for-working-with-all-data)
    - [2.1. Local state management](#21-local-state-management)
    - [2.2. onCompleted paramter](#22-oncompleted-paramter)

# Basics

Get array of data from the server based on events

Subscriptions can be made by

- using the useSubscription() hook
- which receives a GraphQL query, AND
- additional parameters e.g. onSubscriptionData, variables, fetchPolicy,

Important, the useSubscription() hook

- needs to be placed AFTER the useQuery() hook
- because you only want to subscribe to messages
- that were added after the ones that were gotten from the query

# Multiple ways

The returned data of the subscription can be handled in multiple ways like with mutations:

## 1. For simply displaying the lastest data

- the result object can be used like with useQuery()
- so by destructuring the `loading`, `error`, `data` property
- WARNING!!! the data object
  - only displays the latest data
  - received from the subscription
  - e.g. `const messages = data ? [data.messageAdded] . [];`

## 2. For working with all data

The onSubscriptionData parameter can be used

- to append the new created value
- to the existing array of messages
- and can use again two different methods
- to make it work:

### 2.1. Local state management

Apollo client makes it easier

- compared to the `onCompleted paramter` method below,
- to use useQuery for initially loading data

Apollo client has a cache which enables

- NOT ONLY to stores the results of queries
  - instead of re-requesting data
  - over and over againand
- BUT ALSO all the data of different react components
  - so writing every kind of data into the cach

This can be done by

1. using the desctured `data` from useQuery like before, and
2. replacing the existing object
   - with a new updated one in the apollo cache by
   - using second parameter `client` of the `onSubscriptionData` property
   - which can then be used via `cache.writeData()`
   - to replace the message object with a new one
   - that includes the addtional message
   - which leads to a rerender
   - and the useQuery returning the updated messages object via data

It is important to understand that

- using this method useQuery can now responds
- to each local udpate of the cache
- BUT is triggered by a rerender of the application

Another advantage is

- that this updated data
- can be also used in another component
- because it is now available accross components
- via this approach
- and each component will receive the updates automatically

Example: `chat/client/src/Chat.js`

```javascript
export default function Chat({ user }) {
  const { data, loading, error } = useQuery(messagesQuery);
  const messages = data ? data.messages : [];

  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      client.writeData({
        data: {
          messages: messages.concat(subscriptionData.data.messageAdded),
        },
      });
    },
  });
  ...
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
}
```

### 2.2. onCompleted paramter

Another way is to use

- the onCompleted parameter of the useQuery hook
- which is a more naive "inefficient" way

Example: `chat/client/src/Chat.js`

```javascript
export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);

  useQuery(messagesQuery, {
    onCompleted: (data) => setMessages(data.messages),
  });

  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({ subscriptionData }) => {
      setMessages(messages.concat(subscriptionData.data.messageAdded));
    },
  });

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
}
```
