# basics

Network tab shows that each query consists of:

- Headers
- Request
- Response

In summary,

- the client is POSTing some JSON
- and the server sends some JSON back

## Headers

- Request URL:
  - is the URL where the GraphQL server is running
  - http://localhost:XXXX/graphql
- Method:
  - due to GraphQL always POST requests are made
  - although you only want to get that data like with REST
  - this is because the client POSTs data to the server
  - this becomes more clearly in the Request Payload
- Content-type: application/json due to POST requests

## Request

- shows the stringified query
- `{"operationName": null, "variables": {}, "query": "{\n greeting\n}\n"}`

## Response

- Statuscode: 200 OK -> request was successful
- Content-Type: application/json
- Body:
  - JSON Object which is the retrieved data
  - `{ "data": { "message": "Hello from the GraphQL server!" } }`

# Example

1. Start app
2. In the browser visit http://localhost:XXXX/graphql
3. Open the network tools
4. Send a query or mutation
5. Open up GraphQL Network tab (GraphQL Network Inspector) OR normal network tab

**Request**

```
query{message}
```

**Response**

```graphql
{
  "data": {
    "message": "Hello from the GraphQL server!"
  }
}
```
