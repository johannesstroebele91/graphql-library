import React, { useEffect, useState } from "react";
import { JobList } from "./JobList";
import { loadJobs } from "./requests";

export function JobBoard() {
  const [jobs, setJobs] = useState([]);

  //  load data from the server
  useEffect(() => {
    // A async function needs to be created to call loadJobs,
    // because useEffect cannot be made async!!!
    const fetchJobs = async () => {
      const jobs = await loadJobs();
      setJobs(jobs);
      console.log(jobs);
    };
    fetchJobs();
  }, [setJobs]);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}
