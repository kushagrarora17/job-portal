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
      <h2>Jobs</h2>
      <div>
        {jobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
