# Basics

It is important to handle errors

- because by default the default messages
- are not helpful

# HowTo

This can be done

- by throwing an error in the graphQLRequest function
- using the `responseBody.errors` property in files e.g. `requests.js`
- as shown in the requests.js file

# Example Requests `job-board/client/src/requests.js`

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
