import React from "react";
import { companies } from "./fake-data";

export const CompanyDetail = (props) => {
  const { companyId } = props.match.params;
  const company = companies.find((company) => company.id === companyId);

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
    </div>
  );
};
