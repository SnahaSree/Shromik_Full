import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

export type InvoiceStatus =
  | "draft"
  | "pending"
  | "paid"
  | "cancelled";

export interface IInvoice extends Document {
  _id: Types.ObjectId;

  contractorId: Types.ObjectId;
  workerId?: Types.ObjectId;
  projectId?: Types.ObjectId;
  assignmentId?: Types.ObjectId;

  invoiceNumber: string;

  description?: string;

  amount: number;
  currency: "BDT";

  status: InvoiceStatus;

  issueDate: Date;
  dueDate?: Date;
  paidAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const invoiceSchema = new Schema<IInvoice>(
  {
    contractorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    workerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      index: true,
    },

    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      index: true,
    },

    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 80,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
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

    status: {
      type: String,
      enum: [
        "draft",
        "pending",
        "paid",
        "cancelled",
      ],
      default: "draft",
      required: true,
      index: true,
    },

    issueDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    dueDate: {
      type: Date,
    },

    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

invoiceSchema.index({
  contractorId: 1,
  status: 1,
  createdAt: -1,
});

invoiceSchema.index({
  workerId: 1,
  status: 1,
  createdAt: -1,
});

export const Invoice =
  model<IInvoice>("Invoice", invoiceSchema);