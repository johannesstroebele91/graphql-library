- [1. Basics](#1-basics)
- [2. When to use them](#2-when-to-use-them)
- [3. How to make a query](#3-how-to-make-a-query)
  - [3.2. Backend](#32-backend)
    - [3.2.1. Schema `job-board/server/schema.graphql`](#321-schema-job-boardserverschemagraphql)
    - [3.2.2. Resolvers `job-board/server/resolvers.js`](#322-resolvers-job-boardserverresolversjs)
  - [3.2. Frontend](#32-frontend)
    - [3.2.1. requests.js `job-board/client/src/requests.js`](#321-requestsjs-job-boardclientsrcrequestsjs)
    - [3.2.2. React component `job-board/client/src/components/JobBoard.js`](#322-react-component-job-boardclientsrccomponentsjobboardjs)
- [4. Response](#4-response)

# 1. Basics

Queries enable to

- fetch data from a server, so
- you send one request and
- you receive one response back

# 2. When to use them

In certain edge cases,

- it is better to use subscriptions
- which is explained in "When to use" in `subscription/basics.md`

# 3. How to make a query

## 3.2. Backend

### 3.2.1. Schema `job-board/server/schema.graphql`

Defines how endpoint for query will look like

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

type Company {
  id: ID!
  name: String
  description: String
}
```

### 3.2.2. Resolvers `job-board/server/resolvers.js`

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
  job: (root, { id }) => db.jobs.get(id),
  jobs: () => db.jobs.list(),
};

const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id),
};
```

## 3.2. Frontend

### 3.2.1. requests.js `job-board/client/src/requests.js`

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

### 3.2.2. React component `job-board/client/src/components/JobBoard.js`

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

# 4. Response

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
