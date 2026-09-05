import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

import type { VerificationStatus } from "../types/common.js";

export interface IContractorProfile extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;

  fullName: string;
  businessName?: string;
  description?: string;

  location?: {
    division?: string;
    district?: string;
    area?: string;
  };

  verificationStatus: VerificationStatus;

  totalProjects: number;
  activeProjects: number;

  ratingAverage: number;

  createdAt: Date;
  updatedAt: Date;
}

const contractorProfileSchema =
  new Schema<IContractorProfile>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
        index: true,
      },

      fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
      },

      businessName: {
        type: String,
        trim: true,
        maxlength: 160,
      },

      description: {
        type: String,
        trim: true,
        maxlength: 1500,
      },

      location: {
        division: {
          type: String,
          trim: true,
        },

        district: {
          type: String,
          trim: true,
        },

        area: {
          type: String,
          trim: true,
        },
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

      totalProjects: {
        type: Number,
        default: 0,
        min: 0,
      },

      activeProjects: {
        type: Number,
        default: 0,
        min: 0,
      },

      ratingAverage: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

contractorProfileSchema.index({
  "location.district": 1,
  verificationStatus: 1,
});

export const ContractorProfile =
  model<IContractorProfile>(
    "ContractorProfile",
    contractorProfileSchema,
  );