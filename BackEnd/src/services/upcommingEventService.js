import { poolRequest, closePool, sql } from "../utils/dbConnect.js";

export const getupCommingEventsService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM upCommingEvent");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const getoneupCommingEventService = async (upcommingEventId) => {
  try {
    const result = await poolRequest()
      .input("upcommingEventId", sql.VarChar, upcommingEventId)
      .query(
        "SELECT * FROM upCommingEvent WHERE upcommingEventId = @upcommingEventId"
      );

    return result.recordset[0];
  } catch (error) {
    console.log("Error fetching m upCommingEvent:", error);
    throw error;
  }
};

export const getAllUpcomingEventsService = async () => {
  try {
    const result = await poolRequest()
      .query(
        "SELECT * FROM upCommingEvent WHERE Date > GETDATE()"
      );
console.log(result);
    return result.recordset;
  } catch (error) {
    console.log("Error fetching upcoming events:", error);
    throw error;
  }
};


export const deleteupCommingEventService = async (upcommingEventId) => {
  try {
    const result = await poolRequest().input(
      "upcommingEventId",
      sql.VarChar,
      upcommingEventId
    ).query(`
              DELETE FROM upCommingEvent
              WHERE upcommingEventId = @upcommingEventId
          `);

    return result;
  } catch (error) {
    console.error("Error in deleteupCommingEventService:", error);
    return error;
  }
};

export const doesEventNameExist = async (Name) => {
  try {
    const result = await poolRequest()
      .input("Name", sql.VarChar, Name)
      .query("SELECT 1 FROM upCommingEvent WHERE Name = @Name");

    return result.recordset.length > 0;
  } catch (error) {
    console.error("Error checking for existing Event Name:", error);
    throw error;
  }
};

export const updateupCommingEventService = async (upcommingEventId, updatedFields) => {
    try {
        const response = await poolRequest()
            .input("upcommingEventId", sql.VarChar, upcommingEventId)
            .input("Name", sql.VarChar, updatedFields.Name)
            .input("Description", sql.VarChar, updatedFields.Description)
            .input("PosterUrl", sql.VarChar, updatedFields.PosterUrl)
            .input("Date", sql.DateTime, updatedFields.Date)
            .query(`UPDATE upCommingEvent 
                SET Name = @Name,
                Description = @Description,
                PosterUrl = @PosterUrl,
                Date = @Date
            `)

        if(response) {
            return response
        }else{
            return response.json("Error in the service")
        }

        
    } catch (error) {
        console.log(error)
    }
}



// export const updateupCommingEventService = async (
//     upcommingEventId,
//     updatedEventData
//   ) => {
//     try {
//       const { Name, Description, PosterUrl, Date } = updatedEventData;
//       console.log(upcommingEventId);
//       const result = await poolRequest()
//         .input("upcommingEventId", sql.VarChar, upcommingEventId)
//         .input("Name", sql.VarChar, Name)
//         .input("Description", sql.VarChar, Description)
//         .input("PosterUrl", sql.VarChar, PosterUrl)
//         .input("Date", sql.VarChar, Date).query(`
//             UPDATE upCommingEvent
//             SET 
//             Name = @Name,
//             Description = @Description,
//                 PosterUrl = @PosterUrl,
//                 Date = @Date
//             WHERE upcommingEventId = @upcommingEventId
//           `);
  
//       return result;
//     } catch (error) {
//       console.error("Error in updateupCommingEventService:", error);
//       return error;
//     }
//   };






export const createupCommingEventService = async (upCommingEvent) => {
  try {
    const result = await poolRequest()
      .input("upcommingEventId", sql.VarChar, upCommingEvent.upcommingEventId)
      .input("Name", sql.VarChar, upCommingEvent.Name)
      .input("Description", sql.VarChar, upCommingEvent.Description)
      .input("PosterUrl", sql.VarChar, upCommingEvent.PosterUrl)
      .input("Date", sql.DateTime, upCommingEvent.Date)
      .query(
        "INSERT INTO upCommingEvent (upcommingEventId, Description, Name, PosterUrl, Date) VALUES (@upcommingEventId, @Description, @Name, @PosterUrl, @Date)"
      );
    return result;
  } catch (error) {
    return error;
  }
};
