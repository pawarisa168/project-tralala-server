import express from "express";
import cors from "cors";
import dotev from "dotenv";

dotev.config();

export const app = express();

const corsOption = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOption));

app.use(express.json);

app.get("/", (req, res) => {
  res.send(`Server is running (●'◡'●)`);
});
