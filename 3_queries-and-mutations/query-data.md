# Basics

GraphQL is not meant to be directly INTERACTED with

- It is designed to be used via other applications (e.g. Apollo or GraphiQL)
- in order to make HTTP requests to the GraphQL server

# GraphiQL

Is a dummy frontend application

- which enables to test queries to a GraphQL server

# Setup GraphiQL

1. Set graphqlHTTP({graphiql: true}) in **app.js**
2. restart app
3. Use GraphiQL in browser via e.g. http://localhost:5000/graphql

# Examples

Several queries are listed below:

## movie

Request

```
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

```
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

## movies

Request

```
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

```
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
