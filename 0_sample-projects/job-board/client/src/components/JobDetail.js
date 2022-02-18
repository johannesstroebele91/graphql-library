import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadJob } from "./requests";

export const JobDetail = (props) => {
  const { jobId } = props.match.params;
  const [job, setJob] = useState(null);

  //  load data from the server
  useEffect(() => {
    // A async function needs to be created to call loadJob,
    // because useEffect cannot be made async!!!
    const fetchJob = async () => {
      const fetchedJob = await loadJob(jobId);
      setJob(fetchedJob);
    };
    fetchJob();
  }, [jobId, setJob]);

  if (!job) {
    return <p>Data is loading...</p>;
  }

  return (
    <div>
      <h1 className="title">{job.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">{job.description}</div>
    </div>
  );
};
