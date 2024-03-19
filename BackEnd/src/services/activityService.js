import { poolRequest, closePool, sql } from '../utils/dbConnect.js';


export const createActivityService = async (newActivity) => {
    try {
        const checkActivityQuery = `
            SELECT COUNT(*) AS Count
            FROM Activities
            WHERE ActivityId = @ActivityId
        `;

        const checkActivityResult = await poolRequest()
            .input("ActivityId", sql.VarChar, newActivity.ActivityId)
            .query(checkActivityQuery);

        if(checkActivityResult.recordset[0].count > 0) {
            throw new Error('The activity already exists!')
        }

        const addActivityQuery = `
            INSERT INTO Activities (ActivityId, ActivityName, Description, Category, ImageUrl)
            VALUES (@ActivityId, @ActivityName, @Description, @Category, @ImageUrl)
        `;

        const result = await poolRequest()
            .input("ActivityId", sql.VarChar, newActivity.ActivityId)
            .input("ActivityName", sql.VarChar, newActivity.ActivityName)
            .input("Description", sql.VarChar, newActivity.Description)
            .input("Category", sql.VarChar, newActivity.Category)
            .input("ImageUrl", sql.VarChar, newActivity.ImageUrl)
            .query(addActivityQuery);

        return result
        
    } catch (error) {
        return error.message;
    }
}