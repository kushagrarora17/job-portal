import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Link } from "react-router-dom";

type HeaderProps = {
  onLogout: VoidFunction;
};
function Header({ onLogout }: HeaderProps) {
  const user = useContext(UserContext);
  return (
    <header>
      <h1>Job We Met</h1>

      {user && (
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/applications">Applications</Link>
            </li>
          </ul>
          <div>
            Hello, {user.name}!<button onClick={onLogout}>Log out</button>
          </div>
        </nav>
      )}
      <hr />
    </header>
  );
}

export default Header;
