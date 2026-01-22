import { generateText } from "../../services/gemini.client.js";

//    route handler: summarize caregiver work for handover
export const aiCaregiverWorkSummary = async (req, res, next) => {
  const { bid } = req.params;

  try {
    // 1. ดึงข้อมูล booking + senior + package (populate ได้แล้ว)
    const booking = await Booking.findById(bid)
      .select("clientNote caregiverReport seniorID packageID createdAt")
      .populate({
        path: "seniorID",
        select: "medicalProfile dob gender",
      })
      .populate({
        path: "packageID",
        select: "name description",
      });

    if (!booking) {
      return next(new Error("Booking not found"));
    }

    // 2. เตรียม context สำหรับ AI
    const context = `
Caregiver Work Information:
- Client note: ${booking.clientNote || "ไม่มีข้อมูล"}
- Caregiver report: ${booking.caregiverReport || "ไม่มีรายงานจากผู้ดูแล"}

Senior Information:
- Medical profile: ${
      booking.seniorID?.medicalProfile
        ? JSON.stringify(booking.seniorID.medicalProfile)
        : "ไม่มีข้อมูล"
    }
- Date of birth: ${booking.seniorID?.dob || "ไม่ทราบ"}
- Gender: ${booking.seniorID?.gender || "ไม่ระบุ"}

Service Information:
- Service name: ${booking.packageID?.name || "ไม่ระบุ"}
- Service description: ${booking.packageID?.description || "ไม่มีรายละเอียด"}
    `.trim();

    // 3. Prompt
    const prompt = [
      "SYSTEM RULES:",
      "- Answer ONLY using the Retrieved Context.",
      "- Do NOT invent information.",
      "- If some information is missing, clearly state that it is not available.",
      "- Do NOT repeat the retrieved context verbatim.",
      "",
      "BEGIN RETRIEVED CAREGIVER WORK CONTEXT",
      context,
      "END RETRIEVED CAREGIVER WORK CONTEXT",
      "",
      "INSTRUCTIONS:",
      "- You are a professional caregiver summarizing work after providing senior care.",
      "- Summarize what was done, key observations, and important notes for the next caregiver.",
      "- Focus on safety, behavior, and care continuity.",
      "- Write in Thai language.",
      "- Use clear, short bullet-style sentences.",
      "- Keep it easy to understand and practical.",
    ].join("\n");

    // 4. เรียก AI
    let summary;
    try {
      summary = await generateText({ prompt });
    } catch (err) {
      console.error("AI generation failed:", err?.message);
      summary = "ไม่สามารถสรุปข้อมูลได้จากข้อมูลที่มีอยู่";
    }

    // 5. save
    const updatedBooking = await Booking.findByIdAndUpdate(
      bid,
      { caregiverWorkSummary: summary },
      { new: true, runValidators: true },
    );

    if (!updatedBooking) {
      return next(new Error("Failed to update booking summary"));
    }

    // 6. response
    return res.status(200).json({
      success: true,
      message: "Caregiver work summary generated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    next(error);
  }
};
