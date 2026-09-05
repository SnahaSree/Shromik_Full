import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

import type {
  EmploymentType,
  ExperienceLevel,
  JobStatus,
} from "../types/common.js";

export interface IJob extends Document {
  _id: Types.ObjectId;

  contractorId: Types.ObjectId;
  companyId?: Types.ObjectId;

  title: string;
  description: string;

  skills: Types.ObjectId[];

  location: {
    division?: string;
    district?: string;
    area?: string;
  };

  employmentType: EmploymentType;
  experienceLevel?: ExperienceLevel;

  wage?: {
    amount?: number;
    period?: "hourly" | "daily" | "weekly" | "monthly" | "project";
    currency: "BDT";
  };

  duration?: {
    value: number;
    unit: "days" | "weeks" | "months";
  };

  workersNeeded: number;

  status: JobStatus;

  applicationDeadline?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    contractorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    skills: [
      {
        type: Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],

    location: {
      division: String,
      district: String,
      area: String,
    },

    employmentType: {
      type: String,
      enum: [
        "full_time",
        "part_time",
        "temporary",
        "project_based",
      ],
      required: true,
    },

    experienceLevel: {
      type: String,
      enum: [
        "entry",
        "intermediate",
        "experienced",
        "expert",
      ],
    },

    wage: {
      amount: {
        type: Number,
        min: 0,
      },

      period: {
        type: String,
        enum: [
          "hourly",
          "daily",
          "weekly",
          "monthly",
          "project",
        ],
      },

      currency: {
        type: String,
        enum: ["BDT"],
        default: "BDT",
      },
    },

    duration: {
      value: {
        type: Number,
        min: 1,
      },

      unit: {
        type: String,
        enum: ["days", "weeks", "months"],
      },
    },

    workersNeeded: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "open",
        "paused",
        "closed",
        "cancelled",
      ],
      default: "draft",
      required: true,
      index: true,
    },

    applicationDeadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

jobSchema.index({
  status: 1,
  createdAt: -1,
});

jobSchema.index({
  "location.district": 1,
  status: 1,
});

jobSchema.index({
  skills: 1,
  status: 1,
});

jobSchema.index({
  contractorId: 1,
  status: 1,
});

export const Job = model<IJob>("Job", jobSchema);