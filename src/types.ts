export type UserContextType = {
  name: string;
  id: number;
  type: "FREELANCER" | "RECRUITER";
} | null;

export type ProfileType = {
  id?: number;
  name: string;
  email: string;
  skills: string;
  github: string;
};

export type JobType = {
  id: number;
  title: string;
  description: string;
  skills: string;
  recruiterId: number;
};
