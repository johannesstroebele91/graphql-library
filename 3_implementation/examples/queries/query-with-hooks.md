# Basics

Get data from the server

Queries can be made by

- using the useQuery hook
- which receives a GraphQL query, and
- additional parameters e.g. variables, fetchPolicy, onCompleted...
- and returns an object that can be destructured to get
  - `loading`
  - `error`
  - `data`

It is important that with useSubscription

- the returned data property
- can be handled more efficiently by
- using the `onCompleted` parameter
- as shown in the subscription example below

Example: `chat/client/src/Chat.js`

```javascript
export default function Chat({ user }) {
  const { loading, error, data } = useQuery(messagesQuery, {
    variables: { id: someId },
    fetchPolicy,
  });
  // create messges object if data is defiend or initialize empty
  const messages = data ? data.messages : [];

  if (loading) return <p>Data is loading... </p>;
  if (error) return <p>Error!</p>;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
      </div>
    </section>
  );
}
```
