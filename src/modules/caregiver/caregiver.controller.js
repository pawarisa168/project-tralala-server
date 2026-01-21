import { Caregiver } from "../../models/caregiver.model.js";
import { Review } from "../../models/review.model.js";
import { mongoose } from "mongoose";

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

// caregiver ดูข้อมูลโปรไฟล์ตัวเอง
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    //เซ้คว่าเป็น caregiver
    const caregiver = await Caregiver.findOne({ userId })
      .populate("userId", "email username role")
      .select("firstName lastName");

    if (!caregiver) {
      return res.status(404).json({ message: "Not a caregiver" });
    }
    console.log(caregiver);

    res.json(caregiver);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get profile",
      error: error.message,
    });
  }
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

// รีวิว caregiver ตามไอดี
export const createReview = async (req, res) => {
  try {
    // 1. caregiverId มาจาก URL
    const caregiverId = req.params.id;
    // 2. userId มาจาก token
    const userId = req.user.id;
    // 3. ข้อมูลรีวิวจาก body
    const { rating, comment } = req.body;
    // 4. เช็กว่า id เป็น ObjectId ไหม
    if (!mongoose.Types.ObjectId.isValid(caregiverId)) {
      return res.status(400).json({ message: "Invalid caregiver id" });
    }
    // 5. เช็กว่า caregiver มีจริงไหม
    const caregiver = await Caregiver.findById(caregiverId);
    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found" });
    }

    const review = await Review.create(req.body);
    res.status(201).json({ message: "Thank you for your review", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot create review" });
  }
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
