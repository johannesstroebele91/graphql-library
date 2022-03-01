- [1. React Apollo enables to use Apollo Client with React more easily](#1-react-apollo-enables-to-use-apollo-client-with-react-more-easily)
- [2. Setup Apollo Provider to use React Apollo](#2-setup-apollo-provider-to-use-react-apollo)
- [3. Create operation (e.g. query)](#3-create-operation-eg-query)
- [4. Use operation in React component using hook](#4-use-operation-in-react-component-using-hook)
- [5. Optional: Authn, Cache, Fragments](#5-optional-authn-cache-fragments)

# 1. React Apollo enables to use Apollo Client with React more easily

_Ref: https://www.apollographql.com/docs/react/#community-integrations_

Instead of React Apollo,

- the other solution made it possible
- to use Apollo Client with any JS application

React Apollo consists not of one,

- but three different packages
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

# 3. Create operation (e.g. query)

Operations such as

- queries, mutations, or subscriptions
- should be outsource if there are too many

Example: chat-app/client/src/graphql/queries.js

```javascript
export const messagesQuery = gql`
  query MessagesQuery {
    messages {
      id
      from
      text
    }
  }
`;
```

# 4. Use operation in React component using hook

React Apollo is only compatible with functional components!!!

- which is why all class based components
- needs to converted

React component:

- a request can be triggerd using a hook from Apollo Client
- e.g. useQuery, useMutation

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

# 5. Optional: Authn, Cache, Fragments

1.  Authenticate requests using ApolloLink `making-requests/frontend/authentication.md`
2.  Apollo cache `making-requests/frontend/apollo-cache.md`
3.  Fragments for reusing query and mutation code `making-requests/frontend/fragments.md`
