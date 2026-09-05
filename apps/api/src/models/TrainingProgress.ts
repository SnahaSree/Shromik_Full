import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

export type TrainingProgressStatus =
  | "not_started"
  | "in_progress"
  | "completed";

export interface ITrainingProgress
  extends Document {
  _id: Types.ObjectId;

  workerId: Types.ObjectId;
  trainingProgramId: Types.ObjectId;

  status: TrainingProgressStatus;

  progressPercentage: number;

  startedAt?: Date;
  completedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const trainingProgressSchema =
  new Schema<ITrainingProgress>(
    {
      workerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      trainingProgramId: {
        type: Schema.Types.ObjectId,
        ref: "TrainingProgram",
        required: true,
        index: true,
      },

      status: {
        type: String,
        enum: [
          "not_started",
          "in_progress",
          "completed",
        ],
        default: "not_started",
        required: true,
        index: true,
      },

      progressPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },

      startedAt: {
        type: Date,
      },

      completedAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

trainingProgressSchema.index(
  {
    workerId: 1,
    trainingProgramId: 1,
  },
  {
    unique: true,
  },
);

export const TrainingProgress =
  model<ITrainingProgress>(
    "TrainingProgress",
    trainingProgressSchema,
  );