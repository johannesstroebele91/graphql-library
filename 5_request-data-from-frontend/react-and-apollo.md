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

# HowToSetup

1. Create initial React project with `npx create-react-app client --use-npm`
2. App can be served with `npm start`
3. Running app can be accessed in the browser via `localhost:3000` (runs seperately from the server, which runs on `localhost:5000`)
