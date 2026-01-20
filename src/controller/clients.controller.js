import client from "../models/clients.model.js";

export const createClient = async (req, res) => {
  const { firstName, lastName, relationship, phone, email } = req.body;

  if (!firstName || !lastName || !relationship || !phone || !email) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }
  try {
    const newClient = await client.create({
      guardian: {
        firstName,
        lastName,
        relationship,
        phone,
        email,
      },
    });
    const safe = newClient.toObject();
    return res.status(201).json({
      success: true,
      message: "Client created successfully",
      data: safe,
    });
  } catch (error) {
    console.error("Error code:", error.code);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate Entry",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};













export const getClientbyme = async (req, res) => {
  try {
    const client = await client.find();
    console.log("Database Data:", client);
    res.status(200).json({
      success: true,
      message: "Is'me ",
      data: client,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};



















export const getClientId = async (req, res) => {
  const { id } = req.params;
  console.log("Client ID:", id);
  try {
    const clientId = await client.findById(id);
    if (!clientId) {
      const err = new Error("Client not found");
      err.code = "NOT_FOUND";
      throw err;
  }
    res.status(200).json({
      success: true,
      message: "Look some client",
      data: clientId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};
