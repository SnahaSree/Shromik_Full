import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

import type {
  AccountStatus,
  UserRole,
  VerificationStatus,
} from "../types/common.js";

export interface IUser extends Document {
  _id: Types.ObjectId;

  email?: string;
  phone?: string;

  passwordHash: string;

  role: UserRole;

  accountStatus: AccountStatus;

  verificationStatus: VerificationStatus;

  emailVerifiedAt?: Date;
  phoneVerifiedAt?: Date;

  lastLoginAt?: Date;

  refreshTokenHash?: string;

  passwordResetTokenHash?: string;
  passwordResetExpiresAt?: Date;

  verificationTokenHash?: string;
  verificationTokenExpiresAt?: Date;

  failedLoginAttempts: number;
  lockedUntil?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema =
  new Schema<IUser>(
    {
      email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        sparse: true,
        index: true,
      },

      phone: {
        type: String,
        trim: true,
        unique: true,
        sparse: true,
        index: true,
      },

      passwordHash: {
        type: String,
        required: true,
        select: false,
      },

      role: {
        type: String,
        enum: [
          "worker",
          "contractor",
          "admin",
        ],
        required: true,
        index: true,
      },

      accountStatus: {
        type: String,
        enum: [
          "pending",
          "active",
          "suspended",
          "deactivated",
        ],
        default: "pending",
        index: true,
      },

      verificationStatus: {
        type: String,
        enum: [
          "pending",
          "verified",
          "rejected",
          "suspended",
        ],
        default: "pending",
        index: true,
      },

      emailVerifiedAt: Date,

      phoneVerifiedAt: Date,

      lastLoginAt: Date,

      refreshTokenHash: {
        type: String,
        select: false,
      },

      passwordResetTokenHash: {
        type: String,
        select: false,
      },

      passwordResetExpiresAt: {
        type: Date,
        select: false,
      },

      verificationTokenHash: {
        type: String,
        select: false,
      },

      verificationTokenExpiresAt: {
        type: Date,
        select: false,
      },

      failedLoginAttempts: {
        type: Number,
        default: 0,
      },

      lockedUntil: Date,
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

export const User =
  model<IUser>(
    "User",
    userSchema,
  );