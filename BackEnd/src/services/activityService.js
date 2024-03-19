import { poolRequest, closePool, sql } from '../utils/dbConnect.js';


export const createActivityService = async (newActivity) => {
    try {
        const checkActivityQuery = `
            SELECT COUNT(*) AS count
            FROM tbl_activity
            WHERE ActivityId = @ActivityId
        `;

        const checkActivityResult = await poolRequest()
            .input("ActivityId", sql.VarChar, newActivity.ActivityId)
            .query(checkActivityQuery);

        if (checkActivityResult.recordset[0].count > 0) {
            throw new Error('The activity already exists!');
        }

        const addActivityQuery = `
            INSERT INTO tbl_activity (ActivityId, ActivityName, Description, Category, ImageUrl)
            VALUES (@ActivityId, @ActivityName, @Description, @Category, @ImageUrl)
        `;

        const result = await poolRequest()
            .input("ActivityId", sql.VarChar, newActivity.ActivityId)
            .input("ActivityName", sql.VarChar, newActivity.ActivityName)
            .input("Description", sql.VarChar, newActivity.Description)
            .input("Category", sql.VarChar, newActivity.Category)
            .input("ImageUrl", sql.VarChar, newActivity.ImageUrl)
            .input("CreatedAt", sql.VarChar, newActivity.CreatedAt)
            .query(addActivityQuery);

        console.log("result", result);
        return result;
        
    } catch (error) {
        return { message: error.message };
    }
};

export const getAllActivitiesService = async () => {
    try {
        const query = `
            SELECT * FROM tbl_activity
        `;
        
        const result = await poolRequest().query(query);
        return result.recordset;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to retrieve activities");
    }
};

export const getSingleActivityService = async (ActivityId) => {
    try {
        const query = `
            SELECT * FROM tbl_activity
            WHERE ActivityId = @ActivityId
        `;
        
        const result = await poolRequest()
            .input("ActivityId", sql.VarChar, ActivityId)
            .query(query);

        return result.recordset[0]; 
    } catch (error) {
        console.log(error);
        throw new Error("Failed to retrieve the activity");
    }
};

export const updateActivityService = async (activityId, updatedActivityData) => {
    try {
        // Check if the activity exists
        const existingActivity = await getSingleActivityService(activityId);

        if (!existingActivity) {
            return null; // Return null if the activity doesn't exist
        }

        // Update the existing activity with the new data
        const query = `
            UPDATE tbl_activity
            SET ActivityName = @ActivityName,
                Description = @Description,
                Category = @Category,
                ImageUrl = @ImageUrl
            WHERE ActivityId = @ActivityId
        `;

        const result = await poolRequest()
            .input("ActivityName", sql.VarChar, updatedActivityData.ActivityName)
            .input("Description", sql.VarChar, updatedActivityData.Description)
            .input("Category", sql.VarChar, updatedActivityData.Category)
            .input("ImageUrl", sql.VarChar, updatedActivityData.ImageUrl)
            .input("ActivityId", sql.VarChar, activityId)
            .query(query);

        if (result.rowsAffected[0] > 0) {
            return { ...existingActivity, ...updatedActivityData };
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw new Error("Failed to update the activity");
    }
};

export const deleteActivityService = async (ActivityId) => {
    try {
        const response = poolRequest()
        .input("ActivityId", sql.VarChar, ActivityId)
        .query(`DELETE FROM tbl_activity WHERE ActivityId = @ActivityId`)

        return response;
        
    } catch (error) {
        return error.message;
    }
}

