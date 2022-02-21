const db = require("./db");

// 1) QUERY
const Query = {
  // args contains the arguments passed in the GraphQL query
  // PS object destructuring can be used to make it easier to read
  // so NOT "args" but "{id}"
  job: (root, { id }) => db.jobs.get(id),

  // List jobs using JSON db
  // Additional nested objects are possible
  // Associations between different objects needs to be set in the resolver
  jobs: () => db.jobs.list(),

  company: (root, { id }) => db.companies.get(id),
};

// Parent object for each company is the job
// which can be used to get the right company based on the id
// Returns the company for each job
const Job = {
  company: (job) => db.companies.get(job.companyId),
};

const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id),
};

// 2) MUTATION
// Parameters
// a) parent object (root)
// b) object based on the GraphQL arguments defined in the schema
const Mutation = {
  createJob: (root, { input }) => {
    const id = db.jobs.create(input);
    return db.jobs.get(id);
  },
};

module.exports = { Query, Mutation, Job, Company };
