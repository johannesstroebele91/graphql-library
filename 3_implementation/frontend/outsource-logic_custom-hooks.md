# Outsourcing logic via custom hooks

Custom hooks is

- a function that starts with `use`
- e.g. useChatMessages()

Such hooks enable to

- easily outsourcing code that should not be in a component
  - such as fetching data
  - because components should only displaying data
- and reuse the logic for multiple components

A great addtional advantage to the component is

- that the complicated logic for function calls
  - e.g. `addMessage({ variables: { input: { text } } })`
  - can also be outsourced to the hook
    - component: e.g. `addMessage(text)`
    - custom hook: e.g. `addMessage: (text) => addMessage({ variables: { input: { text } } })`

Example: `chat/client/src/hooks.js`

```javascript
export default function useChatMessages() {
  const { data } = useQuery(messagesQuery);
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
  const [addMessage] = useMutation(addMessageMutation);
  return {
    messages,
    addMessage: (text) => addMessage({ variables: { input: { text } } }),
  };
}
```

Example: `chat/client/src/Chat.js`

```javascript
import useChatMessages from "./hooks";

function useChatMessages() {
  const { data } = useQuery(messagesQuery);
  const messages = data ? data.messages : [];

export default function Chat({ user }) {
  const { messages, addMessage } = useChatMessages();

  async function handleSend(text) {
    await addMessage(text);
  }

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
