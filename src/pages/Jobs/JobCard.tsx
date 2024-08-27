import { useContext } from "react";
import { JobType } from "../../types";
import { UserContext } from "../../contexts/userContext";
import { applyForJob } from "../../utils";

type JobCardProps = {
  job: JobType;
};
function JobCard({ job }: JobCardProps) {
  const user = useContext(UserContext);
  if (!user) {
    return null;
  }

  const isFreelancer = user?.type === "FREELANCER";

  const applyHandler = () => {
    applyForJob(user?.id, job.id).then((res) => {
      if (res.statusCode && res.statusCode >= 400) {
        return;
      }
      alert("Application submitted successfully");
    });
  };

  const editHandler = () => {};

  const deleteHandler = () => {};

  return (
    <article>
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <div>
        {job.skills.split(",").map((skill) => (
          <span>{skill.trim()}</span>
        ))}
      </div>
      {isFreelancer ? (
        <div>
          <button onClick={applyHandler}>Apply</button>
        </div>
      ) : (
        <div>
          <button onClick={editHandler}>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      )}
    </article>
  );
}

export default JobCard;
