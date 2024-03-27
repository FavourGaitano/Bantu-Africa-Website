import {
  sendNotFound,
  sendServerError,
  sendCreated,
  paginate,
  orderData,
} from "../helper/helperFunctions.js";
import { v4 } from "uuid";
import {
  createupCommingEventService,
  deleteupCommingEventService,
  doesEventNameExist,
  getAllUpcomingEventsService,
  getoneupCommingEventService,
  getupCommingEventsService,
  updateupCommingEventService,
  
} from "../services/upcommingEventService.js";
import { upcommingEventValidator } from "../validators/upCommingEventValidator.js";

export const getupCommingEvents = async (req, res) => {
  try {
    const upCommingEvents = await getupCommingEventsService();
    if (upCommingEvents.length === 0) {
      sendNotFound(res, "No upComming Events found");
    } else {
      return res.status(200).json(upCommingEvents );
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const getAllUpcomingEventsController = async (req, res) => {
  try {
    const upCommingEvents = await getupCommingEventsService();
    console.log(upCommingEvents);
    const currentDateTime = new Date();
    const upcomingEvents = upCommingEvents.filter(event => new Date(event.Date) > currentDateTime);
    console.log("upcomingEvents",upcomingEvents);
    if (upcomingEvents.length === 0) {
      sendNotFound(res, "No upComming Events found");
    } else {
      return res.status(200).json(upcomingEvents);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};




export const createupCommingEvent = async (req, res) => {
  const { Name, Description, PosterUrl, Date } = req.body;
  const { error } = upcommingEventValidator(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    try {
      // Check if the Event Event already exists
      const exists = await doesEventNameExist(Name);
      if (exists) {
        return res
          .status(409)
          .send(`${Name} already exists. Please add another Event.`);
      }

      const upcommingEventId = v4();
      console.log("Upcoming Event ID : ", upcommingEventId);
      const newupCommingEvent = {
        upcommingEventId,
        Name,
        Description,
        PosterUrl,
        Date,
      };

      let response = await createupCommingEventService(newupCommingEvent);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, `${Name} created successfully`);
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  }
};

export const getoneupCommingEvent = async (req, res) => {
  const { upcommingEventId } = req.params;

  try {
    const upCommingEvent = await getoneupCommingEventService(upcommingEventId);
    console.log("Get one event:", upCommingEvent);
    if (!upCommingEvent) {
      sendNotFound(res, "Event not found.");
    } else {
      return res.status(200).json({ upCommingEvent });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
    console.log(error);
  }
};

export const deleteupCommingEvent = async (req, res) => {
  try {
    const { upcommingEventId } = req.params;

    const existingEvent = await getoneupCommingEventService(upcommingEventId);
    if (!existingEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    const result = await deleteupCommingEventService(upcommingEventId);

    if (result instanceof Error) {
      console.error("Error deleting Event:", result);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res.status(200).json({ message: "Event deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting Event:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateupCommingEvent = async (req, res) => {
  try {
    const {upcommingEventId} = req.params;

    const { Name, Description, PosterUrl, Date } = req.body;
    console.log( req.body);

    const {error} = upcommingEventValidator({ Name, Description, PosterUrl, Date });
    if(error){
      return res.status(400).json({message : error.details[0].message});
    }

    const response = updateupCommingEventService(upcommingEventId, {Name, Description, PosterUrl, Date})
    if(response){
      return res.status(200).json({ message: "Event Updated successfully"})
    }

    return response
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error"})
  }
};



