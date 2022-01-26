# GraphiQL

- dummy frontend application
- enables to test queries to a GraphQL server

# Basic example

Query movies from the **movies entry**

- which only gives back the data
- which is requested

**Input**

```
{
    movies {
        name
        genre
        id
    }
}
```

**Output**

```
{
    "data": {
        "movies": {
            {
                "name": "The Prestige",
                "genre": "Sci-Fi",
                "id": "trfios204we89",
            },
                        {
                "name": "The Prestige",
                "genre": "Sci-Fi",
                "id": "trfios204we89",
            },
        }
    }
}
```

# Complex data example

Input

```
{
    movies {
        name
        director {
            name
        }
    }
}
```

Output

```
{
    "data": {
        "movies": {
            {
                "name": "The Prestige",
                "director": {
                    "name": "Christopher Nolan"
                }
            },
            {
                "name": "The Prestige",
                "director": {
                    "name": "Christopher Nolan"
                }
            },
        }
    }
}
```
