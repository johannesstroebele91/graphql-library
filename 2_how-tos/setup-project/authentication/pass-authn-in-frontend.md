# Basics

The http headers

- need to be set dynamically in frontend
- in order to authenticate a request
- if the user is logged in

Therefore, the request.headers needs to be

- conditionally changed
- if the user is logged in
- as shown in `job-board/client/src/requests.js`
- and the logic for isLoggedIn() and getAccessToken() added

```javascript
async function graphqlRequest(query, variables = {}) {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };
  if (isLoggedIn()) {
    request.headers["authorization"] = "Bearer " + getAccessToken();
  }
  // ...
}
```
