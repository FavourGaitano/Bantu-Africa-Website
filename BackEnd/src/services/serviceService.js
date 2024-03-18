import { poolRequest, closePool, sql } from '../utils/dbConnect.js';

export const getAllService = async () => {
    try {
        const result = await poolRequest().query(`SELECT * FROM tbl_service`);
        return result;

    } catch (error) {
        return error.message;
    }
};

export const createService = async (newService) => {
    try {
        //checking if the service already exist
        const checkServiceQuery = `
            SELECT COUNT(*) AS count
            FROM tbl_service
            WHERE ServiceId = @ServiceId
        `;

        const checkServiceResult = await poolRequest()
            .input("ServiceId", sql.VarChar, newService.ServiceId)
            .query(checkServiceQuery);

        if(checkServiceResult.recordset[0].count > 0){
            throw new Error('The service already exists!')
        }

        //adding service to db
        const addServiceQuery = `
            INSERT INTO tbl_service (ServiceId, ServiceName, Description, ImageUrl, CreatedAt)
            VALUES (@ServiceId, @ServiceName, @Description, @ImageUrl, @CreatedAt)
        `;

        const result = await poolRequest()
            .input("ServiceId", sql.VarChar, newService.ServiceId)
            .input("ServiceName", sql.VarChar, newService.ServiceName)
            .input("Description", sql.VarChar, newService.Description)
            .input("ImageUrl", sql.VarChar, newService.ImageUrl)
            .input("CreatedAt", sql.VarChar, newService.CreatedAt)
            .query(addServiceQuery)
        console.log("result",result);
        return result
    } catch (error) {
        return error.message;
        
    }
}

export const deleteService = async (ServiceId) => {
    try {
        const response = await poolRequest()
            .input("ServiceId", sql.VarChar(255), ServiceId)
            .query(
                `DELETE FROM tbl_service WHERE ServiceId = @ServiceId`
            );

        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};



export const updateService = async (ServiceId, updatedFields) => {
    try {
        const response = await poolRequest()
            .input("ServiceId", sql.VarChar(255), ServiceId)
            .input("ServiceName", sql.VarChar(255), updatedFields.ServiceName)
            .input("Description", sql.VarChar(255), updatedFields.Description)
            .input("ImageUrl", sql.VarChar(255), updatedFields.ImageUrl)
            .query(`
                UPDATE tbl_service 
                SET ServiceName = @ServiceName, 
                    Description = @Description, 
                    ImageUrl = @ImageUrl
                WHERE ServiceId = @ServiceId
            `);

        return response;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};
