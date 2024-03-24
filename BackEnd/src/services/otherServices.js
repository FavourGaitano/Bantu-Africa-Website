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
