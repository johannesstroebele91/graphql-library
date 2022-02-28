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

Setup with React hooks

12. Use React Apollo to make it easier to use Apollo Client with React
13. Setup Apollo Provider to use React Apollo
14. Ensure that only it is an functional component
15. migrating to apollo client 3.0

**Further explanations for the steps are provided below**

- [5. Apollo Client (Cache)](#5-apollo-client-cache)
- [7. Request `job-board/client/src/requests.js`](#7-request-job-boardclientsrcrequestsjs)
- [8. React component `job-board/client/src/components/JobBoard.js`](#8-react-component-job-boardclientsrccomponentsjobboardjs)
- [12. Use React Apollo to make it easier to use Apollo Client with React](#12-use-react-apollo-to-make-it-easier-to-use-apollo-client-with-react)
- [13. Setup Apollo Provider to use React Apollo](#13-setup-apollo-provider-to-use-react-apollo)
- [14. Ensure that only it is an functional componnt](#14-ensure-that-only-it-is-an-functional-componnt)
- [15. migrating to apollo client 3.0](#15-migrating-to-apollo-client-30)

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

# 12. Use React Apollo to make it easier to use Apollo Client with React

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

# 13. Setup Apollo Provider to use React Apollo

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

# 14. Ensure that only it is an functional componnt

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

# 15. migrating to apollo client 3.0

There are not many new changes,

- just that practically all packages from apollo for the client
- are now available via `@apollo/client` and its subfolders

A few examples:

- `import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core';` // NOT `apollo-boost`
- `import { WebSocketLink } from '@apollo/client/link/w';` // NOT `apollo-link-ws`
- `import { useQuery, useMutation, useSubscription } from '@apollo/client';` // NOT `@apollo/react-hooks`

The fully upgraded code for the last two apps can be found on this GitHub page:

- Chat app: https://github.com/uptoskill/graphql-chat/commit/037e2cc2510315c6ab50572cb1433c2c3d219e18
- Job Board: https://github.com/uptoskill/graphql-job-board/commit/e5a9b597583fff29c885a42c049a83ed2e1186c0
