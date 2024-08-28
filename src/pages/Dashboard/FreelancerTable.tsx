import { ApplicationType } from "../../types";

function FreelancerTable({
  applications,
}: {
  applications: ApplicationType[];
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Recent Application</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app.id}>
            <td>{app.job.title}</td>
            <td>{app.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FreelancerTable;
