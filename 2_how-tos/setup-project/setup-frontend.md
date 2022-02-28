**How to setup**

1. Create client folder
2. Install react for the project `npx create-react-app client --use-npm`
3. Setup code for React app (see client folder)
4. Install apollo client library and a few related modules `npm install apollo-boost`
5. Setup an apollo client instance `job-board/client/src/requests.js`
6. Install graphql package pharse queries `npm install graphql`
7. Define requests using e.g. fetch() or Apollo hooks
8. Call the requests from the React components
9. Authenticate requests using ApolloLink `authentication/authn-in-frontend.md`
10. Optionally use Apollo cache `job-board/client/src/requests.js`
11. Use fragments for reusing query and mutation code

**Further explanations for the steps are provided below**

- [5. Apollo Client (Cache)](#5-apollo-client-cache)
- [7. Request `job-board/client/src/requests.js`](#7-request-job-boardclientsrcrequestsjs)
- [8. React component `job-board/client/src/components/JobBoard.js`](#8-react-component-job-boardclientsrccomponentsjobboardjs)
- [Use React Apollo to make it easier to use Apollo Client with React](#use-react-apollo-to-make-it-easier-to-use-apollo-client-with-react)
- [Setup Apollo Provider to use React Apollo](#setup-apollo-provider-to-use-react-apollo)
- [Ensure that only it is an functional componnt](#ensure-that-only-it-is-an-functional-componnt)
- [Query: Get data from the server](#query-get-data-from-the-server)
- [Mutation: Change data on the serve](#mutation-change-data-on-the-serve)
- [Subscription: Get array of data from the server based on events](#subscription-get-array-of-data-from-the-server-based-on-events)
  - [1. For simply displaying the lastest data](#1-for-simply-displaying-the-lastest-data)
  - [2. For working with all data](#2-for-working-with-all-data)
    - [2.1. Local state management](#21-local-state-management)
    - [2.2. onCompleted paramter](#22-oncompleted-paramter)
- [Outsourcing logic via custom hooks](#outsourcing-logic-via-custom-hooks)

# 5. Apollo Client (Cache)

Enables to

- fetch, modify, and cache application data,
- all while automatically updating your UI

The cache enables to

- avoid making unecessary same requests
- and reuse early made requests
- HOWEVER it is not perfect!!!
- Edge cases needs to be handled through client.query(): `job-board/client/src/requests.js`
  1.  fetchPolicy (e.g. "no-cache")
  2.  update, which is called after a mutation

Example without hooks `job-board/client/src/requests.js`:

```javascript
const client = new ApolloClient({
  uri: endpointURL,
  cache: new InMemoryCache({}),
});
```

# 7. Request `job-board/client/src/requests.js`

More information is provided in `making-requests/basics.md`

"gql" enables to convert the query string

- into a structured object (into query document)
- that can be understoof by Apollo Client `job-board/client/src/queries.js`

```javascript
export const QUERY_JOBS = gql`
  {
    jobs {
      id
      title
      company {
        id
        name
        description
      }
      description
    }
  }
`;

const endpointURL = "http://localhost:9000/graphql";

export async function loadJobs() {
  const {
    data: { jobs },
  } = await client.query({ query: QUERY_JOBS, fetchPolicy: "no-cache" }); // more easy syntax: `data` an then `data.jobs`
  return jobs;
}
```

# 8. React component `job-board/client/src/components/JobBoard.js`

```javascript
export function JobBoard() {
  const [jobs, setJobs] = useState([]);

  //  load data from the server
  useEffect(() => {
    // A async function needs to be created to call loadJobs,
    // because useEffect cannot be made async!!!
    const fetchJobs = async () => {
      const fetchedJobs = await loadJobs();
      setJobs(fetchedJobs);
    };
    fetchJobs();
  }, [setJobs]);

  if (!jobs) {
    return <p>Data is loading...</p>;
  }

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}
```

# Use React Apollo to make it easier to use Apollo Client with React

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

# Setup Apollo Provider to use React Apollo

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

# Ensure that only it is an functional componnt

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

# Query: Get data from the server

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

# Mutation: Change data on the serve

Mutations can be made by

- using the useMutation() hook
- which receives a GraphQL query, and
- additional parameters e.g. variables, fetchPolicy, ...
- and returns
  1. an `array of objects` with a function that let's you trigger if called
  2. an result object with properties like loading,

This mutation function

- can then be called, and
- the necessary data passed
- via variables object of the parameters
- It is important that
  - the function does not need to return anything
  - but only needs to be called
  - to change the data

The returned data of the mutatation

- can be handled in multiple ways

1. Giving back the complete results object
   - and handling everything case by case
2. Destructuring the result object (e.g. loading, error, data, and called)

- `loading`: show sth to the user as long a mutation is processing
- `error`: show user an error message if the mutation failed
- `data`: data that was mutated, which can be undefined
- `called`:
  - tells if the mutation has been called or not,
  - which is convenient to trigger like redirecting to another screen

Example: `chat/client/src/Chat.js`

```javascript
export default function Chat({ user }) {
  const [addMessage, { loading, error, data, called }] =
    useMutation(addMessageMutation);

  async function handleSend(text) {
    await addMessage({ variables: { input: text } });
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

# Subscription: Get array of data from the server based on events

Subscriptions can be made by

- using the useSubscription() hook
- which receives a GraphQL query, AND
- additional parameters e.g. onSubscriptionData, variables, fetchPolicy,

Important, the useSubscription() hook

- needs to be placed AFTER the useQuery() hook
- because you only want to subscribe to messages
- that were added after the ones that were gotten from the query

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
