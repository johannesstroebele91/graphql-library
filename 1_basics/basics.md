# Rest

REST enables to

- make queries or request to web APIs it via e.g. an React app
- which enbables to retrieve certain data
- to display e.g. display movies and directors from a database

Examples for enpoint could be:

- Getting a particular movie: e.g. domain.com/movies/:id
- Getting a the director of a movie: e.g. domain.com/directory/:id

# GraphQL

GraphQL is a declarative, strongly-typed query language which ALSO enablest to

- query web APIs
- whereby it does not enable to query directly a database (PostgreSQL) like with SQL

So the GraphQL enables

- to communicate data
- between a client, the browser, and a server

React App can make queries

- againt a GraphQL server,
- which collects the data for you
- and in turn sends the data back to the React app

The difference between REST and GraphQL is

- overfetching and
- underfetching

## 1) Overfetching

GraphQL enables to define

- the exact data shape and contents
- that they need in a single request

So GraphQL enables

- that the client has FULL control over the data it wants
- from the server
- (with REST you always get all the data from that resource)

## 2) Underfetching

GraphQL enables to

- fetch multiple resources
- in one call to the server
- (with REST you always need to make multiple calls for this)

# Type system or schema

GraphQL requires the use of a schema to

- that makes a clear contract between the server and clients
- so both sides know what they can be requested and retrieved
- (also possible with REST using e.g. swagger)

# Why "graph" QL?

Is just one "super-charged" enpoint

- where the data is connected in form of a graph
- that are accessed like a waterfall
- so first movie, then director, then movies of the director

Example of a GraphQL request:

```
{
    movie(id: 1) {
        name
        gernre
        director {
            name
            age
            movies{
                name
            }
        }
    }
}
```

# Compatability

- does not only work with React,
- but also Vue.js or Angular
