TODO rein:

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

# 1. Write Requests using fetch()

`job-board/client/src/requests.js`

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

# 2. Call the requests from the React components

Example: `job-board/client/src/components/JobBoard.js`

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

# 3. Optional: Authn, Cache, Fragments

1.  Authenticate requests using ApolloLink `making-requests/frontend/authentication.md`
2.  Apollo cache `making-requests/frontend/apollo-cache.md`
3.  Fragments for reusing query and mutation code `making-requests/frontend/fragments.md`
