import {
  Schema,
  model,
  type Document,
  type Types,
} from "mongoose";

export type AttendanceStatus =
  | "present"
  | "absent"
  | "late"
  | "half_day"
  | "leave";

export interface IAttendance extends Document {
  _id: Types.ObjectId;

  assignmentId: Types.ObjectId;

  workerId: Types.ObjectId;
  projectId?: Types.ObjectId;

  date: Date;

  status: AttendanceStatus;

  checkInAt?: Date;
  checkOutAt?: Date;

  note?: string;

  recordedBy: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const attendanceSchema =
  new Schema<IAttendance>(
    {
      assignmentId: {
        type: Schema.Types.ObjectId,
        ref: "Assignment",
        required: true,
        index: true,
      },

      workerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        index: true,
      },

      date: {
        type: Date,
        required: true,
        index: true,
      },

      status: {
        type: String,
        enum: [
          "present",
          "absent",
          "late",
          "half_day",
          "leave",
        ],
        required: true,
      },

      checkInAt: {
        type: Date,
      },

      checkOutAt: {
        type: Date,
      },

      note: {
        type: String,
        trim: true,
        maxlength: 500,
      },

      recordedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

/*
 * One attendance record per assignment per day.
 */
attendanceSchema.index(
  {
    assignmentId: 1,
    date: 1,
  },
  {
    unique: true,
  },
);

attendanceSchema.index({
  workerId: 1,
  date: -1,
});

attendanceSchema.index({
  projectId: 1,
  date: -1,
});

export const Attendance =
  model<IAttendance>(
    "Attendance",
    attendanceSchema,
  );