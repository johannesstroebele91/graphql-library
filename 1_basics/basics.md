- [1. Rest](#1-rest)
- [2. GraphQL](#2-graphql)
- [3. Detailed explanation](#3-detailed-explanation)
- [4. Why "graph" QL?](#4-why-graph-ql)
- [5. Example](#5-example)

# 1. Rest

REST enables to

- make queries or request to web APIs it via e.g. an React app
- which enbables to retrieve certain data
- to display e.g. display movies and directors from a database

Examples for enpoint could be:

- Getting a particular movie: e.g. domain.com/movies/:id
- Getting a the director of a movie: e.g. domain.com/directory/:id

# 2. GraphQL

GraphQL is a query language which is

- declarative and
- strongly-typed

It does NOT enable to

- query directly a database (PostgreSQL) like with SQL
- but enables to query a web API

# 3. Detailed explanation

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

# 4. Why "graph" QL?

Is just one "super-charged" enpoint

- where the data is connected in form of a graph
- that are accessed like a waterfall
- so first movie, then director, then movies of the director

Example of a GraphQL request:

```
{
    movie(id: 1) {
        name
        gernre
        director {
            name
            age
            movies{
                name
            }
        }
    }
}
```

# 5. Example

Query:

```
query {
    message
}
```

Response:

can be "data" or "error"

```
{
  "data": {
    "message": "Hello from the GraphQL server!"
  }
}
```
