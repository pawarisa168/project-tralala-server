import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router as apiRouter } from "./routes/index.js";
import { connectDB } from "./config/db.js";

const app = express();

// Middlewares
app.use(cors()); //allows cross Domains
app.use(morgan("dev")); //show log
app.use(express.json()); // read JSON

//Routing
app.use("/api", apiRouter);

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
