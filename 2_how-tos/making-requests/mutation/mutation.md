# 1. Basics

Enable to modify server-side data

- and by default return nothing if not specified
- however it is recommended to return the created data

# 2. Backend

## 2.1. Schema `job-board/server/schema.graphql`:

For mutations,

- most often parameters are passed
- and a return type specified

Input parameters can

- be combined into one input parameter
- which input type
- is not to be confused with an output type

Their purpose is as follows:

- output type: how the data that the endpoint returns should look like
- input type: how the input parmeters should look like

```graphql
type Mutation {
  createJob(input: CreateJobInput): Job
}

# OUPUT or return type
type Job {
  id: ID!
  title: String
  company: Company
  description: String
}

# OUPUT or return types
type Company {
  id: ID!
  name: String
  description: String
  jobs: [Job]
}

# INPUT or parameter type
input CreateJobInput {
  title: String
  description: String
}
```

## 2.2. Resolver

Parameters
a) parent object (root)
b) input object based on the GraphQL arguments defined in the schema

```javascript
const Mutation = {
  createJob: (root, { companyId, title, description }) => {
    const id = db.jobs.create({ companyId, title, description });
    return db.jobs.get(id);
  },
};
```

# 3. Frontend

## 3.1. requests.js `job-board/client/src/requests.js`

For the parameters

- the types need to be declared first
- and afterwards the passed values
- assigned to the variables in the query

```javascript
export const MUTATION_CREATE_JOB = `mutation CreateJob(
  $companyId: ID
  $title: String
  $description: String
  ){
    job: createJob(
      companyId: $companyId
      title: $title
      description: $description
    ) {
     title
  }
}`;
```

It's important to

- initialize input paramters "variables"
- using `variables = {}`

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

export async function createJob(input) {
  const { job } = await graphqlRequest(MUTATION_CREATE_JOB, { input });
  return job;
}
```

## 3.2. React component `job-board/client/src/components/JobForm.js`

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

# 4. Response

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
