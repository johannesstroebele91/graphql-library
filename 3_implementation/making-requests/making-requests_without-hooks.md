1. Install apollo client library and a few related modules `npm install apollo-boost`
2. Setup an apollo client instance `job-board/client/src/requests.js`
3. Install graphql package pharse queries `npm install graphql`
4. Define requests using e.g. fetch()
5. Call the requests from the React components
6. Authenticate requests using ApolloLink `authentication/authn-in-frontend.md`
7. Optionally use Apollo cache `job-board/client/src/requests.js`
8. Use fragments for reusing query and mutation code

# 7. Request `job-board/client/src/requests.js`

More information is provided in `making-requests/basics.md`

"gql" enables to convert the query string

- into a structured object (into query document)
- that can be understoof by Apollo Client `job-board/client/src/queries.js`

```javascript
export const QUERY_JOBS = gql`
  {
    jobs {
      id
      title
      company {
        id
        name
        description
      }
      description
    }
  }
`;

const endpointURL = "http://localhost:9000/graphql";

export async function loadJobs() {
  const {
    data: { jobs },
  } = await client.query({ query: QUERY_JOBS, fetchPolicy: "no-cache" }); // more easy syntax: `data` an then `data.jobs`
  return jobs;
}
```

# 8. React component `job-board/client/src/components/JobBoard.js`

```javascript
export function JobBoard() {
  const [jobs, setJobs] = useState([]);

  //  load data from the server
  useEffect(() => {
    // A async function needs to be created to call loadJobs,
    // because useEffect cannot be made async!!!
    const fetchJobs = async () => {
      const fetchedJobs = await loadJobs();
      setJobs(fetchedJobs);
    };
    fetchJobs();
  }, [setJobs]);

  if (!jobs) {
    return <p>Data is loading...</p>;
  }

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}
```

TODO

# Basics

Normal request are done in the following way

# 1. Backend

1. GraphQL Schema e.g. `job-board/server/schema.graphql`
   - defines how endpoint for request will look like
2. Resolver e.g. `job-board/server/resolvers.js`
   - gets the data (e.g. from the MongoDB
   - and processes the data as specified in the schema
   - so a operation of either query, mutation, or subscription
3. GraphQL playground: http://localhost:9000/graphql
   - environment for testing queries before frontend is implemented
   - query variables can be specified for convience e.g. `{ "compandyId": "4rewfs-eas" }`)

# 2. Frontend

## 2.1. Apollo Client

2. Queries or mutations are created like e.g. `job-board/client/src/queries.js`
   - and should be outsource
   - if there are too many
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
