import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router as apiRouter } from "./routes/index.js";
import apiMock from "./mock/index.js";
import { connectDB } from "./config/db.js";

export const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "https://project-tralala-react.vercel.app",
  ],
  credentials: true, // ✅ allow cookies to be sent
};

// Middlewares allows cross Domains
app.use(cors(corsOptions));
app.use(morgan("dev")); //show log
app.use(express.json()); // read JSON

//Routing
app.use("/api", apiRouter);
app.use("/api/mock", apiMock);

//Error handling
app.use((error, req, res, next) => {
  console.error(error);
  // MongoDB duplicate key error
  if (error.code === 11000) {
    return res.status(409).json({
      message: "ข้อมูลซ้ำ กรุณาใช้ข้อมูลอื่น",
    });
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "server error" });
});

const PORT = process.env.PORT || 3000;

try {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
} catch (error) {
  console.error("Startup failed", error);
  process.exit(1);
}
