# Basics

Queries enable to

- fetch data from a server, so
- you send one request and
- you receive one response back

# When to use them

In certain edge cases,

- it is better to use subscriptions
- which is explained in "When to use" in `subscription/basics.md`

# How to make a query

## 1. Backend

### 1.1. Schema `job-board/server/schema.graphql`

Defines how endpoint for query will look like

The arguments passed in the job GraphQL query to

- can contain the root and args arguments
- which can be destructuring like "{id}"

```graphql
type Query {
  job(id: ID!): Job
  jobs: [Job]
}

type Job {
  id: ID!
  title: String
  company: Company
  description: String
}
```

### 1.2. Resolvers `job-board/server/resolvers.js`

Gets the data (e.g. from the MongoDB

- and processes the data
- as specified in the schema

Here, jobs should be queried

- which is why it needs to be specified
- how the jobs should be retrived from the database
- and Job??? TODO Daniel

```javascript
const db = require("./db");

const Query = {
  job: (root, { id }) => db.jobs.get(id),
  jobs: () => db.jobs.list(),
};
```

Relations can be defined as follows:

- The parent object for each company is the Job
- which can be used to get the right company based on the id
- Then the company for each job can be returned

```javascript
// TODO necessary???
const Job = {
  company: (job) => db.companies.get(job.companyId),
};

module.exports = { Query, Job };
```

## 2. Frontend

### 2.1. requests.js `job-board/client/src/requests.js`

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

### 2.2. React component `job-board/client/src/components/JobBoard.js`

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
