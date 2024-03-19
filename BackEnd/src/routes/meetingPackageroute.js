import { Router } from "express";
import {
  createmeetingPackage,
  deletemeetingPackage,
  getmeetingPackages,
  getonemeetingPackage,
} from "../controllers/meetingPackageController.js";
const meetingpackageRouter = Router();

meetingpackageRouter.get("/meetingpackage", getmeetingPackages);
meetingpackageRouter.post("/meetingpackage", createmeetingPackage);
meetingpackageRouter.get("/meetingpackage/:PackageId", getonemeetingPackage);
meetingpackageRouter.delete("/meetingpackage/:PackageId", deletemeetingPackage);

export default meetingpackageRouter;
