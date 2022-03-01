# Basics

GraphQL supports mostly

- queries, mutations, and subscriptions
- which can be used via
  1. `fetch()` function from Vanilla JS
  2. e.g. `client.query()` function that uses Apollo Client directly and can be used with VanillaJS and most other frameworks
  3. e.g. `useQuery()` hooks from React apollo that uses Apollo Client under the hood

# Queries

Queries can be implemented see `queries folder`:

1. `fetch()`
   - Query all documents `query-all.md`
   - Query one document using dynamic paramter `query-one-dynamically.md`
   - Query one document using static parameter (e.g. `{ movie(id: 1) { name } }`)
2. `client.query()`
   - Query all documents `query-all.md`
   - Query one document using dynamic paramter `query-one-dynamically.md`
   - Query one document using static parameter (e.g. `{ movie(id: 1) { name } }`)
3. `useQuery()`

# Mutations

Mutations can be implemented see `mutations folder`:

1. `fetch()`
   - Mutating with dynamic arguments
     - For a few arguments (output type) `mutation-few-dynamic-args.md`
     - For many arguments (input type) `mutation-many-dynamic-args.md`
   - Mutating with static arguments (e.g. `mutation { job: createJob( companyId: "SJVO-wdOM" title: "Test" description: "Test" ) { title } }`)
2. `client.mutation()`
3. `useMutation()`

# Subscriptions

Subscriptions can be implemented see `subscriptions folder`

1. `client.subscribe()`
2. `useSubscription`
