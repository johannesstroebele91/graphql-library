# Explanation

A resolver tells

- how the server returns a greeting value
- so a function that is called by the by the GraphQL engine
- everytime the client sends a "greeting" query
- In other words it is called to "resolve" the value of the "greeting" field

It is impotant that the resolvers object

- mirrors the type definitions exactly
- So type "Query" and the field "greetings" of the schema AND
- "Query" and the field "greetings" of the resolvers object

The advantage of the resolvers object is

- that it can be a function with any logic we want
- more percicely, we can write e.g. a backend service here
- to get some data from the database and
- process it in some way

It also manages the associations

- between different objects
- e.g. Jobs and Companies -> which Job does one Company have?

# Example

server.js
