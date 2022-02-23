# Rest

REST enables to

- make queries or request to web APIs it via e.g. an React app
- which enbables to retrieve certain data
- to display e.g. display movies and directors from a database

Examples for enpoint could be:

- Getting a particular movie: e.g. domain.com/movies/:id
- Getting a the director of a movie: e.g. domain.com/directory/:id

# Pros of GraphQL over REST

The difference between REST and GraphQL is

- overfetching and
- underfetching

## Overfetching

GraphQL enables to define

- the exact data shape and contents
- that they need in a single request

So GraphQL enables

- that the client has FULL control over the data it wants
- from the server
- (with REST you always get all the data from that resource)

## Underfetching

GraphQL enables to

- fetch multiple resources
- in one call to the server
- (with REST you always need to make multiple calls for this)
