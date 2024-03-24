import {
  sendNotFound,
  sendServerError,
  sendCreated,
  paginate,
  orderData,
} from "../helper/helperFunctions.js";
import { v4 } from "uuid";
import { meetingpackagepackageValidator } from "../validators/MeetingsValidators/meetingpackagevalidators.js";
import {
  createmeetingPackageService,
  deletePackageService,
  doesMeetingPackageExist,
  getmeetingPackagesService,
  getonemeetingPackageService,
  updatemeetingpackageService,
} from "../services/meetingPackageService.js";

export const getmeetingPackages = async (req, res) => {
  try {
    const meetingpackages = await getmeetingPackagesService();
    if (meetingpackages.length === 0) {
      sendNotFound(res, "No Meeting Packages found");
    } else {
      return res.status(200).json({ meetingpackages: meetingpackages });
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const createmeetingPackage = async (req, res) => {
  const { PackageName } = req.body;
  const { error } = meetingpackagepackageValidator(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    try {
      // Check if the meeting package already exists
      const exists = await doesMeetingPackageExist(PackageName);
      if (exists) {
        return res
          .status(409)
          .send(`${PackageName} already exists. Please add another package.`);
      }

      const PackageId = v4();
      const newmeetingpackage = {
        PackageId,
        PackageName,
      };

      let response = await createmeetingPackageService(newmeetingpackage);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, `${PackageName} created successfully`);
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  }
};

export const getonemeetingPackage = async (req, res) => {
  const { PackageId } = req.params;

  try {
    const meetingPackage = await getonemeetingPackageService(PackageId);
    if (!meetingPackage) {
      sendNotFound(res, "Meeting package not found.");
    } else {
      return res.status(200).json({ meetingPackage });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
    console.log(error);
  }
};

export const deletemeetingPackage = async (req, res) => {
  try {
    const { PackageId } = req.params;

    const existingPackage = await getonemeetingPackageService(PackageId);
    console.log(existingPackage);
    if (!existingPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    const result = await deletePackageService(PackageId);

    if (result instanceof Error) {
      console.error("Error deleting Package:", result);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res.status(200).json({ message: "Package deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting Package:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatemeetingPackage = async (req, res) => {
  const PackageId = req.params;
  try {
    const PackageToUpdate = await getonemeetingPackageService(PackageId);
    if (PackageToUpdate.length === 0) {
      sendNotFound(res, "Package to update not found");
    } else {
      if (checkIfValuesIsEmptyNullUndefined) {
        const { PackageName } = req.body;
        const updatedPackage = { PackageName };
        if (PackageName) {
          updatedPackage.PackageName = PackageName;
        }

        const response = await updatemeetingpackageService(
          PackageId,
          updatedPackage
        );
        console.log("res:", response);
        if (response.rowsAffected == 1) {
          sendCreated(res, "Package updated successfully");
        } else {
          sendServerError(res, "Failed to update");
        }
      } else {
        sendBadRequest(res, "Please provide a complete field");
      }
    }
  } catch (error) {
    sendServerError(res, error);
  }
};
