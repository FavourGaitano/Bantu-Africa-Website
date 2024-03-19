import { Router } from "express";
import {
  createupCommingEvent,
  deleteupCommingEvent,
  getoneupCommingEvent,
  getupCommingEvents,
  updateupCommingEvent,
} from "../controllers/upCommingEventController.js";

const upCommingEventRouter = Router();

upCommingEventRouter.get("/upcommingEvent", getupCommingEvents);
upCommingEventRouter.post("/upcommingEvent", createupCommingEvent);
upCommingEventRouter.get(
  "/upcommingEvent/:upcommingEventId",
  getoneupCommingEvent
);
upCommingEventRouter.delete(
  "/upcommingEvent/:upcommingEventId",
  deleteupCommingEvent
);
upCommingEventRouter.put(
  "/upcommingEvent/:upcommingEventId",
  updateupCommingEvent
);

export default upCommingEventRouter;
