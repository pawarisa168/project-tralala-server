import mongoose from "mongoose";

// SENIOR
// data model of seniors based on designed data schema of seniors collection
const seniorSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  dob: { type: Date, default: null, required: true },
  medicalProfile: {
    mobilityLevel: { type: String, trim: true },
    cognitiveStatus: { type: String, trim: true },
    allergies: { type: Array, trim: true },
    chronicConditions: { type: Array, trim: true },
  },
});

export const Senior = mongoose.model("Senior", seniorSchema);
