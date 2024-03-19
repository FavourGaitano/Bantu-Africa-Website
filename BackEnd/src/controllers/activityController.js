import {v4} from 'uuid';
import { createActivityService, deleteActivityService, getAllActivitiesService, getSingleActivityService } from '../services/activityService.js';
import { activityValidator } from '../validators/activityValidator.js';

export const createActivityController = async (req, res) => {
    try {
        const { ActivityName, Description, Category, ImageUrl } = req.body;
        
        const { error } = activityValidator({ ActivityName, Description, Category, ImageUrl });

        if (error) {
            return res.json({ message: error.message });
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
        };

        const response = await createActivityService(newActivity);

        if (response.message) {
            return res.json({ message: response.message });
        } else {
            return res.status(201).json({
                message: "Activity created successfully",
                activity: newActivity
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllActivitiesController = async (req, res) => {
    try {
        const activities = await getAllActivitiesService();
        return res.status(200).json(activities);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getSingleActivityController = async (req, res) => {
    try {
        const { ActivityId } = req.params;
        const activity = await getSingleActivityService(ActivityId);
        
        if (!activity) {
            return res.status(404).json({ message: "Activity not found" });
        }

        return res.status(200).json(activity);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateActivity = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
        
    }
}

export const deleteActivityController = async (req, res) => {
    try {
        const {ActivityId} = req.params;
        const result = await deleteActivityService(ActivityId);
        if(!result){
            res.status(404).json({message: "No such activity"})
        };

        return res.status(200).json({message: "Activity deleted successfully!"});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
        
    }
}
