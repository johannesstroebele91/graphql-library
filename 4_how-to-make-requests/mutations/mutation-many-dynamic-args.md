# 1. Backend

## 1.1. Schema

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

## 1.2. Query variables (used for playground)

```JSON
{
	"input": {
		"companyId": "SJV0-wdOM",
		"title": "Full Stack Developer",
		"description": "Testing"
	}
}
```

## 1.3. Resolvers

```javascript
const Mutation = {
  createJob: (root, { input }) => {
    const id = db.jobs.create({ companyId, title, description });
    return db.jobs.get(id);
  },
};
```

# 2. Frontend

## 2.1.

## 2.2.

# 3. Response

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
