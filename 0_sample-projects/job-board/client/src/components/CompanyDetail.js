import React, { useEffect, useState } from "react";
import { loadCompany } from "../requests";

export const CompanyDetail = (props) => {
  const { companyId } = props.match.params;

  const [company, setCompany] = useState(null);

  //  load data from the server
  useEffect(() => {
    // A async function needs to be created to call loadCompany,
    // because useEffect cannot be made async!!!
    const fetchCompany = async () => {
      const fetchedCompany = await loadCompany(companyId);
      setCompany(fetchedCompany);
    };
    fetchCompany();
  }, [companyId]);

  if (!company) {
    return <p>Data is loading...</p>;
  }

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
    </div>
  );
};
