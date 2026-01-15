import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config.js";
import bookingRouter from "./routes/booking.routes.js";
import authRouter from "./routes/auth.routes.js"

// เรียกใช้ Express ให้เป็นค่า app
export const app = express(); // Node.js

// ระบบความปลอดภัยของ Browser ที่คอยเช็คว่า ใครบ้างที่มีสิทธิ์มาดึงข้อมูลจาก Server ของเรา
const corsOption = {
  origin: ["http://localhost:5173/"], // อนุญาติให้ลิ้งค์นี้
};

// Midderware
app.use(morgan("dev"));
app.use(cors(corsOption)); // ประตูรักษาความปลอดภัย
app.use(express.json());

// API Routes
app.use("/booking", bookingRouter);
app.use("/api/login", authRouter);

// app เปิดประตูรอรับจาก Frontend เพื่อส่ง Response กลับไปถ้ามีการเรียก (GET)
app.get("/", (req, res) => {
  res.send(`Server is running (●'◡'●)`);
});
