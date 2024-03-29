import { poolRequest, closePool, sql } from '../utils/dbConnect.js';

export const getAllService = async () => {
    try {
        const result = await poolRequest().query(`SELECT * FROM tbl_service`);
        return result;

    } catch (error) {
        return error.message;
    }
};

export const getSingleService = async (ServiceId) => {
    try {
        const result = await poolRequest()
            .input("ServiceId", sql.VarChar(255), ServiceId)
            .query(
                `SELECT * FROM tbl_service WHERE ServiceId = @ServiceId`
            );

        if (result.recordset.length > 0) {
            return result.recordset[0];
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
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


export const updateService = async (ServiceId, updatedServices) => {
    try {
        const existingService = await getSingleService(ServiceId);
        if(!existingService) {
            return null
        }

        const query = `
            UPDATE tbl_service
            SET ServiceName = @ServiceName,
                Description = @Description,
                ImageUrl = @ImageUrl
            WHERE ServiceId = @ServiceId
        `;

        const result = await poolRequest()
            .input("ServiceId", sql.VarChar, ServiceId)
            .input("ServiceName", sql.VarChar, updatedServices.ServiceName)
            .input("Description", sql.VarChar, updatedServices.Description)
            .input("ImageUrl", sql.VarChar, updatedServices.ImageUrl)
            .query(query);

        if(result.rowsAffected[0] > 0) {
            return { ...existingService, ...updatedServices};
        }else{
            return null
        }
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to update the activity");
    }
};


