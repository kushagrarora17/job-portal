import { ProfileType } from "./types";

const API_BASE = "http://localhost:3000";

function callApi(
  url: string,
  config: {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: BodyInit;
  }
) {
  const { method, body } = config;

  return fetch(`${API_BASE}${url}`, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Profile page
export const getUserProfile: () => Promise<ProfileType> = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        name: "ksaj",
        email: "sncj@cdm.com",
        skills: "java,python",
        github: "ksokdo",
      });
    }, 0);
  });
};

export const saveUserProfile = (data: unknown, id?: number) => {
  const method = id ? "PUT" : "POST";
  return callApi("/freelancer", { method, body: JSON.stringify(data) });
};

export const fetchGithubRepos = () => {};

// Recruiter

// Listing Page
// export const saveUserProfile = () => {};

// export const saveUserProfile = () => {};

// export const saveUserProfile = () => {};
