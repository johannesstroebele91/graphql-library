const db = require("./db");

// List jobs using JSON db
// Additional nested objects are possible
// Associations between different objects needs to be set in the resolver
const Query = {
  jobs: () => db.jobs.list(),
};

// Parent object for each company is the job
// which can be used to get the right company based on the id
// Returns the company for each job
const Job = {
  company: (job) => db.companies.get(job.companyId),
};

module.exports = { Query, Job };
