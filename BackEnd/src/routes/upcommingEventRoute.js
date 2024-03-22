import { Router } from "express";
import {
  createupCommingEvent,
  deleteupCommingEvent,
  getoneupCommingEvent,
  getupCommingEvents,
  updateupCommingEvent,
} from "../controllers/upCommingEventController.js";

const upCommingEventRouter = Router();

upCommingEventRouter.get("/events", getupCommingEvents);
upCommingEventRouter.post("/events", createupCommingEvent);
upCommingEventRouter.get("/events/single/:upcommingEventId", getoneupCommingEvent);
upCommingEventRouter.delete("/events/delete/:upcommingEventId", deleteupCommingEvent);
upCommingEventRouter.put("/events/update/:upcommingEventId",  updateupCommingEvent);

export default upCommingEventRouter;
