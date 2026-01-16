import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router as apiRouter } from "./routes/index.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 3000;

export const app = express();

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
    ],
    credentials: true // ✅ allow cookies to be sent
};

// Middlewares allows cross Domains
app.use(cors(corsOptions));
app.use(morgan("dev")); //show log
app.use(express.json()); // read JSON

//Routing
app.use("/api", apiRouter);

//Error handling
app.use((err, req, res, next) => {
  res
    .status(err.code || 500)
    .json({ message: err.message || "something wrong!!!" });
});

const PORT = process.env.PORT || 3000;

try {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
} catch (error) {
  console.error("Startup failed", error);
  process.exit(1);
}
