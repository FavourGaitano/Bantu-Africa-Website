import { Router } from "express";
import {
  createMeeting,
  deleteMeeting,
  getMeetings,
  getoneMeeting,
  updateMeeting,
} from "../controllers/meetingsController.js";

const meetingRouter = Router();

meetingRouter.get("/meeting", getMeetings);
meetingRouter.post("/meeting", createMeeting);
meetingRouter.get("/meeting/single/:ConferenceId", getoneMeeting);
meetingRouter.delete("/meeting/:ConferenceId", deleteMeeting);
meetingRouter.put("/meeting/:ConferenceId", updateMeeting);

export default meetingRouter;
