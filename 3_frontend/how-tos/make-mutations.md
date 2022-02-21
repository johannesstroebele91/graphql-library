- [Basics](#basics)
- [Tipps](#tipps)
- [1) Request without args](#1-request-without-args)
- [2) Request with args](#2-request-with-args)

# Basics

Allow to change (e.g. add, delete, and edit)

- the data in the database
- via an request

# Tipps

- Return type NEEDS to be always specified!!!
  `mutation { createJob(..) {companyId } }`
- By default the response name would be "createJob", use alias like job to fix this
  `mutation { job:createJob(companyId: "SJVO-wdOM", ...) {title ... } }`
- Properties can be made not skipable by adding add to args property e.g. in schema.js ()
  `name: { type: new GraphQLNonNull(GraphQLString) }`
- A response only appears if it is returned in the schema.js (does not have to be, to work)

# 1) Request without args

```graphql
mutation {
  addMovie(
    name: "Incredibles"
    genre: "Action"
    directorId: "61f3c59b6f0c94459de9b023"
  ) {
    name
    genre
  }
}
```

Response

```json
{
  "data": {
    "addMovie": {
      "name": "Incredibles",
      "genre": "Action"
    }
  }
}
```

# 2) Request with args

```graphql
mutation {
  job: createJob(
    companyId: "SJVO-wdOM"
    title: "Senior Developer Java"
    description: "Producing clean, efficient code based on specifications"
  ) {
    id
    title
  }
}
```

```json
{
  "data": {
    "job": {
      "id": "rkw470ggc",
      "title": "Senior Developer Java"
    }
  }
}
```
