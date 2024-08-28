import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { NavLink, useNavigate } from "react-router-dom";

type HeaderProps = {
  onLogout: VoidFunction;
};
function Header({ onLogout }: HeaderProps) {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    onLogout();
    navigate("/");
  };
  return (
    <header className="header">
      <h1>Job Finder</h1>

      {user && (
        <>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/jobs"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Jobs
                </NavLink>
              </li>
            </ul>
          </nav>

          <span>
            Hello, {user.name}! <button onClick={logoutHandler}>Log out</button>
          </span>
        </>
      )}
    </header>
  );
}

export default Header;
