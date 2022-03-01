- [1. Basics](#1-basics)
- [2. When to use them](#2-when-to-use-them)
- [3. Backend](#3-backend)
  - [3.2. Schema `job-board/server/schema.graphql`](#32-schema-job-boardserverschemagraphql)
  - [3.3. Resolvers `job-board/server/resolvers.js`](#33-resolvers-job-boardserverresolversjs)
- [4. Frontend](#4-frontend)
  - [4.1. requests.js `job-board/client/src/requests.js`](#41-requestsjs-job-boardclientsrcrequestsjs)
  - [4.2. React component `job-board/client/src/components/JobBoard.js`](#42-react-component-job-boardclientsrccomponentsjobboardjs)
- [5. Response](#5-response)

# 1. Basics

Queries enable to

- fetch data from a server, so
- you send one request and
- you receive one response back

# 2. When to use them

Most of them time queries should be use

- BUT in certain edge cases subscriptions are better
- as explained in "When to use" in `subscription/basics.md`

# 3. Backend

## 3.2. Schema `job-board/server/schema.graphql`

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

## 3.3. Resolvers `job-board/server/resolvers.js`

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

# 4. Frontend

## 4.1. requests.js `job-board/client/src/requests.js`

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

## 4.2. React component `job-board/client/src/components/JobBoard.js`

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

# 5. Response

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
