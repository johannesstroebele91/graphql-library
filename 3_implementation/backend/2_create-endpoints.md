# Basics

1. GraphQL Schema e.g. `job-board/server/schema.graphql`
   - defines how endpoint for request will look like
2. Resolver e.g. `job-board/server/resolvers.js`
   - gets the data (e.g. from the MongoDB
   - and processes the data as specified in the schema
   - so a operation of either query, mutation, or subscription
3. GraphQL playground: http://localhost:9000/graphql
   - environment for testing queries before frontend is implemented
   - query variables can be specified for convience e.g. `{ "compandyId": "4rewfs-eas" }`)
