import React from "react";
import { Link } from "react-router-dom";
import { jobs } from "./fake-data";

export const JobDetail = (props) => {
  const { jobId } = props.match.params;
  const job = jobs.find((job) => job.id === jobId);

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
