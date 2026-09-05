import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

export interface ICompany extends Document {
  _id: Types.ObjectId;

  name: string;
  description?: string;

  contactEmail?: string;
  contactPhone?: string;

  location?: {
    division?: string;
    district?: string;
    area?: string;
  };

  contractorIds: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

const companySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    contactPhone: {
      type: String,
      trim: true,
    },

    location: {
      division: String,
      district: String,
      area: String,
    },

    contractorIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

companySchema.index({ name: 1 });

export const Company =
  model<ICompany>("Company", companySchema);