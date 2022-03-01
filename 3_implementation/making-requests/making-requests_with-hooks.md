- [1. Use React Apollo to make it easier to use Apollo Client with React](#1-use-react-apollo-to-make-it-easier-to-use-apollo-client-with-react)
- [2. Setup Apollo Provider to use React Apollo](#2-setup-apollo-provider-to-use-react-apollo)
- [3. Ensure that only it is an functional componnt](#3-ensure-that-only-it-is-an-functional-componnt)

# 1. Use React Apollo to make it easier to use Apollo Client with React

_Ref: https://www.apollographql.com/docs/react/#community-integrations_

Instead of React Apollo,

- the other solution made it possible
- to use Apollo Client with any JS application

React Apollo consists not of one, but three different packages

- because the approach changed dramatically
- since it was first introducted with higher-order-components

The packages are:

- react hooks (newest version):
  - just a function call (e.g. useQuery, useMutation, useSubscription)
  - variables `loading, error, and data` can be destructured directly
- react components (medium-old version):
  - provides a GraphQL component called "Query"
  - that is used in the jsx code
  - and provide parameters `loading, error, and data`
- reaxt hoc (higher-order-components) (oldest version):
  - uses a function graphql() to
  - call the query and
  - pass it into the component

# 2. Setup Apollo Provider to use React Apollo

The Apollo Provider

- needs to be installed via `npm i @apollo/react-hooks`, and
- setup in the top-level component of the app

It is important that hooks won't work directly

- in the top-level component of the app
- but ONLY in sub-components!!!

This is done by

- wrapping everyting of the return statement
- and passing the props `client` to `ApolloProvider`
- which makes the Apollo Client instance
- accessible to all underlying React components

It is important to state that

- this implies that no hooks can be used
- in the Login component
- because it is outside of ApolloProvider
- However, this is fine due to login does not make requests

Example `chat/client/src/App.js`:

```javascript
class App extends Component {
  ...
  render() {
    const { user } = this.state;
    if (!user) {
      return <Login onLogin={this.handleLogin.bind(this)} />;
    }
    return (
      <ApolloProvider client={client}>
        <NavBar onLogout={this.handleLogout.bind(this)} />
        <Chat user={user} />
      </ApolloProvider>
    );
  }
}
```

# 3. Ensure that only it is an functional componnt

First all class based components

- needs to be translated into
- functional components
- because they are the only ones
- compatible with React hook

```javascript
export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);

  async function handleSend(text) {
    const message = { id: text, from: "you", text };
    setMessages(messages.concat(message));
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
