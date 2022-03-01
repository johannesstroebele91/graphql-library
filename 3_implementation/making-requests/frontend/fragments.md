# Basics

Fragment enable to

- define a group of fields
- like quieries or mutation

This enables to

- reuse these definitions
- for mutliple quieries or mutation

# How To

1.  Create a variable
2.  Speficy the query or mutation using qgl and state:
    1.  Fragment name e.g. "JobDetail"
    2.  On which type the fragment needs to be applied (e.g. "type Job" in `job-board/server/schema.graphql`)
3.  Insert the variable at the end of the gql
    - using `${jobDetailFragement}`
    - to give access to the fragement
4.  Use the fragment with via its name (e.g. `...jobDetailFragement`)

# Example

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

export const MUTATION_CREATE_JOB = gql`
  mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragement}
`;
```
