
import { v4 } from 'uuid';
import { otherServiceValidator } from '../validators/otherSevicesValidator.js';
import { createOtherService, getAllOtherServices, updateOtherService } from '../services/otherServices.js';

export const createOtherServiceController = async (req, res) => {
  try {
    const { OtherServiceName, Description, ImageUrl } = req.body;
    console.log(req.body);
    const { error } = otherServiceValidator({ OtherServiceName, Description, ImageUrl });

    if (error) {
      return res.json({ message: error.message });
    }

    const OtherServiceId = v4();
    const CreatedAt = new Date().toISOString();

    const newOtherService = {
      OtherServiceId,
      OtherServiceName,
      Description,
      ImageUrl,
      CreatedAt,
    };

    const response = await createOtherService(newOtherService);
    console.log("response:", response);
    if (response.message) {
      return res.json({
        message: response.message,
      });
    } else {
      return res.status(201).json({
        message: "Other service created successfully",
        service: newOtherService,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllOtherServicesController = async (req, res) => {
    try {
      const otherServices = await getAllOtherServices();
      return res.status(200).json(otherServices);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateOtherServiceController = async (req, res) => {
    try {
      const { OtherServiceId } = req.params; 
      const { OtherServiceName, Description, ImageUrl } = req.body;
      const { error } = otherServiceValidator({ OtherServiceName, Description, ImageUrl });
  
      if (error) {
        return res.status(400).json({ message: error.message });
      }
  
      const updatedService = await updateOtherService(OtherServiceId, { OtherServiceName, Description, ImageUrl });
      return res.status(200).json({ message: "Other service updated successfully", service: updatedService });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

