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

// GraphQL enables to pass dynamic variables into the query
// using the query keyword
// the variable needs to be specified like e.g. "$id: ID!"
// PS operational name can be specified behind "query" for debugging only
// PS variables can be specified in the playground in the query variables section like e.g. "{"id": "SJRAZDu_z"}"
export async function loadJob(id) {
  const response = await fetch(endpointURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query JobQuery($id: ID!) {
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
      `,
      variables: { id },
    }),
  });
  const responseBody = await response.json();
  return responseBody.data.job;
}
