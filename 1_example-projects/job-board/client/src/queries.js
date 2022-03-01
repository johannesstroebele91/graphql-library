import gql from "graphql-tag";

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

export const QUERY_JOBS = gql`
  {
    getJobs {
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

export const QUERY_JOB = gql`
  query JobQuery($id: ID!) {
    getJob(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragement}
`;

export const QUERY_COMPANY = gql`
  query CompanyQuery($id: ID!) {
    getCompany(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }
`;

export const MUTATION_CREATE_JOB = gql`
  mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragement}
`;
