import { JobType, ProfileType, UserContextType } from "./types";

const API_BASE = "http://localhost:3000";

function callApi(
  path: string,
  config: {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: Record<string, any>;
  }
) {
  const { method, body } = config;

  return fetch(`${API_BASE}${path}`, {
    method,
    body: JSON.stringify(body),
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
      alert("An error occured. Check console.");
    });
}

// Profile page
export const getUserProfile: (id: number) => Promise<ProfileType> = (
  id: number
) => {
  return callApi(`/freelancer/${id}`, { method: "GET" });
};

export const saveUserProfile = (data: Record<string, any>, id?: number) => {
  const method = id ? "PUT" : "POST";
  return callApi("/freelancer", { method, body: data });
};

export const fetchGithubRepos = () => {};

// Recruiter

// Jobs Page
export const getJobs = (): Promise<JobType[]> => {
  return callApi("/job", { method: "GET" });
};

export const applyForJob = (freelancerId: number, jobId: number) => {
  return callApi("/application", {
    method: "POST",
    body: {
      freelancerId,
      jobId,
    },
  });
};

export const getApplications = (
  userId: number,
  userType: "FREELANCER" | "RECRUITER"
) => {
  if (userType === "FREELANCER") {
    return callApi(`/application/freelancer/${userId}`, {
      method: "GET",
    });
  }
  return callApi(`/application/recruiter/${userId}`, {
    method: "GET",
  });
};

// export const saveUserProfile = () => {};

// export const saveUserProfile = () => {};
