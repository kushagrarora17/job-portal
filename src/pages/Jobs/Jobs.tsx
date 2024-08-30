import { useContext, useEffect, useState } from "react";
import JobCard from "./JobCard";
import { getJobs } from "../../utils";
import { JobType } from "../../types";
import { UserContext } from "../../contexts/userContext";

const Jobs = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const user = useContext(UserContext);

  useEffect(() => {
    if (user) {
      getJobs(user.id, user.type).then((res) => {
        setJobs(res);
      });
    }
  }, []);

  const removeJob = (id: number) => {
    setJobs(jobs.filter((job) => id !== job.id));
  };

  return (
    <div>
      <h3 className="page-heading">Jobs</h3>
      <div className="job-wrapper">
        {jobs.map((job) => (
          <JobCard job={job} key={job.id} removeJob={removeJob} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
