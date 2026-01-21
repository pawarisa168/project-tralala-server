import CareVisit from "../../models/carevisit.model.js";

// get data caregiver logs
export const getCaregiverLogs = async (req, res) => {
  try {
    const CaregiverLogs = await CareVisit.find();
    res.status(200).json({ data: CaregiverLogs });
    console.log(CaregiverLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "cannot get data log" });
  }
};
export const editCaregiverById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedVisit = await CareVisit.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedVisit) {
      return res.status(404).json({
        message: false,
        message: "care visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "edit caregiver by id",
      data: updatedVisit,
    });
  } catch (error) {
    console.error("Error at editCaregiverById:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "invalid care visit id",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "server error",
      });
    }
  }
};

export const getActiveCaregivers = async (req, res) => {
  const { id } = req.params;
  console.log("Caregiver ID", id);
  try {
    const lastestActivity = await CareVisit.findOne({
      _id: id,
    })
      .select("visitDate startTime status caregiverNote vitalSigns")
      .exec();

    if (!lastestActivity) {
      return res.status(404).json({
        success: false,
        message: "There is no history of visiting activities yet.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully retrieved latest activity data.",
      data: lastestActivity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

export const addActiveLog = async (req, res) => {
  try {
    console.log(200).json({
      success: true,
      message: "add active log",
    });
  } catch (error) {
    console.error(500).json({
      success: false,
      message: "server error",
    });
  }
};
