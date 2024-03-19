
import dotenv from 'dotenv'

import {poolRequest,sql} from '../utils/dbConnect.js'

dotenv.config();


export const getAllBookingsNotificationsService = async (BookingId) => {
    try {
      const result = await poolRequest()
        .input('BookingId', sql.VarChar, BookingId)
        .query(`
          SELECT Notifications.*, Bookings.*
          FROM Notifications
          INNER JOIN Bookings ON Bookings.BookingId = Notifications.BookingId
          WHERE Notifications.BookingId = @BookingId
        `);
  
      console.log("result records", result.recordset);
      console.log("result", result);
      return result;
    } catch (error) {
      return error;
    }
  };
  
export const updateNotificationService=async(updateNotication)=>{
const updatedNotification=await poolRequest()
.input("NotificationId",sql.Int, updateNotication.NotificationId)
.input("is_read",sql.Bit, updateNotication.is_read)
.query(`UPDATE Notifications SET is_read=@is_read where NotificationId=@NotificationId`)
console.log("updatedNotification",updatedNotification);
return updatedNotification
  }


  export const getAllNotificationsService=async()=>{
    try {
        const allNotifications=await poolRequest().query(`SELECT Notifications.*, Bookings.*
          FROM Notifications
          INNER JOIN Bookings ON Bookings.BookingId = Notifications.BookingId`)
        return allNotifications
    } catch (error) {
        return error
    }
}



export const getAllSingleNotificationsService = async (NotificationId) => {
  try {
    const result = await poolRequest()
      .input('NotificationId', sql.Int, NotificationId)
      .query(`
        SELECT * FROM Notifications WHERE NotificationId = @NotificationId
      `);

    console.log("result", result);
    return result;
  } catch (error) {
    return error;
  }
};


export const deleteNotificationService = async (deleteNotication) => {
  try {
    const deletedNotification = await poolRequest()
      .input('BookingId', sql.VarChar, deleteNotication.BookingId)
      .input('NotificationId', sql.Int, deleteNotication.NotificationId)
      .query(`DELETE FROM Notifications WHERE NotificationId=@NotificationId AND BookingId=@BookingId`);

    console.log("notification", deletedNotification);
    return deletedNotification;
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};