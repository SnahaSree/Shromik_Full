import { Schema, model, type Document, type Types } from "mongoose";

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

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
      index: true,
    },

    phone: {
      type: String,
      trim: true,
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
      enum: ["worker", "contractor", "admin"],
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
      required: true,
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
      required: true,
      index: true,
    },

    emailVerifiedAt: {
      type: Date,
    },

    phoneVerifiedAt: {
      type: Date,
    },

    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.index(
  { role: 1, accountStatus: 1 },
);

export const User = model<IUser>("User", userSchema);