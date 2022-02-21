# Basics

1. GraphQL Schema: add field to the Query type
2. Resolver: add field e.g. company to Query
3. GraphQL playground:
   1. test the request via http://localhost:9000/graphql
   2. query variables can be specified for convience e.g. `{ "compandyId": "4rewfs-eas" }`)

# Examples

## 1) GraphQL Schema `job-board/server/schema.graphql`

```graphql
# Array of jobs
type Query {
  job(id: ID!): Job
  jobs: [Job]
  company(id: ID!): Company
}

type Mutation {
  createJob(companyId: ID, title: String, description: String): Job
}

type Company {
  id: ID!
  name: String
  description: String
  jobs: [Job]
}

type Job {
  id: ID!
  title: String
  company: Company
  description: String
}
```

## 2) GraphQL Resolvers `job-board/server/resolvers.js`

```javascript
const db = require("./db");

const Query = {
  job: (root, { id }) => db.jobs.get(id),
  jobs: () => db.jobs.list(),
  company: (root, { id }) => db.companies.get(id),
};

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id),
};

const Mutation = {
  createJob: (root, { companyId, title, description }) => {
    const id = db.jobs.create({ companyId, title, description });
    return db.jobs.get(id);
  },
};

module.exports = { Query, Mutation, Job, Company };
```

# MongoDB explanation missing
