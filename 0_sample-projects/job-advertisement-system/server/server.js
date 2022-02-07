const { gql, ApolloServer } = require("apollo-server");

// 1) Define GraphQL schema (inteface of the API)
// it describes what the API can do
// so what a query might return
// PS can contain multiple queries that can be made

// gql = graphql schema definition language
// "Query" if the name of the type here
// So a client can call the server and ask for the data greeting

// in typeDefs, a schema is defined
// it is by default "schema {query: Query}"
// so it can be skipped most of the times
const typeDefs = gql`
  schema {
    query: Query
  }
  type Query {
    message: String
  }
`;

// 2) Resolver
// Implementation how the server returns a value
// This function will be called by the GraphQL engine
// everytime the client sends a "greeting" query
// In other words it is called to "resolve" the value of the "greeting" field
const resolvers = {
  Query: {
    message: () => "Hello from the GraphQL server!",
  },
};

// ApolloServer constructor takes configuration properties
// such as the schema "typeDef" and the resolvers
// Written in shorthand here, because property name match the variable names above
const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen({ port: 9000 })
  .then(({ url }) => console.log(`Server running at ${url}`));
