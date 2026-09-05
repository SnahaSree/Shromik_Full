import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

export type AssignmentStatus =
  | "scheduled"
  | "active"
  | "completed"
  | "cancelled";

export interface IAssignment extends Document {
  _id: Types.ObjectId;

  workerId: Types.ObjectId;
  jobId: Types.ObjectId;
  projectId?: Types.ObjectId;

  contractorId: Types.ObjectId;

  startDate?: Date;
  endDate?: Date;

  status: AssignmentStatus;

  createdAt: Date;
  updatedAt: Date;
}

const assignmentSchema =
  new Schema<IAssignment>(
    {
      workerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true,
        index: true,
      },

      projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        index: true,
      },

      contractorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      startDate: {
        type: Date,
      },

      endDate: {
        type: Date,
      },

      status: {
        type: String,
        enum: [
          "scheduled",
          "active",
          "completed",
          "cancelled",
        ],
        default: "scheduled",
        required: true,
        index: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

/*
 * Prevent duplicate active assignments
 * for the same worker and job.
 */
assignmentSchema.index(
  {
    workerId: 1,
    jobId: 1,
  },
  {
    unique: true,
  },
);

assignmentSchema.index({
  workerId: 1,
  status: 1,
});

assignmentSchema.index({
  contractorId: 1,
  status: 1,
});

assignmentSchema.index({
  projectId: 1,
  status: 1,
});

export const Assignment =
  model<IAssignment>(
    "Assignment",
    assignmentSchema,
  );