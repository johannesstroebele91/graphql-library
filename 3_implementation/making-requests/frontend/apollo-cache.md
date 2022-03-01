# Basics

The cache enables to

- avoid making unecessary same requests
- and reuse early made requests
- HOWEVER it is not perfect!!!
- Edge cases needs to be handled through client.query(): `job-board/client/src/requests.js`
  1.  fetchPolicy (e.g. "no-cache")
  2.  update, which is called after a mutation

# Enance Apollo Client

Create an InMemoryCache object

- that can accept a variety of configuration options, and
- provide it to the ApolloClient constructor

```javascript
const client = new ApolloClient({
  uri: endpointURL,
  cache: new InMemoryCache(options),
});
```

# Example without hooks `job-board/client/src/requests.js`:

```javascript
export async function loadJobs() {
  const {
    data: { jobs },
  } = await client.query({ query: QUERY_JOBS, fetchPolicy: "no-cache" }); // more easy syntax: `data` an then `data.jobs`
  return jobs;
}
```

# Example with hooks

By default, the useQuery hook checks

- the Apollo Client cache to see
- if all the data you requested
- is already available locally

If all data is available locally,

- useQuery returns that data and
- doesn't query your GraphQL server

Other options are:

- "network-only" Doesn't check cache before making a network request
- others see https://www.apollographql.com/docs/react/data/queries/

```javascript
const { loading, error, data } = useQuery(GET_DOGS, {
  fetchPolicy: "network-only", // Doesn't check cache before making a network request
});
```
