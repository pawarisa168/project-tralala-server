import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config.js";
import mockRoutes from "./mock/index.js";
import servicesRouter from "./routes/services.routes.js";
import authRouter from "./routes/auth.routes.js";
import customersRouter from "./routes/customers.routes.js";

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
app.use("/api/mock", mockRoutes); // http://localhost:3000/api/mock
app.use("/api/service", servicesRouter); // http://localhost:3000/api/services
app.use("/api/auth", authRouter); // http://localhost:3000/api/auth
app.use("/api/customers", customersRouter); // http://localhost:3000/api/customers

// app เปิดประตูรอรับจาก Frontend เพื่อส่ง Response กลับไปถ้ามีการเรียก (GET)
app.get("/", (req, res) => {
  res.send(`Server is running (●'◡'●)`);
});
