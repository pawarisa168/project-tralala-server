// import { Caregiver } from "../../models/caregiver.model.js";
// import { Booking } from "../../models/booking.model.js";
// import services from "../../models/services.models.js";
import mongoose from "mongoose";
import { Caregiver } from "../../models/caregiver.model.js";
import { Booking } from "../../models/booking.model.js";
import { Senior } from "../../models/senior.model.js";

// helper: format เวลางานจาก booking
const formatWorkHours = (schedule) => {
  if (!schedule?.startDate || !schedule?.endDate) return "-";

  const start = new Date(schedule.startDate);
  const end = new Date(schedule.endDate);

  const startTime = start.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = end.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return start.getDate() !== end.getDate()
    ? `${startTime} - ${endTime}`
    : `${startTime} - ${endTime}`;
};

const calculateAge = (dob) => {
  if (!dob) return null;
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

/**
 * GET /api/v1/caregivers/me/overview
 */
export const getMyOverview = async (req, res) => {
  try {
    //    STEP 1: caregiver

    const caregiver = await Caregiver.findOne({ userId: req.user.id })
      .select("firstName lastName workStatus imageUrl")
      .lean();

    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found" });
    }

    //   bookings

    const bookings = await Booking.find({
      caregiverID: caregiver._id,
    })
      .select(
        "startLocation seniorID packageID caregiverID schedule status createdAt",
      )
      .sort({ createdAt: -1 })
      .lean();

    //   services

    const serviceIdsRaw = bookings
      .map((b) => b.packageID?.toString())
      .filter(Boolean);

    const uniqueServiceIds = [...new Set(serviceIdsRaw)];
    const serviceObjectIds = uniqueServiceIds.map(
      (id) => new mongoose.Types.ObjectId(id),
    );

    const servicesList = await mongoose.connection
      .collection("services")
      .find({ _id: { $in: serviceObjectIds } })
      .toArray();

    const serviceMap = {};
    servicesList.forEach((s) => {
      serviceMap[s._id.toString()] = s;
    });

    //  schedule (เดิม)

    const schedule = bookings.map((b) => ({
      id: b._id.toString(),
      date: b.schedule?.startDate || b.createdAt,
      service: serviceMap[b.packageID?.toString()]?.name || "ไม่พบบริการ",
      time: formatWorkHours(b.schedule),
      status: b.status,
    }));

    //  todayBooking

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayBooking = bookings.find((b) => {
      if (!b.schedule?.startDate) return false;
      const start = new Date(b.schedule.startDate);
      start.setHours(0, 0, 0, 0);
      return (
        start.getTime() === today.getTime() &&
        ["ACTIVE", "SCHEDULED"].includes(b.status)
      );
    });

    //  todayTask

    let todayTask = null;

    if (todayBooking) {
      const service = serviceMap[todayBooking.packageID?.toString()] || {};

      todayTask = {
        title: service.name || "งานดูแลผู้สูงอายุ",
        description: todayBooking.startLocation || "งานดูแลผู้สูงอายุวันนี้",
        workHours: formatWorkHours(todayBooking.schedule),
        duration: service.durationDay
          ? `${service.durationDay} วัน`
          : "ไม่ระบุ",
        price: service.price || 0,
        status: todayBooking.status,
      };
    }

    //  senior

    let senior = null;

    if (todayBooking?.seniorID) {
      const seniorDoc = await Senior.findById(todayBooking.seniorID)
        .select("firstName lastName dob")
        .lean();

      if (seniorDoc) {
        senior = {
          name: `${seniorDoc.firstName} ${seniorDoc.lastName}`,
          age: calculateAge(seniorDoc.dob),
        };
      }
    }

    //    เพิ่ม firstName / lastName ให้ caregiver

    console.log("===== RESPONSE PAYLOAD =====");
    console.log("caregiver:", {
      id: caregiver._id,
      firstName: caregiver.firstName,
      lastName: caregiver.lastName,
      name: `${caregiver.firstName} ${caregiver.lastName}`,
      workStatus: caregiver.workStatus,
      imageUrl: caregiver.imageUrl,
    });
    console.log("schedule:", schedule);
    console.log("todayTask:", todayTask);
    console.log("senior:", senior);
    console.log("services count:", servicesList.length);

    res.json({
      caregiver: {
        id: caregiver._id,
        firstName: caregiver.firstName,
        lastName: caregiver.lastName,
        name: `${caregiver.firstName} ${caregiver.lastName}`,
        workStatus: caregiver.workStatus,
        imageUrl: caregiver.imageUrl,
      },
      schedule,
      todayTask,
      senior,
      services: servicesList,
    });
  } catch (error) {
    console.error(" getMyOverview error:", error);
    res.status(500).json({
      message: "Failed to load caregiver overview",
      error: error.message,
    });
  }
};

if (!mongoose.models.Package) {
  const packageSchema = new mongoose.Schema(
    {
      name: String,
      description: String,
      maxTime: Number,
      timeRange: String,
      price: Number,
    },
    { timestamps: true },
  );

  mongoose.model("Package", packageSchema);
}

// export const getMyOverview = async (req, res) => {
//   try {
//     console.log("req.user:", req.user);

//     // 1. หา caregiver จาก userId
//     const caregiver = await Caregiver.findOne({ userId: req.user.id }).lean();

//     if (!caregiver) {
//       return res.status(404).json({ message: "Caregiver not found" });
//     }

//     console.log("caregiver._id:", caregiver._id);

//     // 2. กรอง booking เฉพาะที่ caregiverID ตรง
//     const bookings = await Booking.find({
//       caregiverID: caregiver._id, // ⭐ จุดสำคัญ
//     })
//       .sort({ createdAt: -1 })
//       .lean();

//     console.log("bookings count:", bookings.length);
//     console.log("bookings:", bookings);

//     // 3. ส่งกลับไปดูดิบ ๆ
//     res.json({
//       caregiverId: caregiver._id,
//       bookings,
//     });
//   } catch (error) {
//     console.error("❌ getMyOverview error:", error);
//     res.status(500).json({
//       message: "Failed to load bookings",
//       error: error.message,
//     });
//   }
// };

// export const getMyOverview = async (req, res) => {
//   try {
//     console.log("========== GET MY OVERVIEW ==========");
//     console.log("req.user:", req.user);

//     /* ===============================
//        STEP 1: หา caregiver จาก userId
//     =============================== */
//     const caregiver = await Caregiver.findOne({ userId: req.user.id })
//       .select("firstName lastName workStatus imageUrl")
//       .lean();

//     if (!caregiver) {
//       return res.status(404).json({ message: "Caregiver not found" });
//     }

//     console.log("caregiver:", caregiver);

//     /* ===============================
//        STEP 2: ดึง booking ทั้งหมดของ caregiver
//     =============================== */
//     const bookings = await Booking.find({
//       caregiverID: caregiver._id,
//     })
//       .sort({ createdAt: -1 })
//       .lean();

//     console.log("bookings count:", bookings.length);
//     console.log("sample booking:", bookings[0]);

//     /* ===============================
//        STEP 3: ดึง packageID (ตรงกับ services._id)
//     =============================== */
//     const serviceIds = [
//       ...new Set(bookings.map((b) => b.packageID?.toString()).filter(Boolean)),
//     ];

//     console.log("serviceIds:", serviceIds);

//     /* ===============================
//        STEP 4: ไปดึงข้อมูลจาก collection services
//     =============================== */
//     const servicesList = await services
//       .find({
//         _id: { $in: serviceIds },
//       })
//       .lean();

//     console.log("services found:", servicesList);

//     /* ===============================
//        STEP 5: สร้าง map (_id → name)
//     =============================== */
//     const serviceMap = {};
//     servicesList.forEach((s) => {
//       serviceMap[s._id.toString()] = s.name;
//     });

//     console.log("serviceMap:", serviceMap);

//     /* ===============================
//        STEP 6: แปลง booking → schedule
//     =============================== */
//     const schedule = bookings.map((b) => {
//       const serviceName =
//         serviceMap[b.packageID?.toString()] || "ไม่ระบุบริการ";

//       let time = "-";
//       if (b.schedule?.startDate && b.schedule?.endDate) {
//         const start = new Date(b.schedule.startDate);
//         const end = new Date(b.schedule.endDate);

//         const startTime = start.toLocaleTimeString("th-TH", {
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//         const endTime = end.toLocaleTimeString("th-TH", {
//           hour: "2-digit",
//           minute: "2-digit",
//         });

//         time =
//           start.getDate() !== end.getDate()
//             ? `${startTime} - ${endTime} (วันถัดไป)`
//             : `${startTime} - ${endTime}`;
//       }

//       return {
//         id: b._id,
//         date: b.schedule?.startDate || b.createdAt,
//         service: serviceName,
//         time,
//         status: b.status,
//       };
//     });

//     /* ===============================
//        STEP 7: ส่งข้อมูลกลับหน้าบ้าน
//     =============================== */
//     res.json({
//       caregiver: {
//         firstName: caregiver.firstName,
//         lastName: caregiver.lastName,
//         workStatus: caregiver.workStatus,
//         imageUrl: caregiver.imageUrl,
//       },
//       schedule,
//     });

//     console.log("========== END OVERVIEW ==========");
//   } catch (error) {
//     console.error("❌ getMyOverview error:", error);
//     res.status(500).json({
//       message: "Failed to load caregiver overview",
//       error: error.message,
//     });
//   }
// };
