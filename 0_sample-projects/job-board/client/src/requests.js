import {
  MUTATION_CREATE_JOB,
  QUERY_COMPANY,
  QUERY_JOB,
  QUERY_JOBS,
} from "./queries";

const endpointURL = "http://localhost:9000/graphql";

// GraphQL enables to pass dynamic variables into the query
// using the query keyword
// the variable needs to be specified like e.g. "$id: ID!"

// Operational name can be specified behind "query" for debugging only
// Variables can be specified in the playground in the query variables section like e.g. "{"id": "SJRAZDu_z"}"
// Better to make a flexible request via e.g. "graphQLRequest", if the content has only minor variations
// (optional variables need to be initialized with ""={}"")
async function graphqlRequest(query, variables = {}) {
  const response = await fetch(endpointURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });
  const responseBody = await response.json();

  if (responseBody.errors) {
    const message = responseBody.errors
      .map((error) => error.message)
      .join("\n");
    throw new Error(message);
  }

  return responseBody.data;
}

export async function loadJob(id) {
  const { job } = await graphqlRequest(QUERY_JOB, { id });
  return job;
}

export async function loadJobs() {
  const { jobs } = await graphqlRequest(QUERY_JOBS);
  return jobs;
}

export async function loadCompany(id) {
  const { company } = await graphqlRequest(QUERY_COMPANY, { id });
  return company;
}

export async function createJob(input) {
  const { job } = await graphqlRequest(MUTATION_CREATE_JOB, { input });
  return job;
}
