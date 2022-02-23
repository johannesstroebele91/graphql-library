import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "apollo-boost";
import { getAccessToken, isLoggedIn } from "./auth";
import {
  MUTATION_CREATE_JOB,
  QUERY_COMPANY,
  QUERY_JOB,
  QUERY_JOBS,
} from "./queries";

const endpointURL = "http://localhost:9000/graphql";

// Parameters of ApolloLink
// operation: GraphQL query or mutation
// forward: function to chain multiple steps together
// Important: "authLink"  property needs to be stated before "link"!)
const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    operation.setContext({
      headers: { authorization: "Bearer " + getAccessToken() },
    });
  }

  return forward(operation);
});
const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: endpointURL })]),
  cache: new InMemoryCache({}),
});

// GraphQL enables to pass dynamic variables into the query
// using the query keyword
// the variable needs to be specified like e.g. "$id: ID!"

// Operational name can be specified behind "query" for debugging only
// Variables can be specified in the playground in the query variables section like e.g. "{"id": "SJRAZDu_z"}"
// Better to make a flexible request via e.g. "graphQLRequest", if the content has only minor variations
// (optional variables need to be initialized with ""={}"")
/* JUST FOR REFERENCE
async function graphqlRequest(query, variables = {}) {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };
  if (isLoggedIn()) {
    request.headers["authorization"] = "Bearer " + getAccessToken();
  }

  const response = await fetch(endpointURL, request);
  const responseBody = await response.json();

  if (responseBody.errors) {
    const message = responseBody.errors
      .map((error) => error.message)
      .join("\n");
    throw new Error(message);
  }

  return responseBody.data;
} */

export async function loadJob(id) {
  const {
    data: { job },
  } = await client.query({ query: QUERY_JOB, variables: { id } });
  return job;
}

export async function loadJobs() {
  const {
    data: { jobs },
  } = await client.query({ query: QUERY_JOBS }); // more easy syntax: `data` an then `data.jobs`
  return jobs;
}

export async function loadCompany(id) {
  const {
    data: { company },
  } = await client.query({ query: QUERY_COMPANY, variables: { id } });
  return company;
}

export async function createJob(input) {
  const {
    data: { job },
  } = await client.mutate({
    mutation: MUTATION_CREATE_JOB,
    variables: { input },
  });
  return job;
}
