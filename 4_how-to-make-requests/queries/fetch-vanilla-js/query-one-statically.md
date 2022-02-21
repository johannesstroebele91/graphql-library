# 1. Backend

## 1.1.

## 1.2.

# 2. Frontend

## 2.1.

## 2.2. Query

```graphql
{
  movie(id: 1) {
    name
    genre
    director {
      name
    }
  }
}
```

## 2.3. Reponse

```json
{
  "data": {
    "movie": {
      "name": "Joker",
      "genre": "Drama",
      "director": {
        "name": "Philips"
      }
    }
  }
}
```
