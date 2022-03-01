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
- e.g. Job constant
  - poluates company field
  - for Job type
  - based on the specified GraphQL schema

```javascript
const db = require("./db");

const Query = {
  getJob: (root, { id }) => db.jobs.get(id),
};

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

module.exports = { Query, Job };
```

# 2. Frontend

## 2.1. write query `chat-app/client/src/graphql/queries.js`

Example: `job-board/client/src/queries.js`

```javascript
const jobDetailFragement = gql`
  fragment JobDetail on Job {
    id
    title
    company {
      id
      name
    }
    description
  }
`;

export const QUERY_JOB = gql`
  query JobQuery($id: ID!) {
    getJob(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragement}
`;
```

## 2.2. React component via useQuery hook

Example: `movies-management-system/client/src/components/MovieDetails.js`

```javascript
export default function MovieDetails(props) {
  const {
    loading,
    data: { movie } = {},
    error,
  } = useQuery(GET_MOVIE_QUERY, {
    variables: { id: props.selectedMovieId },
  });

  if (error) return <p>There is an error for the query ...</p>;
  if (loading) return <p>Data is loading ...</p>;

  return (
    <>
      {movie && (
        <div>
          <h3>Selected Movie Details</h3>
          <p>Genre: {movie.genre}</p>
          <p>Director: {movie.director.name}</p>
        </div>
      )}
    </>
  );
}
```
