import { useMemo } from "react";
import { ApplicationType } from "../../types";

function RecruiterTable({ applications }: { applications: ApplicationType[] }) {
  const applicationFrequencyMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (let index = 0; index < applications.length; index++) {
      const app = applications[index];
      if (map[app.job.title]) {
        map[app.job.title]++;
      } else {
        map[app.job.title] = 1;
      }
    }
    return map;
  }, [applications]);
  return (
    <table>
      <thead>
        <tr>
          <th>Job Profiles</th>
          <th>Application Count</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(applicationFrequencyMap).map(([key, val]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default RecruiterTable;
