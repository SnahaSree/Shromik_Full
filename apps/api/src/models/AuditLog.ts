import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

export interface IAuditLog extends Document {
  _id: Types.ObjectId;

  actorId?: Types.ObjectId;

  action: string;
  resource: string;
  resourceId?: Types.ObjectId;

  ipAddress?: string;
  userAgent?: string;

  metadata?: Record<string, unknown>;

  createdAt: Date;
}

const auditLogSchema =
  new Schema<IAuditLog>(
    {
      actorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },

      action: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150,
        index: true,
      },

      resource: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        index: true,
      },

      resourceId: {
        type: Schema.Types.ObjectId,
        index: true,
      },

      ipAddress: {
        type: String,
        trim: true,
        maxlength: 100,
      },

      userAgent: {
        type: String,
        trim: true,
        maxlength: 500,
      },

      metadata: {
        type: Schema.Types.Mixed,
      },
    },
    {
      timestamps: {
        createdAt: true,
        updatedAt: false,
      },
      versionKey: false,
    },
  );

auditLogSchema.index({
  createdAt: -1,
});

auditLogSchema.index({
  actorId: 1,
  createdAt: -1,
});

export const AuditLog =
  model<IAuditLog>(
    "AuditLog",
    auditLogSchema,
  );