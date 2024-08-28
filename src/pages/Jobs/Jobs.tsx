import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { getJobs } from "../../utils";
import { JobType } from "../../types";

const Jobs = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);

  useEffect(() => {
    getJobs().then((res) => {
      setJobs(res);
    });
  }, []);

  return (
    <div>
      <h3 className="page-heading">Jobs</h3>
      <div className="job-wrapper">
        {jobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
