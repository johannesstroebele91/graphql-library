# 1. Queries

Queries enable to get data

Types:

1. Using Apollo Client hooks
   1. Query all documents `query-all.md`
   2. Query one document using dynamic paramter `query-one-dynamically.md`
   3. Query one document using static parameter (e.g. `{ movie(id: 1) { name } }`)
2. Using fetch() function
   1. Query all documents `query-all.md`
   2. Query one document using dynamic paramter `query-one-dynamically.md`
   3. Query one document using static parameter (e.g. `{ movie(id: 1) { name } }`)

# 2. Mutations

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

1. Mutating with dynamic arguments
   1. For a few arguments (output type) `mutation-few-dynamic-args.md`
   2. For many arguments (input type) `mutation-many-dynamic-args.md`
2. Mutating with static arguments (e.g. `mutation { job: createJob( companyId: "SJVO-wdOM" title: "Test" description: "Test" ) { title } }`)

# Subscriptions
