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
