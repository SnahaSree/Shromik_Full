import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

export interface ISkill extends Document {
  _id: Types.ObjectId;

  name: string;
  category: string;
  description?: string;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      index: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

skillSchema.index(
  { name: 1, category: 1 },
  { unique: true },
);

export const Skill =
  model<ISkill>("Skill", skillSchema);