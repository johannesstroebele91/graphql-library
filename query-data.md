# Basics

GraphQL is not meant to be directly INTERACTED with

- It is designed to be used via other applications (e.g. Apollo or GraphiQL)
- in order to make HTTP requests

# Setup GraphiQL

- e.g. graphqlHTTP({graphiql: true}) in **app.js**
- restart app,
- and GraphiQL will run via e.g. http://localhost:5000/graphql

# Examples

Several queries are listed below:

## movie

```
{
    movie(id: "fsd2123y") {
        name
        gerne
    }
}
```

## director

```
{
  director(id: 1) {
    name
    movies{
      name
    }
  }
}
```

## movies

```
{
    movies {
        name
        gerne
    }
}
```

## directors

```
{
    directors {
    name
    }
}
```
