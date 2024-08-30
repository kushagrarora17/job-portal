import "./App.css";
import { BrowserRouter, redirect, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Jobs from "./pages/Jobs/Jobs";
import { UserContext } from "./contexts/userContext";
import React from "react";
import { ApplicationType, UserContextType } from "./types";
import Header from "./components/Header";
import LoginPanel from "./components/LoginPanel";
import { ApplicationContext } from "./contexts/applicationsContext";
import { getApplications } from "./utils";
import Dashboard from "./pages/Dashboard/Dashboard";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const userFromStorage = sessionStorage.getItem("user");

  const [user, setUser] = React.useState<UserContextType>(
    userFromStorage ? JSON.parse(userFromStorage) : null
  );
  const [applications, setApplications] = React.useState<ApplicationType[]>([]);

  const sessionHandler = (user: UserContextType) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const applicationHandler = (newApplications: ApplicationType[]) => {
    setApplications(newApplications);
  };

  const fetchApplications = (user: UserContextType) => {
    if (user === null) {
      applicationHandler([]);
    } else {
      getApplications(user.id, user.type).then((apps) => {
        applicationHandler(apps);
      });
    }
  };

  React.useEffect(() => {
    fetchApplications(user);
  }, [user]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <ApplicationContext.Provider
          value={{
            applications,
            refreshApplications: () => fetchApplications(user),
          }}
        >
          <div>
            <Header onLogout={() => sessionHandler(null)} />
            <main className="main">
              <ErrorBoundary fallback={<div>Something went wrong</div>}>
                {!user && <LoginPanel setLogin={sessionHandler} />}
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/profile" element={<Profile />} />
                  {/* <Route path="/applications" element={} /> */}
                </Routes>
              </ErrorBoundary>
            </main>
          </div>
        </ApplicationContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
