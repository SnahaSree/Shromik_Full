export type UserRole =
  | "worker"
  | "contractor"
  | "admin";

export type AccountStatus =
  | "pending"
  | "active"
  | "suspended"
  | "deactivated";

export type VerificationStatus =
  | "pending"
  | "verified"
  | "rejected"
  | "suspended";

export type JobStatus =
  | "draft"
  | "open"
  | "paused"
  | "closed"
  | "cancelled";

export type EmploymentType =
  | "full_time"
  | "part_time"
  | "temporary"
  | "project_based";

export type ExperienceLevel =
  | "entry"
  | "intermediate"
  | "experienced"
  | "expert";