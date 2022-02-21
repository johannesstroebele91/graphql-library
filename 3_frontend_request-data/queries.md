# Basics

Data can be requests

- by either requesting all documents (e.g. movies `{movies{name ...}}`)
- or specifiying only one document `query($id){movie(id:$id){name ...})}`

## Request movies

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

Response

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
      },
      {
        "name": "Interstellar",
        "genre": "Sci-Fi",
        "director": {
          "name": "Philips"
        }
      },
      {
        "name": "Kingdom",
        "genre": "Romance",
        "director": {
          "name": "Damien"
        }
      }
    ]
  }
}
```

## Request movie

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

Response

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
