export const QUERY_JOBS = `{
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
      `;

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

export const QUERY_COMPANY = `query CompanyQuery($id: ID!) {
        company(id: $id) {
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

export const MUTATION_CREATE_JOB = `
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
