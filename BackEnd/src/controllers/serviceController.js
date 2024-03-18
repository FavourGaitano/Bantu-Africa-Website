
import {v4} from 'uuid';
import { serviceValidator } from '../validators/serviceValidator.js';
import { createService, getAllService } from '../services/serviceService.js';

export const getAllServiceController = async (req, res) => {
    try {
        const data = await getAllService();
        if(!data.recordset) {
            return res.status(404).json({
                message: "Ooops! No Service Found!"
            })
        }
        return res.status(200).json(data.recordset)

        
    } catch (error) {
        console.log(error)
        
    }
}

export const createServiceController = async (req, res) => {
    try {
        const { ServiceName, Description, ImageUrl } = req.body;
        const {error} = serviceValidator({ ServiceName, Description, ImageUrl})

        if(error) {
            return res.json({ message: error.message})
        }

        const ServiceId = v4();
        const CreatedAt = new Date().toISOString();

        const newService = {
            ServiceId,
            ServiceName,
            Description,
            ImageUrl,
            CreatedAt
        }

        const response = await createService(newService)

        if(response.message) {
            return res.json({
                message: response.message
            });
        }else{
            return res.status(201).json({
                message: "Service created successfully",
                service: newService
            })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
        
    }
}

export const deleteServiceController = async (req, res) => {
    try {
        return res.json({
            message: "Delete Service here"
        })
        
    } catch (error) {
        console.log(error)
        
    }
}

export const updateServiceController = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        
    }
}

