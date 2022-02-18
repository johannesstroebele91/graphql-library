const db = require("./db");

const Query = {
  // args contains the arguments passed in the GraphQL query
  // PS object destructuring can be used to make it easier to read
  // so NOT "args" but "{id}"
  job: (root, { id }) => db.jobs.get(id),
  // List jobs using JSON db
  // Additional nested objects are possible
  // Associations between different objects needs to be set in the resolver
  jobs: () => db.jobs.list(),
};

// Parent object for each company is the job
// which can be used to get the right company based on the id
// Returns the company for each job
const Job = {
  company: (job) => db.companies.get(job.companyId),
};

module.exports = { Query, Job };
