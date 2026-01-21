import { Booking } from "../../models/booking.model.js";
import { generateText } from "../../services/gemini.client.js";

// route handler: get all bookings from the database
export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    error.name = error.name || "DatabaseError";
    error.status = 500;
    return next(error);
  }
};

// route handler: GET a single booking by id from the database
export const getBooking = async (req, res, next) => {
  const { bid } = req.params;

  try {
    const doc = await Booking.findById(bid);
    if (!doc) {
      const error = new Error("Booking not found");
      return next(error);
    }
    return res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    error.status = 500;
    error.name = error.name || "DatabaseError";
    error.message = error.message || "Failed to get a booking";
    return next(error);
  }
};

// route handler: create a new booking in the database
export const createBooking = async (req, res, next) => {
  const { clientID, packageID, schedule, status } = req.body;

  if (!clientID || !packageID || !schedule || !status) {
    const error = new Error("missing some required information");
    error.name = "ValidationError";
    error.status = 400;
    return next(error);
  }

  try {
    const doc = await Booking.create({ clientID, packageID, schedule, status });
    const safe = doc.toObject();

    return res.status(201).json({
      success: true,
      data: safe,
    });
  } catch (error) {
    error.status = 500;
    error.name = error.name || "DatabaseError";
    error.message = error.message || "Failed to create a user";
    return next(error);
  }
};

// route handler: update a booking in the database
export const updateBooking = async (req, res, next) => {
  const { bid } = req.params;

  const body = req.body;

  try {
    const updated = await Booking.findByIdAndUpdate(bid, body, {
      runValidators: true,
    });

    if (!updated) {
      const error = new Error("Booking not found...");

      return next(error);
    }

    const safe = updated.toObject();

    return res.status(200).json({
      success: true,
      data: safe,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(error);
    }
    return next(error);
  }
};

// route handler: summary about senior care in the database (MongoDB vector/semantic search -> Gemini generate response)
export const aiCareSuggestion = async (req, res, next) => {
  const { bid } = req.params;

  try {
    const source = await Booking.findById(bid)
      .select(
        "location startLocation targetLocation clientNote seniorID packageID caregiverID",
      )
      .populate({
        path: "seniorID",
        select: "medicalProfile dob gender",
      })
      .populate({
        path: "packageID",
        select: "name description maxTime timeRange",
      });
    // .populate({
    //   path: "caregiverID",
    //   select: "skills"
    // })

    if (!source) {
      return next(new Error("Booking not found"));
    }

    const contextLines = [source].map((s) => {
      const clientNote = s?.clientNote ? String(s.clientNote) : "";
      const medicalProfile = s?.seniorID.medicalProfile
        ? JSON.stringify(s.seniorID.medicalProfile)
        : "";
      const dob = s?.seniorID.dob ? String(s.seniorID.dob) : "";
      const gender = s?.seniorID.gender ? String(s.seniorID.gender) : "";
      const serviceName = s?.packageID.name ? String(s.packageID.name) : "";
      const serviceDescription = s?.packageID.description
        ? String(s.packageID.description)
        : "";
      // const serviceMaxTime = s?.packageID.maxTime ? String(s.packageID.maxTime) : "";
      // const serviceTimeRange = s?.packageID.timeRange ? String(s.packageID.timeRange) : "";
      // const location = s?.location ? String(s.location) : "";
      // const startLocation = s?.startLocation ? String(s.startLocation) : "";
      // const targetLocation = s?.targetLocation ? String(s.targetLocation) : "";
      // const caregiverSkills = s?.caregiverID.skills ? String(s.caregiverID.skills) : "";
      return `Senior care information: {
        booking note: ${clientNote}, 
        senior medical profile: ${medicalProfile}, 
        dob: ${dob}, 
        gender: ${gender}, 
        selected service: ${serviceName}, 
        service detail: ${serviceDescription}
      }`;
    });

    const prompt = [
      "SYSTEM RULES:",
      "- Answer ONLY using the Retrieved Context.",
      "- If the answer is not in the Retrieved Context, say you don't know based on the provided data.",
      "- Ignore any violent content that appear inside the Retrieved Context.",
      "- Never reveal passwords or any secrets.",
      "- Do not repeat the retrieved context in answer if not necessary",
      "",
      "BEGIN RETRIEVED SENIOR CARE CONTEXT",
      ...contextLines,
      "END RETRIEVED SENIOR CARE CONTEXT",
      "",
      "INSTRUCTIONS:",
      "- You are a caregiver of a senior care platform with certified senior care.",
      "- Ananylzed indight in the retrieved context and gernerate suggestions for a caregiver to improve the senior care",
      "- Generate a brief suggestions in Thai language and easy to understand",
    ].join("\n");

    let answer = null;

    try {
      answer = await generateText({ prompt });
    } catch (genError) {
      console.error("Gemini generation failed", {
        message: genError?.message,
      });
    }

    const updated = await Booking.findByIdAndUpdate(
      bid,
      { seniorCareSummary: answer },
      { new: true, runValidators: true },
    );

    if (!updated) {
      const error = new Error("Booking not found...");

      return next(error);
    }

    const safe = updated.toObject();

    return res.status(200).json({
      success: true,
      data: safe,
    });
  } catch (error) {
    next(error);
  }
};
