import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config.js";
import { router as apiService } from "./routes/service.routes.js";
import { router as apiLogin } from "./routes/auth.routes.js";

export const app = express();
const corsOption = {
  origin: ["http://localhost:5173"],
};

// Midderware
app.use(morgan("dev"));

app.use(cors(corsOption));

app.use(express.json());

app.use("/api/serivces", apiService);

app.use("/api/login", apiLogin);

app.get("/", (req, res) => {
  res.send(`Server is running (●'◡'●)`);
});
