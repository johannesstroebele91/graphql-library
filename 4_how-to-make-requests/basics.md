# 1. Basics

Normal request are done in the following way

## 1.1. Backend

1. GraphQL Schema: add field to the Query type
2. Resolver: add field e.g. company to Query
3. GraphQL playground:
   1. test the request via http://localhost:9000/graphql
   2. query variables can be specified for convience e.g. `{ "compandyId": "4rewfs-eas" }`)

## 1.2. Frontend

1. add request by creating a request funtion with
   1. endpointURL, method, headers, body (query, _variables_) and
   2. return the data
2. specify query or mutation
   1. based on the tipps in `make queries` and `make mutations`
   2. outsource if there are too many (e.g. `movies-management-system/client/src/queries/queries.js`)
3. component: call query with hooks (useQUery, useMutation) or the request function from the respective React componeng e.g. `JobBoard`

# 2. Examples for requests

# 2.1. Queries

Queries enable to get data

Types:

1. Using Apollo Client hooks
   1. Query all documents `query-all.md`
   2. Query one document using dynamic paramter `query-one-dynamically.md`
   3. Query one document using static parameter `query-one-statically.md`
1. Using fetch() function
   1. Query all documents `query-all.md`
   2. Query one document using dynamic paramter `query-one-dynamically.md`
   3. Query one document using static parameter `query-one-statically.md`

# 2.2. Mutations

Mutations to add, delete, and edit data

Tipps:

- Return type NEEDS to be always specified!!!
  `mutation { createJob(..) {companyId } }`
- By default the response name would be "createJob",
  - use alias like job to fix this
  - `mutation { job:createJob(companyId: "SJVO-wdOM", ...) {title ... } }`
- Properties can be made not skipable
  - by adding add to args property e.g. in schema.js ()
  - `name: { type: new GraphQLNonNull(GraphQLString) }`
- A response only appears
  - if it is returned in the schema.js
  - PS does not have to be provided, to work

Types:

1. Mutating with static arguments
2. Mutating with dynamic arguments
   1. For a few arguments (output type)
   2. For many arguments (input type)
