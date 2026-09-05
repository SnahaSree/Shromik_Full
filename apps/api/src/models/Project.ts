import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

export type ProjectStatus =
  | "planning"
  | "active"
  | "paused"
  | "completed"
  | "cancelled";

export interface IProject extends Document {
  _id: Types.ObjectId;

  contractorId: Types.ObjectId;
  companyId?: Types.ObjectId;

  name: string;
  description?: string;

  location?: {
    division?: string;
    district?: string;
    area?: string;
  };

  startDate?: Date;
  expectedEndDate?: Date;
  actualEndDate?: Date;

  status: ProjectStatus;

  createdAt: Date;
  updatedAt: Date;
}

const projectSchema =
  new Schema<IProject>(
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

      name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
      },

      description: {
        type: String,
        trim: true,
        maxlength: 3000,
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

      startDate: {
        type: Date,
      },

      expectedEndDate: {
        type: Date,
      },

      actualEndDate: {
        type: Date,
      },

      status: {
        type: String,
        enum: [
          "planning",
          "active",
          "paused",
          "completed",
          "cancelled",
        ],
        default: "planning",
        required: true,
        index: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

projectSchema.index({
  contractorId: 1,
  status: 1,
});

projectSchema.index({
  companyId: 1,
  status: 1,
});

projectSchema.index({
  "location.district": 1,
  status: 1,
});

export const Project =
  model<IProject>("Project", projectSchema);