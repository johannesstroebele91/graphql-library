- [1. Basics](#1-basics)
- [2. A resolver needs to be based on the schema](#2-a-resolver-needs-to-be-based-on-the-schema)
- [3. Resolvers](#3-resolvers)
- [3.1. Write possible operations](#31-write-possible-operations)
- [3.2. Populate missing nested fields and objects](#32-populate-missing-nested-fields-and-objects)
- [5. Passing resolvers to Apollo Server](#5-passing-resolvers-to-apollo-server)

# 1. Basics

_Reference: https://www.apollographql.com/docs/apollo-server/data/resolvers/_

Apollo Server needs to know

- how to populate data for every field in your schema
- so that it can respond to requests for that data.
- To accomplish this, it uses resolvers.

A resolver is a function

- that's responsible for populating the data
- for each field in your schema

It can populate that data

- in any way you define,
- such as by fetching data from a back-end database or
- a third-party API

It is impotant that

- the returend resolvers object
- must always mirror
- the type definitions and associations
- that were specified in the schema

# 2. A resolver needs to be based on the schema

In the schema the Job typ

- has the nested object company
- which are connected via the companyId
- (can be used like a foreign key in a relational database)

Define Query

```graphql
type Query {
  getJob(id: ID!): Job
}
```

Define associations between objects by defining

- the type and
- the nested type

```graphql
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
}
```

# 3. Resolvers

# 3.1. Write possible operations

Multiple operations are possible such as:

- query `query.md`
- mutation `mutation.md`
- subscription `subscription.md`

The arguments

- that each resolver function receives
- can be used to populate the field

These parameters are:

- parent: return value for the field's parent
- args: contains all GraphQL arguments that were passed from the client
- context:
  - object shared across all resolvers and includes
  - e.g. authentication information, dataloader instances
- info:
  - information about the operation's execution state,
  - including the field name,
  - the path to the field from the root

```javascript
const db = require("./db");

const Query = {
  getJobs: () => db.jobs.list(),
  getJob: (root, { id }) => db.jobs.get(id),
  getCompany: (root, { id }) => db.companies.get(id),
};

const Mutation = {
  createJob: (root, { input }, { user }) => {
    if (!user) {
      throw new Error("Unauthorized");
    }

    const id = db.jobs.create({ ...input, companyId: user.companyId });
    return db.jobs.get(id);
  },
};
```

# 3.2. Populate missing nested fields and objects

If not considered,

- nested objects would provide the value "null"
- if not correctly handled by the resolver

Thefore, a resolver objects need to be created to

- that reflect the GraphQL schema
- to resolve the missing nested field or object

Example: the Job resolver handels that

- for the getJobs and getJob queries is populated
- by using parent argument from the parent field (e.g. company)
- (the Job type and its relation to the Compan type must be defined first in GraphQL schema)

```javascript
const Job = {
  company: (job) => db.companies.get(job.companyId),
};
```

Example: the Comapny resolver handels that

- for the jobs field of the getCompany query is populated
- by using parent argument from the parent field (e.g. the job)
- (the Company type and its relation to the Job type must be defined first in GraphQL schema)

```javascript
const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id),
};
```

# 5. Passing resolvers to Apollo Server

After you define all of your resolvers,

- you pass them to the constructor of ApolloServer
- (as the resolvers property),
- along with your schema's definition (as the typeDefs property)

```javascript
const { ApolloServer, gql } = require("apollo-server");

// Hardcoded data store
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// Schema definition
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

// Resolver map
const resolvers = {
  Query: {
    books() {
      return books;
    },
  },
};

// Pass schema definition and resolvers to the
// ApolloServer constructor
const server = new ApolloServer({ typeDefs, resolvers });

// Launch the server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```
