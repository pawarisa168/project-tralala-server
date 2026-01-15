import { Booking } from "../../models/booking.model.js";

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
  const { id } = req.params;

  try {
    const doc = await Booking.findById(id);
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
  const { clientID, seniorID, packageID, schedule, location, startLocation, targetLocation, clientNote, status } = req.body;

  if (!clientID || !seniorID || !packageID || !schedule || !(location || !(startLocation && targetLocation)) || !status ) {
    const error = new Error("missing some required information");
    error.name = "ValidationError";
    error.status = 400;
    return next(error);
  }

  try {
    const doc = await Booking.create({ clientID, seniorID, packageID, schedule, startLocation, clientNote, status });
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
