const { gql } = require("apollo-server");

// 1) Define GraphQL schema (inteface of the API)
// it describes what the API can do
// so what a query might return
// PS can contain multiple queries that can be made

// gql = graphql schema definition language
// "Query" if the name of the type here
// So a client can call the server and ask for the data greeting
const typeDef = gql`
  type Query {
    greeting: String
  }
`;

console.log(typeDef);
