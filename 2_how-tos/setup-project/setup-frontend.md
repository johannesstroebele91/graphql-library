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
- [Get data from the server](#get-data-from-the-server)
- [Change data on the serve](#change-data-on-the-serve)

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

# Get data from the server

Requests can be made by

- using the useQuery hook
- which receives a GraphQL query, and
- additional parameters e.g. variables, fetchPolicy, ...
- and returns an object

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

# Change data on the serve

Mutations can be made by

- using the useMutation() hook
- which receives a GraphQL query, and
- additional parameters e.g. variables, fetchPolicy, ...s
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

The result object can return `loading`, `error`, `data`, and `called`:

- loading: show sth to the user as long a mutation is processing
- error: show user an error message if the mutation failed
- data: data that was mutated, which can be undefined
- called:
  - tells if the mutation has been called or not,
  - which is convenient to trigger like redirecting to another screen

Example: `chat/client/src/Chat.js`

````javascript
export default function Chat({ user }) {
  const [addMessage, {loading, error, data, called}] = useMutation(addMessageMutation);
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
}```
````
