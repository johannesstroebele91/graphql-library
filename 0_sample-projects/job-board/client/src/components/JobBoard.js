import { JobList } from "./JobList";
const { jobs } = require("./fake-data");

export function JobBoard() {
  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}
