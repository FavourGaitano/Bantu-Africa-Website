
import {v4} from 'uuid';

export const getAllServiceController = (req, res) => {
    try {
        return res.json({
            message: "Get all services here"
        })
        
    } catch (error) {
        console.log(error)
        
    }
}

export const createServiceController = async (req, res) => {
    try {
        return res.json({
            message: "Create service here"
        })
        
    } catch (error) {
        console.log(error)
        
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

