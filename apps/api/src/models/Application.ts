import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

export type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "shortlisted"
  | "accepted"
  | "rejected"
  | "withdrawn";

export interface IApplication extends Document {
  _id: Types.ObjectId;

  jobId: Types.ObjectId;
  workerId: Types.ObjectId;

  status: ApplicationStatus;

  coverMessage?: string;

  reviewedAt?: Date;
  acceptedAt?: Date;
  rejectedAt?: Date;
  withdrawnAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema =
  new Schema<IApplication>(
    {
      jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true,
        index: true,
      },

      workerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "reviewed",
          "shortlisted",
          "accepted",
          "rejected",
          "withdrawn",
        ],
        default: "pending",
        required: true,
        index: true,
      },

      coverMessage: {
        type: String,
        trim: true,
        maxlength: 1000,
      },

      reviewedAt: {
        type: Date,
      },

      acceptedAt: {
        type: Date,
      },

      rejectedAt: {
        type: Date,
      },

      withdrawnAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

/*
 * A worker should not be able to submit
 * multiple active applications for the same job.
 */
applicationSchema.index(
  {
    jobId: 1,
    workerId: 1,
  },
  {
    unique: true,
  },
);

applicationSchema.index({
  workerId: 1,
  status: 1,
  createdAt: -1,
});

applicationSchema.index({
  jobId: 1,
  status: 1,
  createdAt: -1,
});

export const Application =
  model<IApplication>(
    "Application",
    applicationSchema,
  );