import "./App.css";
import { BrowserRouter, redirect, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Jobs from "./pages/Jobs/Jobs";
import { UserContext } from "./contexts/userContext";
import React from "react";
import { UserContextType } from "./types";
import Header from "./components/Header";
import LoginPanel from "./components/LoginPanel";

function App() {
  const userFromStorage = sessionStorage.getItem("user");
  const [user, setUser] = React.useState<UserContextType>(
    userFromStorage ? JSON.parse(userFromStorage) : null
  );

  const sessionHandler = (user: UserContextType) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    console.log({ user });
    if (user === null) {
      redirect("/");
    }
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <div>
          <Header onLogout={() => sessionHandler(null)} />
          {!user && <LoginPanel setLogin={sessionHandler} />}
          <Routes>
            <Route path="/" element={null} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/create-job" element={} /> */}
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
