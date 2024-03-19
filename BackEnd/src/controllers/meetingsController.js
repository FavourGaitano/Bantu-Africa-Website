import {
  sendNotFound,
  sendServerError,
  sendCreated,
  paginate,
  orderData,
} from "../helper/helperFunctions.js";
import { v4 } from "uuid";
import {
  createMeetingservice,
  deleteMeetingService,
  doesConferenceRoomNameExist,
  getMeetingsService,
  getoneMeetingservice,
  updateMeetingService,
} from "../services/meetingService.js";
import { meetingValidator } from "../validators/MeetingsValidators/meetingsvalidator.js";

export const getMeetings = async (req, res) => {
  try {
    const meetings = await getMeetingsService();
    if (meetings.length === 0) {
      sendNotFound(res, "No Meeting found");
    } else {
      return res.status(200).json({ meetings: meetings });
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const createMeeting = async (req, res) => {
  const { Description, ConferenceRoomName, Image, Price, PackageId, Quantity } =
    req.body;
  const { error } = meetingValidator(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    try {
      const exists = await doesConferenceRoomNameExist(ConferenceRoomName);
      if (exists) {
        return res
          .status(409)
          .send(`${ConferenceRoomName} already exists. Please add another .`);
      }

      const ConferenceId = v4();
      const newmeeting = {
        ConferenceId,
        Description,
        ConferenceRoomName,
        Image,
        Price,
        PackageId,
        Quantity,
      };

      let response = await createMeetingservice(newmeeting);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, `${ConferenceRoomName} created successfully`);
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  }
};

export const getoneMeeting = async (req, res) => {
  const { ConferenceId } = req.params;

  try {
    const meeting = await getoneMeetingservice(ConferenceId);
    if (!meeting) {
      sendNotFound(res, "Meeting  not found.");
    } else {
      return res.status(200).json({ meeting });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
    console.log(error);
  }
};

export const deleteMeeting = async (req, res) => {
  try {
    const { ConferenceId } = req.params;

    const existing = await getoneMeetingservice(ConferenceId);
    if (!existing) {
      return res.status(404).json({ message: " not found" });
    }

    const ConferenceRoomName = existing.ConferenceRoomName;
    const result = await deleteMeetingService(ConferenceId);

    if (result instanceof Error) {
      console.error("Error deleting :", result);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res
        .status(200)
        .json({ message: `${ConferenceRoomName} deleted successfully ` });
    }
  } catch (error) {
    console.error("Error deleting :", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateMeeting = async (req, res) => {
  try {
    const { ConferenceId } = req.params;
    const updatedMeetingData = req.body;

    // Check if the Meeting Exists
    const existingMeeting = await getoneMeetingservice(ConferenceId);
    if (!existingMeeting) {
      return res.status(404).json({
        message: "Meeting not found",
      });
    }

    const result = await updateMeetingService(ConferenceId, updatedMeetingData);

    if (result instanceof Error) {
      console.error("Error updating Meeting:", result);
      return res.status(500).json({
        message: "Internal server error",
      });
    } else {
      return res.status(200).json({
        message: "Meeting updated successfully",
      });
    }
  } catch (error) {
    console.error("Error updating Meeting:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
