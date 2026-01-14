import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router as authRouter } from "./routes/auth.routes.js";

const app = express();

// Middlewares allows cross Domains
app.use(cors());
app.use(morgan("dev")); //show log
app.use(express.json()); // read JSON

//Routing
app.use("/auth", authRouter);

//Error handling
app.use((err, req, res, next) => {
  res
    .status(err.code || 500)
    .json({ message: err.message || "something wrong!!!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
