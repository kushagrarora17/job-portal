import React from "react";
import { UserContextType } from "../types";

type LoginPanelProps = {
  setLogin: (user: UserContextType) => void;
};

const users: UserContextType[] = [
  {
    id: 1,
    name: "Harry",
    type: "FREELANCER",
  },
  {
    id: 2,
    name: "Ron",
    type: "FREELANCER",
  },
  {
    id: 3,
    name: "Hermoine",
    type: "FREELANCER",
  },
  {
    id: 1,
    name: "Dumbledore",
    type: "RECRUITER",
  },
  {
    id: 2,
    name: "Snape",
    type: "RECRUITER",
  },
  {
    id: 3,
    name: "Sirius",
    type: "RECRUITER",
  },
];

function LoginPanel({ setLogin }: LoginPanelProps) {
  return (
    <div>
      {users.map(
        (user) =>
          user && (
            <button key={user.name} onClick={() => setLogin(user)}>
              <div>{user.name}</div>
              <div>{user.type}</div>
            </button>
          )
      )}
    </div>
  );
}

export default LoginPanel;
