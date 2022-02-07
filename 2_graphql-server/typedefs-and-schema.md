# Explanation

GraphQL requires the use of a schema to

- that makes a clear contract between the server and clients
- so both sides know what they can be requested and retrieved
- (also possible with REST using e.g. swagger)

A schema is an inteface of the API

- which describes what the API can do
- so what a query might return
- PS can contain multiple queries that can be made

Schema needs to do 3 things

1. explain object types needs (e.g. movie and director)
2. AND the relationship between them
3. AND how these object types can be queried

In typeDefs, a schema is defined

- it is by default "schema {query: Query}"
- so it can be skipped most of the times
- query operation will map to the type Query

# Example

See **schema.js** file

const typeDefs = gql` schema { query: Query } type Query { message: String }`;
