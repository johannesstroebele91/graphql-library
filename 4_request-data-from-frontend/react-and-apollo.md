# Relevance

React cannot understand GraphQL,

- because GraphQL uses the GraphQL query language
- and NOT JavaScript
- although it looks really similar

So, to bind GraphQL queries

- to the appliation via components
- a GraphQL client such as Apollo needs to be used

# HowReactUsesApolloForRequestingDataFromGraphQLServer

The React app has components (e.g. MovieList, or AddMovie)

- which can make queries to the GraphQL server via Apollo,
- The GraphQL server then will go to the MongoDB
- grab the respective data
- and return it back
