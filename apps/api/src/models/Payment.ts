import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

export type PaymentStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "refunded"
  | "cancelled";

export type PaymentMethod =
  | "cash"
  | "bank_transfer"
  | "mobile_financial_service"
  | "gateway"
  | "other";

export interface IPayment extends Document {
  _id: Types.ObjectId;

  invoiceId?: Types.ObjectId;

  payerId: Types.ObjectId;
  payeeId: Types.ObjectId;

  amount: number;
  currency: "BDT";

  method: PaymentMethod;

  status: PaymentStatus;

  provider?: string;
  providerTransactionId?: string;

  processedAt?: Date;

  failureReason?: string;

  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    invoiceId: {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
      index: true,
    },

    payerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    payeeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      enum: ["BDT"],
      default: "BDT",
      required: true,
    },

    method: {
      type: String,
      enum: [
        "cash",
        "bank_transfer",
        "mobile_financial_service",
        "gateway",
        "other",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "completed",
        "failed",
        "refunded",
        "cancelled",
      ],
      default: "pending",
      required: true,
      index: true,
    },

    provider: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    providerTransactionId: {
      type: String,
      trim: true,
      maxlength: 200,
      index: true,
    },

    processedAt: {
      type: Date,
    },

    failureReason: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

paymentSchema.index({
  payerId: 1,
  createdAt: -1,
});

paymentSchema.index({
  payeeId: 1,
  createdAt: -1,
});

export const Payment =
  model<IPayment>("Payment", paymentSchema);