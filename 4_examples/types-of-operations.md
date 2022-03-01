# Queries

Queries can be implemented `see examples folder` via

1. `fetch()` function from Vanilla JS
   - Query all documents `query-all.md`
   - Query one document using dynamic paramter `query-one-dynamically.md`
   - Query one document using static parameter (e.g. `{ movie(id: 1) { name } }`)
2. `client.query()` function from Apollo Client
   - Query all documents `query-all.md`
   - Query one document using dynamic paramter `query-one-dynamically.md`
   - Query one document using static parameter (e.g. `{ movie(id: 1) { name } }`)
3. `useQuery()` hooks from React apollo

# Mutations

Mutations can be implemented `see examples folder` via

1. `fetch()` function from Vanilla JS
   - Mutating with dynamic arguments
     - For a few arguments (output type) `mutation-few-dynamic-args.md`
     - For many arguments (input type) `mutation-many-dynamic-args.md`
   - Mutating with static arguments (e.g. `mutation { job: createJob( companyId: "SJVO-wdOM" title: "Test" description: "Test" ) { title } }`)
2. `client.mutation()` function from Apollo Client
3. `useMutation()` hook from React Apollo

# Subscriptions

TODO later
