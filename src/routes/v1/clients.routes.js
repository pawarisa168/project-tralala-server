import { Router } from "express";
import {
  createClient,
  getClientbyme,
  getClientId,
} from "../../controller/clients.controller.js";

const clientsRouter = Router();

clientsRouter.post("/client", createClient);
clientsRouter.get("/client/me", getClientbyme);
clientsRouter.get("/clients/:id", getClientId);
export default clientsRouter;
