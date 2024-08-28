import { useContext, useMemo } from "react";
import { JobType } from "../../types";
import { UserContext } from "../../contexts/userContext";
import { applyForJob } from "../../utils";
import { ApplicationContext } from "../../contexts/applicationsContext";

type JobCardProps = {
  job: JobType;
};
function JobCard({ job }: JobCardProps) {
  const user = useContext(UserContext);
  const { applications, refreshApplications } = useContext(ApplicationContext);

  const appliedJobs = useMemo(() => {
    const map: Record<number, string> = {};
    for (const app of applications) {
      map[app.jobId] = app.status;
    }
    return map;
  }, [applications]);

  if (!user) {
    return null;
  }

  const isFreelancer = user?.type === "FREELANCER";

  const applyHandler = () => {
    applyForJob(user?.id, job.id).then((res) => {
      if (res.statusCode && res.statusCode >= 400) {
        return;
      }
      refreshApplications();
      alert("Application submitted successfully");
    });
  };

  const editHandler = () => {};

  const deleteHandler = () => {};

  return (
    <article className="job-card">
      <div className="job-content">
        <h3>{job.title}</h3>
        <p>{job.description}</p>
        <div>
          {job.skills.split(",").map((skill) => (
            <span key={skill}>{skill.trim()}</span>
          ))}
        </div>
      </div>
      <div>
        {isFreelancer ? (
          <>
            <button onClick={applyHandler} disabled={!!appliedJobs[job.id]}>
              {appliedJobs[job.id] ? appliedJobs[job.id] : "Apply"}
            </button>
          </>
        ) : (
          <>
            <button onClick={editHandler}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
          </>
        )}
      </div>
    </article>
  );
}

export default JobCard;
