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

export const getSingleActivityService = async () => {
    try {
        
    } catch (error) {
        return error.message;
        
    }
}
export const updateActivityService = async () => {
    try {
        
    } catch (error) {
        return error.message;
    }
}

export const deleteActivityService = async () => {
    try {
        
    } catch (error) {
        return error.message;
    }
}