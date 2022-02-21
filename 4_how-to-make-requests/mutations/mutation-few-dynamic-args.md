# 1. Backend

## 1.1. Schema

## 1.2. Resolver

```javascript
const Mutation = {
  createJob: (root, { companyId, title, description }) => {
    const id = db.jobs.create({ companyId, title, description });
    return db.jobs.get(id);
  },
};
```

# 2. Frontend

## 2.1. Mutation

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

## 2.2.

# 3. Response

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
