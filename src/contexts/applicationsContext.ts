import React from "react";
import { ApplicationType } from "../types";

type ApplicationContextType = {
  applications: ApplicationType[];
  refreshApplications: VoidFunction;
};

const ApplicationContext = React.createContext<ApplicationContextType>({
  applications: [],
  refreshApplications: () => void 0,
});

export { ApplicationContext };
