import { poolRequest, sql } from "../utils/dbConnect.js";

export const createBookingService = async (newBooking) => {
  try {
    const result = await poolRequest()
      .input("BookingId", sql.VarChar(255), newBooking.BookingId)
      .input("Email", sql.VarChar(255), newBooking.Email.toLowerCase())
      .input("FirstName", sql.VarChar(255), newBooking.FirstName)
      .input("LastName", sql.VarChar(255), newBooking.LastName)
      .input("RoomId", sql.VarChar(255), newBooking.RoomId)
      .input("SpecialRequirements", sql.VarChar, newBooking.SpecialRequirements)
      .input("CreatedAt", sql.DateTime, newBooking.CreatedAt)
      .input("StartDate", sql.Date, newBooking.StartDate)
      .input("EndDate", sql.Date, newBooking.EndDate)
      .input("AdultsNo", sql.Int, newBooking.AdultsNo)
      .input("KidsNo", sql.Int, newBooking.KidsNo)
      .input("Total", sql.Int, newBooking.Total)
      .input("IsReserved", sql.Bit, newBooking.IsReserved)
      .input("IsPaid", sql.Bit, newBooking.IsPaid)
      .query(
        "INSERT INTO Bookings (BookingId, Email, FirstName, LastName, RoomId, SpecialRequirements, CreatedAt, StartDate, EndDate, AdultsNo, KidsNo, Total, IsReserved, IsPaid) VALUES (@BookingId, @Email, @FirstName, @LastName, @RoomId, @SpecialRequirements, @CreatedAt, @StartDate, @EndDate, @AdultsNo, @KidsNo, @Total, @IsReserved, @IsPaid)"
      );
    console.log("Result is:", result);
    return result;
  } catch (error) {
    return error;
  }
};

export const getBookingsByEmailService = async (Email) => {
  try {
    const result = await poolRequest()
      .input("Email", sql.VarChar(255), Email.toLowerCase())
      .query("SELECT * FROM Bookings WHERE Email=@Email");
    // console.log(result);
    return result.recordset;
  } catch (error) {
    return error;
  }
};

export const getBookingsService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Bookings");
    return result.recordset;
  } catch (error) {
    return error;
  }
};

export const getBookingByIdService = async (id) => {
  try {
    const result = await poolRequest()
      .input("id", sql.VarChar(255), id)
      .query("SELECT * FROM Bookings WHERE BookingId=@id");
    return result.recordset[0];
  } catch (error) {
    return error;
  }
};

export const getBookingsByNameService = async (FirstName, LastName) => {
  try {
    const result = await poolRequest()
      .input("FirstName", sql.VarChar(255), FirstName)
      .input("LastName", sql.VarChar(255), LastName)
      .query(
        "SELECT * FROM Bookings WHERE FirstName=@FirstName AND LastName=@LastName"
      );
    return result.recordset;
  } catch (error) {
    return error;
  }
};

export const getBookingsByRoomIdService = async (RoomId) => {
  try {
    const result = await poolRequest()
      .input("RoomId", sql.VarChar(255), RoomId)
      .query("SELECT * FROM Bookings WHERE RoomId=@RoomId");
    return result.recordset[0];
  } catch (error) {
    return error;
  }
};

export const updateBookingService = async (BookingId, updatedBooking) => {
  const {
    Email,
    FirstName,
    LastName,
    RoomId,
    SpecialRequirements,
    CreatedAt,
    StartDate,
    EndDate,
    AdultsNo,
    KidsNo,
    Total,
    IsReserved,
    IsPaid,
  } = updatedBooking;
  try {
    const result = await poolRequest()
      .input("BookingId", sql.VarChar(255), BookingId)
      .input("Email", sql.VarChar(255), Email)
      .input("FirstName", sql.VarChar(255), FirstName)
      .input("LastName", sql.VarChar(255), LastName)
      .input("RoomId", sql.VarChar(255), RoomId)
      .input("SpecialRequirements", sql.VarChar, SpecialRequirements)
      .input("CreatedAt", sql.DateTime, CreatedAt)
      .input("StartDate", sql.Date, StartDate)
      .input("EndDate", sql.Date, EndDate)
      .input("AdultsNo", sql.Int, AdultsNo)
      .input("KidsNo", sql.Int, KidsNo)
      .input("Total", sql.Int, Total)
      .input("IsReserved", sql.Bit, IsReserved)
      .input("IsPaid", sql.Bit, IsPaid)
      .query(
        "UPDATE Bookings SET Email=@Email, FirstName=@FirstName, LastName=@LastName, RoomId=@RoomId, SpecialRequirements=@SpecialRequirements, CreatedAt=@CreatedAt, StartDate=@StartDate, EndDate=@EndDate, AdultsNo=@AdultsNo, KidsNo=@KidsNo, Total=@Total, IsReserved=@IsReserved, IsPaid=@IsPaid WHERE BookingId=@BookingId"
      );
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteBookingService = async (BookingId) => {
  try {
    await poolRequest()
      .input("BookingId", sql.VarChar(255), BookingId)
      .query("DELETE FROM Bookings WHERE BookingId = @BookingId");
  } catch (error) {
    return error.message;
  }
};
