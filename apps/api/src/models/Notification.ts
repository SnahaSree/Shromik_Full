import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

export type NotificationType =
  | "job"
  | "application"
  | "assignment"
  | "attendance"
  | "payment"
  | "training"
  | "verification"
  | "safety"
  | "system";

export interface INotification
  extends Document {
  _id: Types.ObjectId;

  userId: Types.ObjectId;

  type: NotificationType;

  title: string;
  message: string;

  link?: string;

  isRead: boolean;

  readAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema =
  new Schema<INotification>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      type: {
        type: String,
        enum: [
          "job",
          "application",
          "assignment",
          "attendance",
          "payment",
          "training",
          "verification",
          "safety",
          "system",
        ],
        required: true,
        index: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
      },

      message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
      },

      link: {
        type: String,
        trim: true,
        maxlength: 500,
      },

      isRead: {
        type: Boolean,
        default: false,
        index: true,
      },

      readAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

notificationSchema.index({
  userId: 1,
  isRead: 1,
  createdAt: -1,
});

export const Notification =
  model<INotification>(
    "Notification",
    notificationSchema,
  );