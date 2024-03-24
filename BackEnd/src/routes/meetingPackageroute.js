import { Router } from "express";
import {
  createmeetingPackage,
  deletemeetingPackage,
  getmeetingPackages,
  getonemeetingPackage,
  updatemeetingPackage,
} from "../controllers/meetingPackageController.js";
const meetingpackageRouter = Router();

meetingpackageRouter.get("/meetingpackage", getmeetingPackages);
meetingpackageRouter.post("/meetingpackage", createmeetingPackage);
meetingpackageRouter.get("/meetingpackage/:PackageId", getonemeetingPackage);
meetingpackageRouter.put("/meetingpackage/:PackageId", updatemeetingPackage);
meetingpackageRouter.delete("/meetingpackage/:PackageId", deletemeetingPackage);

export default meetingpackageRouter;
