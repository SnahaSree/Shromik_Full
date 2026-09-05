import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

export type TrainingCategory =
  | "safety"
  | "technical"
  | "behavior"
  | "tool_handling"
  | "first_aid"
  | "worker_rights"
  | "financial_literacy";

export interface ITrainingProgram extends Document {
  _id: Types.ObjectId;

  title: string;
  description: string;

  category: TrainingCategory;

  durationMinutes?: number;

  skills: Types.ObjectId[];

  isPublished: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const trainingProgramSchema =
  new Schema<ITrainingProgram>(
    {
      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
      },

      description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 3000,
      },

      category: {
        type: String,
        enum: [
          "safety",
          "technical",
          "behavior",
          "tool_handling",
          "first_aid",
          "worker_rights",
          "financial_literacy",
        ],
        required: true,
        index: true,
      },

      durationMinutes: {
        type: Number,
        min: 1,
      },

      skills: [
        {
          type: Schema.Types.ObjectId,
          ref: "Skill",
        },
      ],

      isPublished: {
        type: Boolean,
        default: false,
        index: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

trainingProgramSchema.index({
  category: 1,
  isPublished: 1,
});

export const TrainingProgram =
  model<ITrainingProgram>(
    "TrainingProgram",
    trainingProgramSchema,
  );