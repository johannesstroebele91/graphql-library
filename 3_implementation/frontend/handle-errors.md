# Basics

It is important to handle errors

- because by default the default messages
- are not helpful

# Example with Apollo Hooks `chat/client/src/Chat.js`

The results from the Apollo operation

- can be destructured
- for the error property
- and its value handled accordingly

```javascript
export default function Chat({ user }) {
  const { data, error } = useQuery(messagesQuery);
  ...
  if (error) return <p>Error!</p>;

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

# Example without Apollo Hooks `job-board/client/src/requests.js`

This can be done

- by throwing an error in the graphQLRequest function
- using the `responseBody.errors` property in files e.g. `requests.js`
- as shown in the requests.js file

```javascript
async function graphqlRequest(query, variables = {}) {
  const response = await fetch(endpointURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });
  const responseBody = await response.json();

  if (responseBody.errors) {
    const message = responseBody.errors
      .map((error) => error.message)
      .join("\n");
    throw new Error(message);
  }

  return responseBody.data;
}

export async function loadJob(id) {
  const { job } = await graphqlRequest(QUERY_JOB, { id });
  return job;
}
```
