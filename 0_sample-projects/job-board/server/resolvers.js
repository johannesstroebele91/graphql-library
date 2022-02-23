const db = require("./db");

const Query = {
  jobs: () => db.jobs.list(),

  job: (root, { id }) => db.jobs.get(id),

  company: (root, { id }) => db.companies.get(id),
};

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

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

module.exports = { Query, Mutation, Job, Company };
