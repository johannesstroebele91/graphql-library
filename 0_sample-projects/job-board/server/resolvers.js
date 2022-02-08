const db = require("./db");

// List jobs using JSON db
const Query = {
  jobs: () => db.jobs.list(),
};

module.exports = { Query };
