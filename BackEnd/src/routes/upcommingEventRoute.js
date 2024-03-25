import { Router } from "express";
import {
  createupCommingEvent,
  deleteupCommingEvent,
  getAllUpcomingEventsController,
  getoneupCommingEvent,
  getupCommingEvents,
  updateupCommingEvent,
} from "../controllers/upCommingEventController.js";

const upCommingEventRouter = Router();

upCommingEventRouter.get("/events", getupCommingEvents);
upCommingEventRouter.get("/events/upcoming/date", getAllUpcomingEventsController);
upCommingEventRouter.post("/events", createupCommingEvent);
upCommingEventRouter.get("/events/single/:upcommingEventId", getoneupCommingEvent);
upCommingEventRouter.delete("/events/delete/:upcommingEventId", deleteupCommingEvent);
upCommingEventRouter.put("/events/update/:upcommingEventId",  updateupCommingEvent);

export default upCommingEventRouter;
