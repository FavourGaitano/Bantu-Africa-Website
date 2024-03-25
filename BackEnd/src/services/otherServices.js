import { poolRequest, sql } from "../utils/dbConnect.js";

export const createOtherService = async (newOtherService) => {
    try {
        const checkOtherServiceQuery = `
            SELECT COUNT(*) AS count
            FROM tbl_other_service
            WHERE OtherServiceId = @OtherServiceId
        `;

        const checkOtherServiceResult = await poolRequest()
            .input("OtherServiceId", sql.VarChar, newOtherService.OtherServiceId)
            .query(checkOtherServiceQuery);

        if(checkOtherServiceResult.recordset[0].count > 0){
            throw new Error('The other service already exists!')
        }

        //adding other service to db
        const addOtherServiceQuery = `
            INSERT INTO tbl_other_service (OtherServiceId, OtherServiceName, Description, ImageUrl, CreatedAt)
            VALUES (@OtherServiceId, @OtherServiceName, @Description, @ImageUrl, @CreatedAt)
        `;

        const result = await poolRequest()
            .input("OtherServiceId", sql.VarChar, newOtherService.OtherServiceId)
            .input("OtherServiceName", sql.VarChar, newOtherService.OtherServiceName)
            .input("Description", sql.VarChar, newOtherService.Description)
            .input("ImageUrl", sql.VarChar, newOtherService.ImageUrl)
            .input("CreatedAt", sql.VarChar, newOtherService.CreatedAt)
            .query(addOtherServiceQuery)
        console.log("result",result);
        return result
    } catch (error) {
        return error.message;
        
    }
};


export const getAllOtherServices = async () => {
    try {
        const getAllOtherServicesQuery = `
            SELECT OtherServiceId, OtherServiceName, Description, ImageUrl, CreatedAt
            FROM tbl_other_service
        `;

        const result = await poolRequest().query(getAllOtherServicesQuery);

        return result.recordset;
    } catch (error) {
        throw error;
    }
};


export const updateOtherService = async (OtherServiceId, { OtherServiceName, Description, ImageUrl }) => {
    try {
        const updateOtherServiceQuery = `
            UPDATE tbl_other_service
            SET OtherServiceName = @OtherServiceName, Description = @Description, ImageUrl = @ImageUrl
            WHERE OtherServiceId = @OtherServiceId
        `;

        await poolRequest()
            .input("OtherServiceId", sql.VarChar, OtherServiceId)
            .input("OtherServiceName", sql.VarChar, OtherServiceName)
            .input("Description", sql.VarChar, Description)
            .input("ImageUrl", sql.VarChar, ImageUrl)
            .query(updateOtherServiceQuery);

        return { OtherServiceId, OtherServiceName, Description, ImageUrl };
    } catch (error) {
        throw error;
    }
};


export const deleteOtherService = async (OtherServiceId) => {
    try {
        const deleteOtherServiceQuery = `
            DELETE FROM tbl_other_service
            WHERE OtherServiceId = @OtherServiceId
        `;

        await poolRequest()
            .input("OtherServiceId", sql.VarChar, OtherServiceId)
            .query(deleteOtherServiceQuery);
    } catch (error) {
        throw error;
    }
};