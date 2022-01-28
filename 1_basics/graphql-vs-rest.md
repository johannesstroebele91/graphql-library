# Rest

REST-APIs enables to

- retrieve certain data
- by making a request to it via e.g. an React app
- to display e.g. display movies and directors from a database

Examples for enpoint could be:

- Getting a particular movie: e.g. domain.com/movies/:id
- Getting a the director of a movie: e.g. domain.com/directory/:id

# GraphQL

GraphQL is a

- declarative, strongly-typed query language
- for client applications

Clients define

- the exact data shape and contents
- that they need in a single request

So the GraphQL enables

- to communicate data
- between a client, the browser, and a server

React App can make queries

- againt a GraphQL server,
- which collects the data for you
- and in turn sends the data back to the React app

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
