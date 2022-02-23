# 1. Backend

## 1.1. Schema `job-board/server/schema.graphql`

```graphql
type Query {
  job(id: ID!): Job
}

type Job {
  id: ID!
  title: String
  company: Company
  description: String
}
```

## 1.2. Resolvers `job-board/server/resolvers.js`

Args contains the arguments passed in the GraphQL query

- PS object destructuring can be used to make it easier to read
- so NOT "args" but "{id}"

Parent object for each company is the job

- which can be used to get the right company based on the id
- Returns the company for each job

```javascript
const db = require("./db");

const Query = {
  job: (root, { id }) => db.jobs.get(id),
};

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

module.exports = { Query, Job };
```

# 2. Frontend

## 2.1. requests.js `job-board/client/src/requests.js`

GraphQL enables to pass dynamic variables into the query

- using the query keyword
- the variable needs to be specified like e.g. "$id: ID!"

Operational name can be stated after "query" for debugging only

- Variables can be specified in the playground
  - in the query variables section
  - like e.g. "{"id": "SJRAZDu_z"}"
    Better to make a flexible request
- via e.g. "graphQLRequest",
- if the content has only minor variations
- PS optional variables need to be initialized with ""={}"")

```javascript
export const QUERY_JOB = `query JobQuery($id: ID!) {
        job(id: $id) {
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

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(endpointURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });
  return response.json().data;
}
```

## 2.2. React component `job-board/client/src/components/JobDetail.js`

```javascript
export const JobDetail = (props) => {
  const { jobId } = props.match.params;
  const [job, setJob] = useState(null);

  //  load data from the server
  useEffect(() => {
    // A async function needs to be created to call loadJob,
    // because useEffect cannot be made async!!!
    const fetchJob = async () => {
      const fetchedJob = await loadJob(jobId);
      setJob(fetchedJob);
    };
    fetchJob();
  }, [jobId, setJob]);

  if (!job) {
    return <p>Data is loading...</p>;
  }

  return (
    <div>
      <h1 className="title">{job.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">{job.description}</div>
    </div>
  );
};
```

## 3 Response

```json
{
  "data": {
    "job": {
      "id": "rJKAbDd_z",
      "title": "Frontend Developer",
      "company": {
        "id": "HJRa-DOuG",
        "name": "Facegle",
        "description": "We are a startup on a mission to disrupt social search engines. Think Facebook meet Google."
      },
      "description": "We are looking for a Frontend Developer familiar with React."
    }
  }
}
```
