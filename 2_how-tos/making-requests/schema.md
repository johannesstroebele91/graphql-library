# Explanation

GraphQL requires the use of a schema to

- that makes a clear contract between the server and clients
- so both sides know what they can be requested and retrieved
- (also possible with REST using e.g. swagger)

A schema is an inteface of the API

- which describes what the API can do
- so what a query might return
- PS can contain multiple queries that can be made

# What it enables to do explain

1. how operations look like (e.g. query, mutations, and subscriptions),
2. the needed object types (e.g. job, company) AND
3. relationship between them (e.g. nested object types)

# Setup

In typeDefs, a schema is defined

- it is by default `schema {query: Query}`
- so it can be skipped most of the times
- query operation will map to the type Query

It can be setup using multiple ways:

1. apollo server: declaring typeDefs with schema for usage in the apollo server
2. graphqlHttp: function that handels if a request comes in

Examples

1. Apollo server

```javascript
const typeDefs = gql(fs.readFileSync("./schema.graphql", { encoding: "utf8" }));

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});
```

2. graphqlHttp

```javascript
app.use(
  "/graphql",
  graphqlHTTP({
    schema, // or long: schema: schema
    graphiql: true, // for showing query interface GraphiQL
  })
);
```

# Defining schema `job-board/server/schema.graphql`

1. Stating operation (e.g. query, mutation, job)

```javascript
type Query {
  getJob(id: ID!): Job
  getJobs: [Job]
  getCompany(id: ID!): Company
}

type Mutation {
  createJob(input: CreateJobInput): Job
}
```

2. Defining output or return types

These types specify

- how the data that the endpoint returns
- should look like

```javascript
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

3. Defining input or parameter types

These types speficy

- how the input parameters
- for e.g. mutations look like
- IMPORTANT: output types cannot be resued for this!!!

```javascript
input CreateJobInput {
  title: String
  description: String
}

```
