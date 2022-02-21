# Basics

Normal request are done in the following way

# 1. Backend

1. GraphQL Schema: add field to the Query type
2. Resolver: add field e.g. company to Query
3. GraphQL playground:
   1. test the request via http://localhost:9000/graphql
   2. query variables can be specified for convience e.g. `{ "compandyId": "4rewfs-eas" }`)

# 2. Frontend

1. add request by creating a request funtion with
   1. endpointURL, method, headers, body (query, _variables_) and
   2. return the data
2. specify query or mutation
   1. based on the tipps in `make queries` and `make mutations`
   2. outsource if there are too many (e.g. `movies-management-system/client/src/queries/queries.js`)
3. component: call query with hooks (useQUery, useMutation) or the request function from the respective React componeng e.g. `JobBoard`
