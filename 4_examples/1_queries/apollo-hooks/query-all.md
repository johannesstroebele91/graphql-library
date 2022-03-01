# 1. Backend

## 1.1. Schema `job-board/server/schema.graphql`

Defines how endpoint for query will look like

```graphql
type Query {
  jobs: [Job]
}

type Job {
  id: ID!
  title: String
  company: Company
  description: String
}

type Company {
  id: ID!
  name: String
  description: String
  jobs: [Job]
}
```

## 1.2. Resolvers `job-board/server/resolvers.js`

The query object

- includes the handler
- for all possible queries

It handels

- how the data is processed (e.g. from the MongoDB)
- as specified in the schema

Missing nested objects

- can be populated
- via resolver objects
- e.g. Job constant
  - poluates company field
  - for Job type
  - based on the specified GraphQL schema

```javascript
const db = require("./db");

const Query = {
  getJobs: () => db.jobs.list(),
};

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

module.exports = { Query, Job };
```

# 2. Frontend

## 2.2. write query `chat-app/client/src/graphql/queries.js`

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

## 2.2. Use query for request `chat/client/src/Chat.js`

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
