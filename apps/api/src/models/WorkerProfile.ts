import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

import type {
  ExperienceLevel,
  VerificationStatus,
} from "../types/common.js";

export interface IWorkerProfile extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;

  fullName: string;
  bio?: string;

  location?: {
    division?: string;
    district?: string;
    area?: string;
  };

  skills: Types.ObjectId[];

  experienceLevel?: ExperienceLevel;
  yearsOfExperience?: number;

  availability: boolean;

  ratingAverage: number;
  completedJobs: number;

  verificationStatus: VerificationStatus;

  createdAt: Date;
  updatedAt: Date;
}

const workerProfileSchema =
  new Schema<IWorkerProfile>(
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

      bio: {
        type: String,
        trim: true,
        maxlength: 1000,
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

      skills: [
        {
          type: Schema.Types.ObjectId,
          ref: "Skill",
        },
      ],

      experienceLevel: {
        type: String,
        enum: [
          "entry",
          "intermediate",
          "experienced",
          "expert",
        ],
      },

      yearsOfExperience: {
        type: Number,
        min: 0,
        max: 80,
      },

      availability: {
        type: Boolean,
        default: true,
        index: true,
      },

      ratingAverage: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },

      completedJobs: {
        type: Number,
        default: 0,
        min: 0,
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
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

workerProfileSchema.index({
  "location.district": 1,
  availability: 1,
});

workerProfileSchema.index({
  skills: 1,
});

export const WorkerProfile =
  model<IWorkerProfile>(
    "WorkerProfile",
    workerProfileSchema,
  );