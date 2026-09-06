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

export interface AuthUser {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role: UserRole;
  accountStatus: AccountStatus;
  verificationStatus: VerificationStatus;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email?: string;
  phone?: string;
  password: string;
  role: "worker" | "contractor";
}

export interface ForgotPasswordPayload {
  identifier: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}