# Rest

REST-APIs enables to

- retrieve certain data
- by making a request to it via e.g. an React app
- to display e.g. display movies and directors from a database

Examples for enpoint could be:

- Getting a particular movie: e.g. domain.com/movies/:id
- Getting a the director of a movie: e.g. domain.com/directory/:id

# GraphQL

Query language to communicate data

- between a client, the browser, and a server

It allows us to structure data driven applications

- that are much more flexible and efficient way
- therefore often just one instead of multiple requests are necessaryy

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
