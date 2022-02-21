# 1. Requests with args and variables

## 1.1. For passing only a few variables

### 1.1.1. Schema

```graphql
mutation CreateJob($companyId: ID, $title: String, $description: String) {
  job: createJob(
    companyId: $companyId
    title: $title
    description: $description
  ) {
    title
  }
}
```

### 1.1.2. Resolver

```javascript
const Mutation = {
  createJob: (root, { companyId, title, description }) => {
    const id = db.jobs.create({ companyId, title, description });
    return db.jobs.get(id);
  },
};
```

### 1.1.3. Output

```json
{
  "data": {
    "job": {
      "id": "BJbUZfbl5",
      "title": null
    }
  }
}
```

## 1.2. For passing many variables

### 1.2.1. Schema

Input types in the schema can be used

- to specify which parameters and types
- a mutation receives

Warning! Ouput types

- which are for specifying return types
- are prohibited to be "re-used" by GraphQl

Example input type `job-board/server/schema.graphql`:

```graphql
type Mutation {
  createJob(input: CreateJobInput): Job
}

input CreateJobInput {
  companyId: ID
  title: String
  description: String
}
```

Query variables

```JSON
{
	"input": {
		"companyId": "SJV0-wdOM",
		"title": "Full Stack Developer",
		"description": "Testing"
	}
}
```

### 1.2.2. Resolvers

```javascript
const Mutation = {
  createJob: (root, { input }) => {
    const id = db.jobs.create({ companyId, title, description });
    return db.jobs.get(id);
  },
};
```

### 1.2.3. Output

```json
{
  "data": {
    "job": {
      "id": "BJbUZfbl5",
      "title": "Frontend developer"
    }
  }
}
```

# 2. Request with args, but without variables

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
