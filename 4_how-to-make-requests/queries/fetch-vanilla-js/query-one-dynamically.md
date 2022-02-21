# 1. Backend

## 1.1.

## 1.2.

# 2. Frontend

## 2.1.

## 2.2. Query a single movie using variables

```graphql
query JobQuery($id: ID!) {
  job(id: $id) {
    id
    title
  }
}
```

## 2.3. Reponse

```json
{
  "data": {
    "job": {
      "id": "trefdcvxse",
      "title": "Full Stack Developer"
    }
  }
}
```
