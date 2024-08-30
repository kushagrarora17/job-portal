import { JobType, ProfileType } from "./types";
import axios from "axios";

const API_BASE = "http://localhost:3000";

async function callApi(
  path: string,
  config: {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: Record<string, any>;
  }
) {
  const { method, body } = config;

  const { data } = await axios(`${API_BASE}${path}`, {
    method,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    return { data: null };
  });

  return data;
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
export const getJobs = (
  userid: number,
  userType: "FREELANCER" | "RECRUITER"
): Promise<JobType[]> => {
  let url = `/job/recruiter/${userid}`;
  if (userType === "FREELANCER") {
    url = `/job`;
  }
  return callApi(url, { method: "GET" });
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

export const deleteJob = (id: number): Promise<void> => {
  return callApi(`/job/${id}`, { method: "DELETE" });
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
