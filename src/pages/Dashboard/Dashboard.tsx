import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import { ApplicationContext } from "../../contexts/applicationsContext";
import FreelancerTable from "./FreelancerTable";
import RecruiterTable from "./RecruiterTable";

function Dashboard() {
  const user = useContext(UserContext);
  const { applications } = useContext(ApplicationContext);

  if (!user) {
    return null;
  }
  return (
    <div>
      <h3 className="page-heading">Dashboard</h3>
      <h4 className="page-heading">{user?.type} Mode</h4>
      {user?.type === "FREELANCER" ? (
        <FreelancerTable applications={applications} />
      ) : (
        <RecruiterTable applications={applications} />
      )}
      {applications.length === 0 && <h4>No applications created yet</h4>}
    </div>
  );
}

export default Dashboard;
