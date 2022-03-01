const db = require("./db");

const Query = {
  getJobs: () => db.jobs.list(),
  getJob: (root, { id }) => db.jobs.get(id),
  getCompany: (root, { id }) => db.companies.get(id),
};

// Handle missing nested fields and objects
// 1) Poluates company field for Job type based on the specified GraphQL schema
const Job = {
  company: (job) => db.companies.get(job.companyId),
};

// 2) Poluates jobs field for Company type based on the specified GraphQL schema
const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id),
};

const Mutation = {
  createJob: (root, { input }, { user }) => {
    if (!user) {
      throw new Error("Unauthorized");
    }

    const id = db.jobs.create({ ...input, companyId: user.companyId });
    return db.jobs.get(id);
  },
};

module.exports = {
  Query,
  Mutation,
  Job,
  Company,
};
