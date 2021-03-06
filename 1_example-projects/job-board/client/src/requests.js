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

export async function loadJobs() {
  const {
    data: { getJobs },
  } = await client.query({ query: QUERY_JOBS, fetchPolicy: "no-cache" }); // more easy syntax: `data` an then `data.jobs`
  return getJobs;
}

export async function loadJob(id) {
  const {
    data: { getJob },
  } = await client.query({ query: QUERY_JOB, variables: { id } });
  return getJob;
}

export async function loadCompany(id) {
  const {
    data: { getCompany },
  } = await client.query({ query: QUERY_COMPANY, variables: { id } });
  return getCompany;
}

export async function createJob(input) {
  const {
    data: { getJob },
  } = await client.mutate({
    mutation: MUTATION_CREATE_JOB,
    variables: { input },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: QUERY_JOB,
        variables: { id: data.job.id },
        data: data,
      });
    },
  });
  return getJob;
}
