# 1. Backend

## 1.1. Schema `job-board/server/schema.graphql`:

```graphql
type Mutation {
  createJob(companyId: ID, title: String, description: String): Job
}

type Job {
  id: ID!
  title: String
  company: Company
  description: String
}
```

## 1.2. Resolver

```javascript
const Mutation = {
  createJob: (root, { companyId, title, description }) => {
    const id = db.jobs.create({ companyId, title, description });
    return db.jobs.get(id);
  },
};
```

# 2. Frontend

## 2.1. Write mutation `job-board/client/src/requests.js`

```javascript
export const MUTATION_CREATE_JOB = `mutation CreateJob(
  $companyId: ID
  $title: String
  $description: String
  ){
    job: createJob(
      companyId: $companyId
      title: $title
      description: $description
    ) {
     title
  }
}`;
```

## 2.3. Write request in React component using mutation `job-board/client/src/components/JobForm.js`

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
