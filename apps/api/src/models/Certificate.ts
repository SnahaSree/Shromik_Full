import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

export interface ICertificate extends Document {
  _id: Types.ObjectId;

  workerId: Types.ObjectId;
  trainingProgramId: Types.ObjectId;

  certificateNumber: string;

  issuedAt: Date;

  expiresAt?: Date;

  verificationStatus:
    | "valid"
    | "expired"
    | "revoked";

  createdAt: Date;
  updatedAt: Date;
}

const certificateSchema =
  new Schema<ICertificate>(
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

      certificateNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 100,
      },

      issuedAt: {
        type: Date,
        required: true,
        default: Date.now,
      },

      expiresAt: {
        type: Date,
      },

      verificationStatus: {
        type: String,
        enum: [
          "valid",
          "expired",
          "revoked",
        ],
        default: "valid",
        required: true,
        index: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

certificateSchema.index({
  workerId: 1,
  verificationStatus: 1,
});

export const Certificate =
  model<ICertificate>(
    "Certificate",
    certificateSchema,
  );