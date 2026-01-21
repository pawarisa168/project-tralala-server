import { Caregiver } from "../../models/caregiver.model.js";

// create caregiverprofile สร้างโปรไฟล์ caregiver
export const createCaregiverProfile = async (req, res) => {
  try {
    const caregiver = await Caregiver.create(req.body);

    res.status(201).json({
      message: "Caregiver profile created successfully",
      data: caregiver,
    });
  } catch (error) {
    console.error("CREATE CAREGIVER ERROR:", error);

    res.status(400).json({
      message: error.message,
    });
  }
};

// updateCaregiver แก้ไขข้อมูลของcaregiver
export const updateCaregiver = async (req, res) => {
  try {
    console.log(req.params.id);
    const id = req.params.id;
    const updateCaregiverprofile = await Caregiver.findByIdAndUpdate(
      {
        _id: id,
      },
      req.body,
      { new: true },
    ).exec();
    console.log(id);
    res.json(updateCaregiverprofile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "cannot update caregiver" });
  }
};

// list All caregivers ดู caregiver ทั้งหมด
export const getAllCaregivers = async (req, res) => {
  try {
    const allCaregivers = await Caregiver.find();

    res.status(200).json(allCaregivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "cannot getall" });
  }
};

//read by _id
export const getCaregiverById = async (req, res) => {
  try {
    const id = req.params.id;
    const readcaregiver = await Caregiver.findOne({ _id: id }).exec();
    console.log(req.params.id);
    res.json(readcaregiver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "cannot get caregiver" });
  }
};

// caregiver ดูข้อมูลโปรไฟล์ตัวเอง
export const getMyProfile = async (req, res) => {
  try {
  } catch (error) {}
};

//caregiver ดูข้อมูล dashboard ของตัวเอง
export const getMyOverview = async (req, res) => {
  try {
  } catch (error) {}
};

//caregiver ดูข้อมูลตารางงานที่ได้รับ
export const getMySchedule = async (req, res) => {
  try {
  } catch (error) {}
};

// รีวิว caregiver ตามไอดี
export const createReview = async (req, res) => {
  try {
  } catch (error) {}
};

//ดึงข้อมูลการรีวิว caregiver ตามไอดีตาม caregiver
export const getReviewsByCaregiverId = async (req, res) => {
  try {
  } catch (error) {}
};

//เปลี่ยนรูปภาพ
export const updateCaregiverPicture = async (req, res) => {
  try {
  } catch (error) {}
};
