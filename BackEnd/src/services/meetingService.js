import { poolRequest, closePool, sql } from "../utils/dbConnect.js";

export const getMeetingsService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Meetings");
    return result.recordset;
  } catch (error) {
    return error.message;
  }
};

export const getoneMeetingservice = async (ConferenceId) => {
  try {
    const result = await poolRequest()
      .input("ConferenceId", sql.VarChar, ConferenceId)
      .query("SELECT * FROM Meetings WHERE ConferenceId = @ConferenceId");

    console.log(result);
    return result.recordset[0];
  } catch (error) {
    console.log("Error fetching m Meeting:", error);
    throw error;
  }
};

export const deleteMeetingService = async (ConferenceId) => {
  try {
    const result = await poolRequest().input(
      "ConferenceId",
      sql.VarChar,
      ConferenceId
    ).query(`
              DELETE FROM Meetings
              WHERE ConferenceId = @ConferenceId
          `);

    return result;
  } catch (error) {
    console.error("Error in deleteMeetingService:", error);
    return error;
  }
};

export const doesConferenceRoomNameExist = async (ConferenceRoomName) => {
  try {
    const result = await poolRequest()
      .input("ConferenceRoomName", sql.VarChar, ConferenceRoomName)
      .query(
        "SELECT 1 FROM Meetings WHERE ConferenceRoomName = @ConferenceRoomName"
      );

    return result.recordset.length > 0;
  } catch (error) {
    console.error("Error checking for existing meeting Meeting:", error);
    throw error;
  }
};

export const updateMeetingService = async (
  ConferenceId,
  updatedMeetingData
) => {
  try {
    const { Description, ConferenceRoomName, Image, Price, Quantity } =
      updatedMeetingData;

    const result = await poolRequest()
      .input("ConferenceId", sql.VarChar, ConferenceId)
      .input("Description", sql.VarChar, Description)
      .input("ConferenceRoomName", sql.VarChar, ConferenceRoomName)
      .input("Image", sql.VarChar, Image)
      .input("Price", sql.Decimal, Price)
      .input("Quantity", sql.VarChar, Quantity).query(`
          UPDATE Meetings
          SET Description = @Description,
              ConferenceRoomName = @ConferenceRoomName,
              Image = @Image,
              Price = @Price,
              Quantity = @Quantity
          WHERE ConferenceId = @ConferenceId
        `);

    return result;
  } catch (error) {
    console.error("Error in updateMeetingService:", error);
    return error;
  }
};

export const createMeetingservice = async (meeting) => {
  try {
    const result = await poolRequest()
      .input("ConferenceId", sql.VarChar, meeting.ConferenceId)
      .input("Description", sql.VarChar, meeting.Description)
      .input("ConferenceRoomName", sql.VarChar, meeting.ConferenceRoomName)
      .input("Image", sql.VarChar, meeting.Image)
      .input("Price", sql.Decimal, meeting.Price)
      .input("Quantity", sql.Int, meeting.Quantity)
      .query(
        "INSERT INTO Meetings (ConferenceId, Description, ConferenceRoomName, Image, Price, Quantity) VALUES (@ConferenceId, @Description, @ConferenceRoomName, @Image, @Price, @Quantity)"
      );
    return result;
  } catch (error) {
    return error;
  }
};
