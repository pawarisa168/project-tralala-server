import { Router } from "express";
import { getMockData, createMockData } from "./mock.controller.js";

const routes = Router();

routes.get("/services", getMockData); // http://localhost:3000/api/mock/services

routes.post("/createService", createMockData); // http://localhost:3000/api/mock/createService

export default routes;