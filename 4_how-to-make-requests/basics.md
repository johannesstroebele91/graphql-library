# Basics

Normal request are done in the following way

# 1. Backend

1. GraphQL Schema e.g. `job-board/server/schema.graphql`
   - defines how endpoint for query will look like
2. Resolver e.g. `job-board/server/resolvers.js`
   - gets the data (e.g. from the MongoDB
   - and processes the data as specified in the schema
3. GraphQL playground: http://localhost:9000/graphql
   - environment for testing queries before frontend is implemented
   - query variables can be specified for convience e.g. `{ "compandyId": "4rewfs-eas" }`)

# 2. Frontend

## 2.1. Apollo Client

2. Queries or mutations e.g. `job-board/client/src/queries.js`
   - are created like specified in `make queries` and `make mutations`
   - should be outsource if there are too many queries (e.g. `movies-management-system/client/src/queries/queries.js`)
3. React component:
   - a request can be triggerd using a hook from Apollo Client
   - e.g. useQuery, useMutation

## 2.2. fetch() function - Vanilla JS

1. Requests e.g. `job-board/client/src/requests.js`
   - specify which data is requested by the frontend
   - endpointURL, method, headers, body (query, _variables_), return data
2. Queries or mutations e.g. `job-board/client/src/queries.js`
   - are created like specified in `make queries` and `make mutations`
   - should be outsource if there are too many queries (e.g. `movies-management-system/client/src/queries/queries.js`)
3. React component:
   - a request is triggerd using a load function
     - which triggers the functions specified in the requests.js
     - e.g. `job-board/client/src/components/JobBoard.js`
