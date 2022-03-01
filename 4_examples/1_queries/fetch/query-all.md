# 1. Backend

## 1.1. Schema `job-board/server/schema.graphql`

Defines how endpoint for query will look like

```graphql
type Query {
  jobs: [Job]
}

type Job {
  id: ID!
  title: String
  company: Company
  description: String
}
```

## 1.2. Resolvers `job-board/server/resolvers.js`

The query object

- includes the handler
- for all possible queries

It handels

- how the data is processed (e.g. from the MongoDB)
- as specified in the schema

Missing nested objects

- can be populated
- via resolver objects (e.g. Job)

```javascript
const db = require("./db");

const Query = {
  jobs: () => db.jobs.list(),
};

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

module.exports = { Query };
```

# 2. Frontend

## 2.1. requests.js `job-board/client/src/requests.js`

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

## 2.2. React component `job-board/client/src/components/JobBoard.js`

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

# Response

```JSON
{
  "data": {
    "jobs": [
      {
        "id": "rJKAbDd_z",
        "title": "Frontend Developer",
        "company": {
          "id": "HJRa-DOuG",
          "name": "Facegle",
          "description": "We are a startup on a mission to disrupt social search engines. Think Facebook meet Google."
        },
        "description": "We are looking for a Frontend Developer familiar with React."
      },
    ]
  }
}
```
