# 1. Backend

## 1.1.

## 1.2.

# 2. Frontend

## 2.1. Request

## 2.2. Query movies `movies-management-system/client/src/queries/queries.js`

```graphql
{
  movies {
    name
    genre
    director {
      name
    }
  }
}
```

# 3. Response

```json
{
  "data": {
    "movies": [
      {
        "name": "Joker",
        "genre": "Drama",
        "director": {
          "name": "Philips"
        }
      },
      {
        "name": "La La land",
        "genre": "Musical",
        "director": {
          "name": "Anderson"
        }
      }
    ]
  }
}
```
