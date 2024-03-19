import {v4} from 'uuid';
import { createActivityService } from '../services/activityService.js';
import { activityValidator } from '../validators/activityValidator.js';

export const createActivity = async (req, res) => {
    try {
        const { ActivityName, Description, Category, ImageUrl } = req.body

        const {error} = activityValidator({ ActivityName, Description, Category, ImageUrl })

        if (error) {
            return res.json({message: error.message})
        }

        const ActivityId = v4();

        const CreatedAt = new Date().toISOString();

        const newActivity = {
            ActivityId,
            ActivityName,
            Description,
            Category,
            ImageUrl,
            CreatedAt
        }

        const response = await createActivityService(newActivity)

        if (response.message){
            return res.json({
                message: response.message
            })
        }else{
            return res.status(201).json({
                message: "Activity created successfully",
                activity: newActivity
            })
        }
        
    } catch (error) {
        console.log(error)
        return req.status(500).json({message: "Internal server error"})
        
    }
}
