import type {
  UserRole,
  AccountStatus,
} from "./common.js";

export interface AuthenticatedUser {
  userId: string;
  role: UserRole;
  accountStatus: AccountStatus;
}

export interface AccessTokenPayload {
  sub: string;
  role: UserRole;
  type: "access";
}

export interface RefreshTokenPayload {
  sub: string;
  type: "refresh";
}