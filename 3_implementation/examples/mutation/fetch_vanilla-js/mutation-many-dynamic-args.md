# 1. Backend

## 1.1. Schema `job-board/server/schema.graphql`:

Input types in the schema can be used

- to specify which parameters and types
- a mutation receives

Warning! Ouput types

- which are for specifying return types
- are prohibited to be "re-used" by GraphQl

```graphql
type Mutation {
  createJob(input: CreateJobInput): Job
}

input CreateJobInput {
  companyId: ID
  title: String
  description: String
}

type Job {
  id: ID!
  title: String
  company: Company
  description: String
}
```

## 1.2. Resolvers

```javascript
const Mutation = {
  createJob: (root, { input }) => {
    const id = db.jobs.create(input);
    return db.jobs.get(id);
  },
};
```

## 1.3. Query variables for GraphQL playground

```JSON
{
	"input": {
		"companyId": "SJV0-wdOM",
		"title": "Full Stack Developer",
		"description": "Testing"
	}
}
```

# 2. Frontend

## 2.1. requests.js `job-board/client/src/requests.js`

```javascript
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

export const MUTATION_CREATE_JOB = `gql
  mutation CreateJob($input: CreateJobInput) {
        job: createJob(input: $input) {
          id
          title
          company {
            id
            name
          }
        }
      }`;

export async function createJob(input) {
  const { job } = await graphqlRequest(MUTATION_CREATE_JOB, { input });
  return job;
}
```

## 2.2. React component `job-board/client/src/components/JobForm.js`

```javascript
export const JobForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let history = useHistory();

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const companyId = "SJV0-wdOM"; // TODO fix id later
    createJob({ companyId, title, description }).then((job) => {
      history.push(`/jobs/${job.id}`);
    });
  };

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={title}
                onChange={handleChangeTitle}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="input"
                style={{ height: "10em" }}
                name="description"
                value={description}
                onChange={handleChangeDescription}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleClick}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
```

# 3. Response

```json
{
  "data": {
    "job": {
      "id": "BJbUZfbl5",
      "title": "Frontend developer"
    }
  }
}
```