# Basics

1. add request by creating a request funtion with
   1. endpointURL, method, headers, body (query, _variables_) and
   2. return the data
2. specify query or mutation
   1. based on the tipps in `make queries` and `make mutations`
   2. outsource if there are too many (e.g. `movies-management-system/client/src/queries/queries.js`)
3. component: call query with hooks (useQUery, useMutation) or the request function from the respective React componeng e.g. `JobBoard`

# Examples

# 1) Requests `job-board/client/src/requests.js`

```javascript
const endpointURL = "http://localhost:9000/graphql";

export async function loadJobs() {
  const response = await fetch(endpointURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
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
      `,
    }),
  });
  const responseBody = await response.json();
  return responseBody.data.jobs;
}
```

# 2) Trigger request from React component `job-board/client/src/components/JobBoard.js`

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
