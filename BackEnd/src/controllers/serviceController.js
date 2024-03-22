import { v4 } from "uuid";
import { serviceValidator } from "../validators/serviceValidator.js";
import {
  createService,
  deleteService,
  getAllService,
  getSingleService,
  updateService,
} from "../services/serviceService.js";

export const getAllServiceController = async (req, res) => {
  try {
    const data = await getAllService();
    if (!data.recordset) {
      return res.status(404).json({
        message: "Ooops! No Service Found!",
      });
    }
    return res.status(200).json(data.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const createServiceController = async (req, res) => {
  try {
    const { ServiceName, Description, ImageUrl } = req.body;
    console.log(req.body);
    const { error } = serviceValidator({ ServiceName, Description, ImageUrl });

    if (error) {
      return res.json({ message: error.message });
    }

    const ServiceId = v4();
    const CreatedAt = new Date().toISOString();

    const newService = {
      ServiceId,
      ServiceName,
      Description,
      ImageUrl,
      CreatedAt,
    };

    const response = await createService(newService);
    console.log("response:", response);
    if (response.message) {
      return res.json({
        message: response.message,
      });
    } else {
      return res.status(201).json({
        message: "Service created successfully",
        service: newService,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteServiceController = async (req, res) => {
  try {
    const { ServiceId } = req.params;

    const response = await deleteService(ServiceId);

    if (response.rowsAffected > 0) {
      return res.status(200).json({ message: "Service deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ message: "Service not found or not deleted" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateServiceController = async (req, res) => {
  try {
    const { ServiceId } = req.params;
    const { ServiceName, Description, ImageUrl } = req.body;

    const { error } = serviceValidator({ ServiceName, Description, ImageUrl });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const response = await updateService(ServiceId, {
      ServiceName,
      Description,
      ImageUrl,
    });
    // console.log('this is the response', response);
    if (response) {
      return res.status(200).json({ message: "Service updated Successfully!" });
    } else {
      return res.status(400).json({ message: "Failed to update" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleServiceController = async (req, res) => {
  try {
    const { ServiceId } = req.params;

    const service = await getSingleService(ServiceId);

    if (service) {
      return res.status(200).json(service);
    } else {
      return res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
