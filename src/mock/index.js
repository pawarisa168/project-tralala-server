import { Router } from "express";
import { getMockData } from "./mock.controller.js";

const routes = Router();

routes.get("/services", getMockData); // http://localhost:3000/api/mock/services

// routes.post("/creteServices", createMockData);

export default routes;
