- [1. Basics](#1-basics)
- [2. Explanation](#2-explanation)
- [3. Why "graph" QL?](#3-why-graph-ql)
- [4. Example](#4-example)

# 1. Basics

GraphQL is a query language which is

- declarative and
- strongly-typed

It does NOT enable to

- query directly a database (PostgreSQL) like with SQL
- but enables to query a web API

# 2. Explanation

GraphQL exposes queries or Mutations

- via a web API
- that can be accessed from the frontend
- via React, GraphiQL, ...

In the frontend a field can be requested

- because it is a field declard in the query type
- and when the server receives the request
- it will map it to the resolver function for the field
- which results in the requested data being returned

So users can make queries

- via the browser (frontend)
- againt a GraphQL server,
- which collects the data for you
- and in turn sends the data back to the React app

# 3. Why "graph" QL?

Is just one "super-charged" enpoint

- where the data is connected in form of a graph
- that are accessed like a waterfall
- so first movie, then director, then movies of the director

# 4. Example

Query message:

```graphql
query {
  message
}
```

Response can be "data" or "error"

```json
{
  "data": {
    "message": "Hello from the GraphQL server!"
  }
}
```
