import mongoose, { Schema } from "mongoose";

const { Schema, model } = mongoose;

const CareVisitSchema = new Schema(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true,
    },
    visitDate: {
      type: Date,
      required: true,
      index: true,
    },
    // เวลาเริ่มต้นที่กำหนด
    startTime: {
      type: Date,
      required: true,
    },

    // เวลาสิ้นสุดที่กำหนด
    endTime: {
      type: Date,
      required: true,
    },
    vitalSigns: {
      pulse: {
        type: Number,
        min: 0,
      },
      bloodPressure: {
        type: String,
        trim: true,
      },
      bloodSugar: {
        type: Number,
        min: 0,
      },
    },
    caregiverNotes: {
      note: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    status: {
      type: String,
      enum: ["PENDING", "ONGOING", "DONE"],
      default: "PENDING",
      index: true,
    },
  },
  { timestamps: true },
);

export const CareVisit = model("CareVisit", CareVisitSchema);
